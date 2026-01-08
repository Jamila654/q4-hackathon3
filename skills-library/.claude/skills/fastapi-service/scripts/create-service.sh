#!/bin/bash

if [ $# -lt 2 ]; then
    echo "Usage: ./create-service.sh <service-name> <port>"
    echo "Example: ./create-service.sh tutor-api 8001"
    exit 1
fi

SERVICE_NAME=$1
PORT=$2
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Creating FastAPI service: $SERVICE_NAME on port $PORT"

# Create service directory
mkdir -p "$SERVICE_NAME"
cd "$SERVICE_NAME"

# Copy and customize templates
echo "Generating main.py..."
cat > main.py <<EOF
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="$SERVICE_NAME")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "$SERVICE_NAME"}

@app.get("/")
async def root():
    return {"message": "Welcome to $SERVICE_NAME", "version": "1.0.0"}

# Add your endpoints here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=$PORT)
EOF

echo "Generating requirements.txt..."
cat > requirements.txt <<EOF
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
httpx==0.25.1
pydantic==2.5.0
EOF

echo "Generating Dockerfile..."
cat > Dockerfile <<EOF
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE $PORT

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "$PORT"]
EOF

echo "Generating k8s-deployment.yaml..."
cat > k8s-deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: $SERVICE_NAME
spec:
  replicas: 1
  selector:
    matchLabels:
      app: $SERVICE_NAME
  template:
    metadata:
      labels:
        app: $SERVICE_NAME
    spec:
      containers:
      - name: $SERVICE_NAME
        image: $SERVICE_NAME:latest
        imagePullPolicy: Never
        ports:
        - containerPort: $PORT
        env:
        - name: PORT
          value: "$PORT"
---
apiVersion: v1
kind: Service
metadata:
  name: $SERVICE_NAME
spec:
  type: NodePort
  selector:
    app: $SERVICE_NAME
  ports:
  - port: $PORT
    targetPort: $PORT
    nodePort: 300$(echo $PORT | tail -c 3)
EOF

echo "Generating README.md..."
cat > README.md <<EOF
# $SERVICE_NAME

FastAPI microservice for LearnFlow

## Local Development

\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload --port $PORT

# Test
curl http://localhost:$PORT/health
\`\`\`

## Docker Build

\`\`\`bash
# Build image
docker build -t $SERVICE_NAME:latest .

# Run container
docker run -p $PORT:$PORT $SERVICE_NAME:latest
\`\`\`

## Kubernetes Deployment

\`\`\`bash
# Build for Minikube
eval \$(minikube docker-env)
docker build -t $SERVICE_NAME:latest .

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -l app=$SERVICE_NAME
kubectl get svc $SERVICE_NAME

# Test service
minikube service $SERVICE_NAME --url
\`\`\`
EOF

echo "✅ Service '$SERVICE_NAME' created successfully!"
echo ""
echo "Next steps:"
echo "1. cd $SERVICE_NAME"
echo "2. pip install -r requirements.txt"
echo "3. uvicorn main:app --reload --port $PORT"