# progress-api

FastAPI microservice for LearnFlow

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload --port 8003

# Test
curl http://localhost:8003/health
```

## Docker Build

```bash
# Build image
docker build -t progress-api:latest .

# Run container
docker run -p 8003:8003 progress-api:latest
```

## Kubernetes Deployment

```bash
# Build for Minikube
eval $(minikube docker-env)
docker build -t progress-api:latest .

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -l app=progress-api
kubectl get svc progress-api

# Test service
minikube service progress-api --url
```
