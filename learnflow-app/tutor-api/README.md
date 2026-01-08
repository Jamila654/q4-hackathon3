# tutor-api

FastAPI microservice for LearnFlow

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload --port 8001

# Test
curl http://localhost:8001/health
```

## Docker Build

```bash
# Build image
docker build -t tutor-api:latest .

# Run container
docker run -p 8001:8001 tutor-api:latest
```

## Kubernetes Deployment

```bash
# Build for Minikube
eval $(minikube docker-env)
docker build -t tutor-api:latest .

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -l app=tutor-api
kubectl get svc tutor-api

# Test service
minikube service tutor-api --url
```
