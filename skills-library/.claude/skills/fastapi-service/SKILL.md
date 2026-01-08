---
name: fastapi-service
description: Create a FastAPI microservice with Docker and Kubernetes deployment
---

# FastAPI Microservice Generator

## When to Use
- Creating new backend microservices
- Building REST APIs for LearnFlow
- Need containerized FastAPI service on K8s

## Instructions
1. Run `./scripts/create-service.sh <service-name> <port>`
   - Example: `./scripts/create-service.sh tutor-api 8001`
2. Navigate to generated `<service-name>/` folder
3. Review the generated files:
   - `main.py` (FastAPI app)
   - `requirements.txt` (Python dependencies)
   - `Dockerfile` (Container image)
   - `k8s-deployment.yaml` (Kubernetes manifest)
4. Build and deploy using the generated README instructions

## What Gets Created
- FastAPI app with health check endpoint
- Docker configuration
- Kubernetes deployment + service
- Requirements file with FastAPI, uvicorn, python-dotenv

## Validation
- [ ] Service folder created with all files
- [ ] Can run locally: `uvicorn main:app --reload`
- [ ] Health endpoint responds: `curl http://localhost:8000/health`