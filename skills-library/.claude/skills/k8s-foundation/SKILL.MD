---
name: k8s-foundation
description: Verify Kubernetes cluster health and prepare Helm
---

# Kubernetes Foundation Check

## When to Use
- Before any deployment
- To confirm Minikube cluster is healthy

## Instructions
1. Run commands to check cluster status.
2. Update Helm repositories.
3. Report if everything is ready.

## Commands to run
- kubectl get nodes
- kubectl get pods --all-namespaces
- helm repo update

## Validation
- Node status: Ready
- Core system pods: Running