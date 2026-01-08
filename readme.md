# LearnFlow: AI-Powered Python Learning Platform 🐍🤖
**Hackathon III - Reusable Intelligence & Cloud-Native Mastery**

LearnFlow is an interactive educational platform designed to master Python using **Agentic Infrastructure**. It features an integrated AI Tutor and a secure remote Code Execution engine running on a high-performance cloud-native stack.

---

## 🚀 Key Features
- **Agentic AI Tutor:** Personalized, context-aware guidance for Python lessons using advanced LLM agents.
- **Remote Code Execution:** Secure execution of Python code with instant console feedback.
- **Cloud-Native Mastery:** Full integration with Kubernetes-managed infrastructure and microservices.
- **Progress Analytics:** Persistent tracking of user learning journeys via a containerized PostgreSQL database.

---

## 🏗️ Architecture Overview

LearnFlow operates on a decoupled microservices architecture to ensure scalability and "Cloud-Native" efficiency:



- **Frontend:** Next.js with Tailwind CSS and Monaco Editor.
- **Intelligence Layer:** FastAPI microservices (Ports 8001, 8002, 8003).
- **Data Layer:** PostgreSQL cluster managed via Kubernetes.

---

## 🛠️ Installation & Setup Guide

To run the LearnFlow platform locally while maintaining the Kubernetes-managed infrastructure, follow these steps exactly.

### 1. Clone the Project
```bash
git clone <YOUR_GITHUB_URL>
cd learnflow
2. Frontend Setup
Install the necessary dependencies and start the Next.js development server:

Bash

npm install
npm run dev
The User Interface will be active at http://localhost:3000.

3. Infrastructure & Backend Services
You must start the following services in separate terminal windows to enable the Agentic features.

Step A: Database Bridge (Kubernetes)
Connect the local application to the PostgreSQL cluster running inside your Kubernetes namespace:

Bash

kubectl port-forward -n database svc/postgres-postgresql 5433:5432
Step B: AI Tutor Agent (Port 8001)
Launches the FastAPI service responsible for the AI Tutor chat:

Bash

uvicorn main:app --reload --port 8001
Step C: Code Execution Engine (Port 8002)
Launches the FastAPI service responsible for running Python code:

Bash

uvicorn main:app --reload --port 8002
Step D: Utility & Monitoring Service (Port 8003)
Launches the logging and service health monitoring utility:

Bash

uvicorn main:app --reload --port 8003
📦 Cloud-Native Mastery (K8s)
This project includes Kubernetes manifests to demonstrate cloud scalability. Even when running locally, the application utilizes kubectl to interact with a containerized data layer.

/k8s/database: Persistent Volume and PostgreSQL Deployment.

/k8s/services: Service discovery for the Agentic microservices.