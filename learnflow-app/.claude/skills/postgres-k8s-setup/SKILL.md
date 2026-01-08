---
name: postgres-k8s-setup
description: Deploy PostgreSQL for LearnFlow with learnflow database
---

# PostgreSQL Kubernetes Setup

## When to Use
- Need database for users, progress, code submissions
- Setting up LearnFlow backend

## Instructions
1. Run `./scripts/deploy-postgres.sh`
2. Run `python scripts/verify-postgres.py`
3. Confirm database 'learnflow' exists and is accessible

## Validation
- PostgreSQL pod Running
- Database 'learnflow' exists
