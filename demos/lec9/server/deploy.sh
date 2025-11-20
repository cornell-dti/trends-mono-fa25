#!/bin/bash

# Exit on error
set -e

echo "Deploying to Google Cloud Run..."

# Ensure a project is set
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)
if [ -z "$CURRENT_PROJECT" ]; then
  echo "Error: No Google Cloud project set."
  echo "Please run: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi

echo "Target Project: $CURRENT_PROJECT"

# Check if project ID looks like a number (common mistake)
if [[ "$CURRENT_PROJECT" =~ ^[0-9]+$ ]]; then
  echo "WARNING: Your project ID ($CURRENT_PROJECT) looks like a project number."
  echo "Deployment might fail. You usually need the alphanumeric 'Project ID' (e.g., my-project-123)."
  echo "If it fails, run: gcloud config set project PROJECT_ID"
fi

# Deploy using source-based deployment (Cloud Build)
# This will zip the current directory (respecting .gcloudignore), upload it,
# build it using the Dockerfile, and deploy the resulting image.
gcloud run deploy lec9-server \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --min-instances=0 \
  --cpu-throttling

echo "Deployment complete!"


