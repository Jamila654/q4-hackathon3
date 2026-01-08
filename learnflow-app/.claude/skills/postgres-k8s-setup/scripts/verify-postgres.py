#!/usr/bin/env python3
import subprocess
import sys

# Check pod
result = subprocess.run(["kubectl", "get", "pods", "-n", "database", "-o", "jsonpath={.items[0].status.phase}"], capture_output=True, text=True)
if result.stdout.strip() != "Running":
    print("✗ PostgreSQL pod not Running")
    sys.exit(1)

# Check database exists
db_check = subprocess.run([
    "kubectl", "exec", "postgres-postgresql-0", "-n", "database", "--",
    "bash", "-c", "PGPASSWORD=learnflow123 psql -U postgres -d learnflow -c '\\l' | grep learnflow"
], capture_output=True, text=True)

if "learnflow" not in db_check.stdout:
    print("✗ Database 'learnflow' not found")
    sys.exit(1)

print("✓ PostgreSQL ready with 'learnflow' database")
