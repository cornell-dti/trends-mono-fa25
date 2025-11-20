# Lecture 9 Server - Deployment

## Prerequisites

1.  **Docker**: Install Docker Desktop.
    - [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - **Important**: Open Docker Desktop and ensure it is **running** in the background before proceeding.
2.  **Google Cloud SDK**: Install the `gcloud` CLI.
    - [Official Installation Guide](https://docs.cloud.google.com/sdk/docs/install)
3.  **GCP Project**: Create a project in Google Cloud Console.
    - **Finding your Project ID**:
      - Go to the [Google Cloud Console Dashboard](https://console.cloud.google.com/home/dashboard).
      - The **Project Info** card (usually top-left) shows your "Project ID".
      - _Note: Project ID is often different from Project Name (e.g., `my-project-12345`)._
    - Set your project as the default in your terminal:
      ```bash
      gcloud config set project YOUR_PROJECT_ID
      ```
4.  **Billing**: Enable billing for your project.
    - **Note**: Billing _must_ be enabled to use Cloud Build and Cloud Run, even if you stay within the free tier usage limits.
5.  **APIs**: Enable the Cloud Run Admin API and Cloud Build API.

    ```bash
    gcloud services enable run.googleapis.com cloudbuild.googleapis.com
    ```

## Local Development

1.  Install dependencies:

    ```bash
    pnpm install
    ```

2.  Create `.env` file:

    ```bash
    cp .env.example .env
    # Edit .env with your secrets if needed
    ```

3.  Run locally:
    ```bash
    pnpm run dev
    ```

## Deployment to Cloud Run

We use a `Dockerfile` to containerize the application and deploy it to Cloud Run.

### Quick Deploy

**Mac/Linux:**
Run the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows:**
Run the command manually in PowerShell or Command Prompt:

```powershell
gcloud run deploy lec9-server --source . --region us-central1 --allow-unauthenticated --min-instances=0 --cpu-throttling --project YOUR_PROJECT_ID
```

This command does the following:

1.  Uploads your source code to Google Cloud Build (respecting `.gcloudignore`).
2.  Builds a Docker image using the `Dockerfile`.
3.  Deploys the image to a Cloud Run service named `lec9-server`.

### Environment Variables

The `Dockerfile` includes a step to copy the `.env` file into the container if it exists:

```dockerfile
COPY .env* ./
```

This allows you to "forcibly" read environment variables from your local `.env` file even if it's not in Git, assuming you have the file present when you run the deploy command.

**Note**: In a real production environment, it is recommended to set environment variables directly in the Cloud Run service configuration (or use Secret Manager) rather than baking them into the image or uploading `.env` files. (Talk to me if you are curious about this or want a shell script.)

To set environment variables via CLI:

```bash
gcloud run deploy lec9-server \
  --source . \
  --update-env-vars KEY=VALUE,KEY2=VALUE2
```

## Project Structure

- `Dockerfile`: Defines the container image using a **multi-stage build**.
  - **Stage 1 (Builder)**: Installs all dependencies and compiles TypeScript to JavaScript.
  - **Stage 2 (Production)**: Copies only the compiled `dist/` folder and installs production dependencies, ensuring a small and secure final image.
- `.gcloudignore`: Specifies files to exclude when uploading to Cloud Build (ensures `node_modules` isn't uploaded, but `.env` is included).
- `deploy.sh`: Helper script for deployment.
- `server.ts`: Updated to use `dotenv` and `process.env.PORT`.
