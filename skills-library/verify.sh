#!/bin/bash
echo "Checking everything..."

docker --version && echo "✓ Docker OK"
minikube status && echo "✓ Minikube OK"
kubectl cluster-info && echo "✓ Kubectl OK" || echo "✗ Kubectl issue"
helm version && echo "✓ Helm OK"
claude --version && echo "✓ Claude Code OK"
goose --version && echo "✓ Goose OK" || echo "(Optional)"
echo "If most are ✓ and kubectl shows cluster → Phase 1 DONE!"
