#!/bin/bash
set -e

echo "Deploying PostgreSQL..."
kubectl create namespace database --dry-run=client -o yaml | kubectl apply -f -
helm upgrade --install postgres bitnami/postgresql \
  --namespace database \
  --set auth.postgresPassword=learnflow123 \
  --set auth.database=learnflow \
  --set primary.persistence.enabled=false

echo "✓ PostgreSQL deployed"
