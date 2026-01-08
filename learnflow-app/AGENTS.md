# LearnFlow AGENTS.md

This document outlines the architecture and components of the LearnFlow project, an AI-powered platform designed for learning Python.

## 1. Architecture Overview

LearnFlow is built on a modern, cloud-native architecture utilizing microservices, event-driven communication, and container orchestration. The system is composed of several key "agents" or components that work together to provide a seamless and interactive learning experience.

-   **Frontend:** Next.js with Monaco Editor
-   **Backend:** FastAPI Microservices
-   **Service-to-Service Communication:** Dapr
-   **Event Streaming:** Apache Kafka
-   **Database:** PostgreSQL
-   **Deployment:** Kubernetes (via Minikube for local development)

## 2. Component Agents

### 2.1 Frontend Agent: The Learner's Interface

The frontend is a responsive web application built with **Next.js**. It provides the primary interface for users to interact with the platform.

-   **Interactive Code Editor:** Features an integrated **Monaco Editor**, the same editor that powers VS Code. This provides a rich, familiar coding environment with syntax highlighting, auto-completion, and error checking, directly in the browser.
-   **User Dashboard:** Displays course progress, lesson plans, and feedback.
-   **Communication:** Interacts with the backend services via RESTful APIs and real-time updates through WebSockets if necessary.

### 2.2 Backend Agents: The Brains of the Operation

The backend is composed of several **FastAPI microservices**. Each service is responsible for a specific domain, such as user management, course content, code execution, and grading.

-   **Technology:** Built with **FastAPI** for high performance and ease of development.
-   **Modularity:** The microservice architecture allows for independent development, deployment, and scaling of each component.
-   **Services:**
    -   `user-service`: Manages user authentication and profiles.
    -   `course-service`: Serves lesson content and tracks progress.
    -   `execution-service`: Securely runs user-submitted Python code.
    -   `grading-service`: Uses AI to analyze code submissions, provide feedback, and assess correctness.

### 2.3 Orchestration Agent: Dapr

**Dapr (Distributed Application Runtime)** is used to simplify the complexities of building microservices.

-   **Service Discovery & Invocation:** Enables services to discover and communicate with each other reliably.
-   **State Management:** Provides a consistent API for managing state, abstracting away the underlying data store.
-   **Pub/Sub Messaging:** Integrates with Apache Kafka, allowing services to communicate asynchronously through a publish-subscribe model. This decouples services and improves resilience.

### 2.4 Event Streaming Agent: Apache Kafka

**Apache Kafka** serves as the central nervous system for event-driven communication between microservices.

-   **Asynchronous Events:** Used for handling events such as `code_submitted`, `grading_complete`, and `user_progress_updated`.
-   **Scalability & Reliability:** Provides a highly scalable and fault-tolerant message bus, ensuring that no events are lost.
-   **Decoupling:** Services can produce and consume events without being directly aware of each other, promoting a loosely coupled architecture.

### 2.5 Data Persistence Agent: PostgreSQL

**PostgreSQL** is the relational database used for storing all persistent data.

-   **Structured Data:** Stores user accounts, course materials, submission history, and grades.
-   **Reliability:** Chosen for its robustness, reliability, and strong support for complex queries.

### 2.6 Deployment Agent: Kubernetes & Minikube

The entire LearnFlow platform is designed to be deployed on **Kubernetes**.

-   **Containerization:** All services are packaged as Docker containers.
-   **Orchestration:** Kubernetes automates the deployment, scaling, and management of these containerized applications.
-   **Local Development:** **Minikube** is used to run a single-node Kubernetes cluster locally, allowing developers to replicate the production environment on their own machines for development and testing.
