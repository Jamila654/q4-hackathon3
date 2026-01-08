# # Create namespace
# kubectl create namespace postgres --dry-run=client -o yaml | kubectl apply -f -

# # Add Bitnami Helm repo
# helm repo add bitnami https://charts.bitnami.com/bitnami
# helm repo update

# # Install PostgreSQL
# helm install postgres bitnami/postgresql \
#   --namespace postgres \
#   --set auth.postgresPassword=postgres \
#   --set auth.database=learnflow \
#   --set primary.persistence.enabled=false

# # Wait for pod to be ready
# kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=postgresql -n postgres --timeout=300s

# # Verify
# kubectl get pods -n postgres

# Add/update Helm repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install PostgreSQL with proper settings
helm install postgres bitnami/postgresql \
  --namespace database \
  --set auth.postgresPassword=learnflow123 \
  --set auth.database=learnflow \
  --set primary.persistence.enabled=true \
  --set primary.persistence.size=1Gi

# Wait for it to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=postgresql -n database --timeout=180s