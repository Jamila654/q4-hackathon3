# code-runner

FastAPI microservice for LearnFlow

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn main:app --reload --port 8002

# Test
curl http://localhost:8002/health
```

## Docker Build

```bash
# Build image
docker build -t code-runner:latest .

# Run container
docker run -p 8002:8002 code-runner:latest
```

## Kubernetes Deployment

```bash
# Build for Minikube
eval $(minikube docker-env)
docker build -t code-runner:latest .

# Deploy
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods -l app=code-runner
kubectl get svc code-runner

# Test service
minikube service code-runner --url
```
