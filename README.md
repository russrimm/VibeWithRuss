# Product Photo Gallery Web App

A modern web application built with Next.js, TypeScript, and Azure services for displaying product photos.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [GitHub Account](https://github.com/signup)
- [Azure Account](https://azure.microsoft.com/free/)

## Getting Started

### 1. Development Environment Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Install VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
3. Install Git from [git-scm.com](https://git-scm.com/)

### 2. GitHub Repository Setup & Workflow

#### a. Create a New GitHub Repository
1. Go to [GitHub](https://github.com/)
2. Click the **+** icon (top right) > **New repository**
3. Name it (e.g., `product-photo-gallery`)
4. Set visibility (Public or Private)
5. (Optional) Add a description
6. **Initialize with a README** (recommended)
7. Click **Create repository**

#### b. Clone the Repository Locally
```bash
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery
```

#### c. Create a New Branch
```bash
git checkout -b feature/your-feature-name
```

#### d. Make Changes, Pull, and Push
- Make your code changes
- Check status:
  ```bash
  git status
  ```
- Stage and commit:
  ```bash
  git add .
  git commit -m "Describe your changes"
  ```
- Pull latest changes from main (resolve conflicts if any):
  ```bash
  git pull origin main
  ```
- Push your branch:
  ```bash
  git push origin feature/your-feature-name
  ```

#### e. Create a Pull Request (PR)
1. Go to your repo on GitHub
2. Click **Compare & pull request**
3. Add a description and submit the PR
4. Wait for review/merge

#### f. Check GitHub Actions Status
1. Go to the **Actions** tab in your GitHub repo
2. Click on the latest workflow run to see build/deploy status
3. Fix any errors and push again if needed

#### What are commits, pull requests, and merging?

- **Commit:**
  - A commit is a snapshot of your code changes. Each commit has a message describing what changed. Commits let you track the history of your project and roll back if needed.
  - You create a commit after staging your changes with `git add` and then running `git commit -m "message"`.

- **Pull Request (PR):**
  - A pull request is a request to merge your changes from one branch (e.g., a feature branch) into another (usually `main`).
  - PRs let you review, discuss, and test changes before they become part of the main codebase. They are essential for collaboration and code quality.
  - In GitHub, you create a PR after pushing your branch. Team members (or Copilot) can review and approve it.

- **Merging:**
  - Merging is the process of integrating changes from one branch into another. When a PR is approved, you merge it to make the changes part of the main branch.
  - This updates the main branch with your new features, bug fixes, or improvements.

**Why use this process?**
- Ensures code is reviewed and tested before going live
- Prevents conflicts and mistakes in the main codebase
- Makes it easy to track, discuss, and roll back changes if needed

### 3. Azure Deployment YAML (Node.js + Next.js)

Azure can auto-generate a GitHub Actions workflow for Node.js/Next.js deployments:

1. In the [Azure Portal](https://portal.azure.com/), go to your App Service
2. In the left menu, select **Deployment Center**
3. Choose **GitHub** as the source, authenticate, and select your repo/branch
4. Azure will auto-generate a `.github/workflows/azure-webapps-node.yml` file
5. Review and commit the YAML file to your repo

**Example YAML for Node.js + Next.js:**
```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.x'
      - name: npm install, build, and test
        run: |
          npm install
          npm run build
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          package: .
```

- Azure will set the required secrets (`AZURE_WEBAPP_NAME`) automatically if you use the Deployment Center.
- For Next.js, make sure your build output is correctly configured (see Azure docs for SSR/static export options).

## ⚠️ Azure Deployment Security Best Practices

- **Always use Service Principal authentication for Azure deployments.**
- **Do NOT use publish profiles or basic authentication in GitHub Actions workflows.**
- Remove any `publish-profile:` lines from workflow YAMLs.
- Never use the Azure Portal's "publish profile" workflow generator.
- If you see a workflow step referencing `publish-profile`, replace it with Service Principal authentication as described above.

### 4. Local Project Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery

# Create Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --eslint

# Install dependencies (including Azure Cosmos DB SDK)
npm install @azure/cosmos @azure/identity next-auth tailwindcss postcss autoprefixer react next @types/react @types/node @types/bcryptjs bcryptjs

# If npm reports vulnerabilities, run:
npm audit fix
```

- If you see an error like `Cannot find module '@azure/cosmos'`, make sure you have run the above `npm install` command. This package is required for Cosmos DB integration and includes its own TypeScript types.

### 5. VS Code Setup

1. Open VS Code
2. Install the following extensions:
   - Cursor AI
   - ESLint
   - Prettier
   - Azure Tools
   - Azure Cosmos DB

### 6. Using Cursor AI Agent

1. Open your project in VS Code
2. Press `Cmd/Ctrl + Shift + P`
3. Type "Cursor: Start Agent Mode"
4. Use the following prompts to build your app:

```markdown
"Create a Next.js component for displaying product photos in a grid layout"
"Add Azure Blob Storage integration for storing product images"
"Implement a product card component with hover effects"
"Add a shopping cart functionality"
"Set up user authentication with Azure AD"
"Create Cosmos DB models for user management"
```

### 7. Azure Services Setup

1. Create an Azure account at [azure.microsoft.com/free](https://azure.microsoft.com/free/)
2. Set up the following services:
   - Azure Blob Storage (for product images)
   - Azure App Service (for hosting)
   - Azure CDN (for image delivery)
   - Azure Cosmos DB (for user data)
   - Azure Active Directory (for authentication)

#### 7a. Creating Azure Cosmos DB and Getting Credentials

To use Cosmos DB, you must create an instance in Azure and get the connection details for your `.env.local` file.

#### How to Create a Cosmos DB Instance
1. Go to the [Azure Portal](https://portal.azure.com/)
2. Click **Create a resource** > **Databases** > **Azure Cosmos DB**
3. Choose **Core (SQL) - Recommended**
4. Fill in the required fields:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Account Name**: Unique name for your Cosmos DB account
   - **API**: Core (SQL)
   - **Region**: Choose a region close to you
5. Click **Review + create** and then **Create**
6. Wait for deployment to complete

#### Create Database and Container
1. In your Cosmos DB account, go to **Data Explorer**
2. Click **New Database**
   - Name: `user-database` (or your choice)
3. Click **New Container**
   - Database: `user-database`
   - Container ID: `users` (or your choice)
   - Partition key: `/email`
   - Throughput: 400 RU/s (default is fine for dev)

#### Get Your Endpoint and Key
1. In your Cosmos DB account, go to **Keys** in the left menu
2. Copy the **URI** (this is your `COSMOS_ENDPOINT`)
3. Copy the **PRIMARY KEY** (this is your `COSMOS_KEY`)

#### Add to `.env.local`
Create a `.env.local` file in your project root with:

```env
COSMOS_ENDPOINT=your-cosmos-endpoint-url
COSMOS_KEY=your-cosmos-key
COSMOS_DATABASE=user-database
COSMOS_CONTAINER=users
```

**Tip:** Never commit `.env.local` to your repo. Always restart your dev server after editing this file.

#### 7b. Azure Entra (Azure AD) App Registration for Authentication

To use Azure Active Directory (now Azure Entra ID) for authentication, follow these steps to register your app, set permissions, and get the values for your `.env.local` file.

#### How to Register an App in Azure Entra (Azure AD)
1. Go to the [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** (or **Microsoft Entra ID**) > **App registrations**
3. Click **New registration**
4. Set a **Name** (e.g., `Product Photo Gallery App`)
5. **Supported account types**: Choose as needed (single-tenant or multi-tenant)
6. **Redirect URI**: Set to `http://localhost:3000/api/auth/callback/azure-ad` for local dev (add your production URI later)
7. Click **Register**

#### Important: Token Settings for Authentication
- In your app registration, go to **Authentication**.
- Under **Implicit grant and hybrid flows**:
  - **Check** ✔️ **ID tokens (used for implicit and hybrid flows)** (required for NextAuth.js/OpenID Connect login)
  - **Check** Access tokens (for implicit flows) **only if** you need to call APIs from the browser (not needed for most Next.js/NextAuth.js setups)

| Token Type   | Enable? | When?                                              |
|--------------|---------|----------------------------------------------------|
| ID tokens    | ✔️ Yes  | Always, for OpenID Connect/NextAuth.js login       |
| Access tokens| Optional| Only if calling APIs from browser (SPA scenario)   |

#### Generate a Client Secret
1. In your app registration, go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and expiration, then click **Add**
4. Copy the **Value** (this is your `AZURE_AD_CLIENT_SECRET`)

#### Set API Permissions
1. Go to **API permissions**
2. By default, `User.Read` is included (sufficient for basic sign-in)
3. To enable profile/email info, click **Add a permission** > **Microsoft Graph** > **Delegated permissions** and add:
   - `openid`
   - `profile`
   - `email`
   - (Optional) `offline_access` for refresh tokens
4. Click **Grant admin consent** if required

#### Get Your App Credentials
- **AZURE_AD_CLIENT_ID**: From the app registration's **Overview** page
- **AZURE_AD_CLIENT_SECRET**: From the secret you created above
- **AZURE_AD_TENANT_ID**: From the **Overview** page (Directory (tenant) ID)

#### Add to `.env.local`
```env
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
```

#### Update Redirect URIs for Production
- In the app registration, go to **Authentication** > **Redirect URIs**
- Add your production callback URL (e.g., `https://yourdomain.com/api/auth/callback/azure-ad`)

**Tip:** Never commit `.env.local` to your repo. Always restart your dev server after editing this file.

### 7c. Creating Azure Blob Storage for Product Images

For storing and serving product images, you should use **Azure Blob Storage** (not Data Lake Gen2 or Azure Files).

#### Why Azure Blob Storage?
- Optimized for storing and serving unstructured data like images, videos, and documents
- Standard choice for web apps needing to upload, store, and serve files
- Easy to integrate with your app and supports public/private access

#### Do NOT use:
- **Azure Data Lake Storage Gen2** (for analytics/big data scenarios)
- **Azure Files** (for SMB file shares, not web images)

#### How to Create Azure Blob Storage
1. In the [Azure Portal](https://portal.azure.com/), click **Create a resource** > **Storage** > **Storage account**
2. Fill in the required fields (Subscription, Resource Group, Storage account name, Region)
3. **Performance**: Standard (default)
4. **Redundancy**: Locally-redundant storage (LRS) is fine for dev
5. **Enable Blob Storage** (default)
6. Click **Review + create** and then **Create**
7. After deployment, go to your storage account
8. In the left menu, under **Data storage**, click **Containers**
9. Click **+ Container** and name it (e.g., `product-images`)
10. Set **Public access level** as needed (private for uploads, blob for public read access)

#### Where to Find Your Blob Container Name and Connection String

- **Blob Container Name:**
  1. In the Azure Portal, go to your Storage Account
  2. In the left menu, under **Data storage**, click **Containers**
  3. The name you gave your container (e.g., `product-images`) is your blob container name

- **Connection String:**
  1. In the Azure Portal, go to your Storage Account
  2. In the left menu, under **Security + networking**, click **Access keys**
  3. Under **key1** or **key2**, copy the **Connection string** value
  4. Use this as your `AZURE_STORAGE_CONNECTION_STRING` in `.env.local`

**Tip:** Never share your connection string publicly. Always restart your dev server after editing `.env.local`.

### 8. Cursor Rules

Create a `.cursor/rules` directory in your project and add the following rules:

```markdown
---
description: Frontend Component Standards
globs: ["src/components/**/*"]
alwaysApply: true
---

- Use TypeScript for all components
- Follow atomic design principles
- Implement responsive design
- Use Tailwind CSS for styling
```

For more rule templates and examples, visit:
- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [Cursor Directory](https://cursor.directory) for community rules

### 9. Project Structure

```
product-photo-gallery/
├── .cursor/
│   └── rules/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   └── users/
│   │   │   │   
│   │   │   │   
│   │   │   │   
│   │   │   └── models/
├── public/
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Database Management

1. Use Azure Portal or Azure Data Studio for database management
2. Implement proper error handling
3. Use connection pooling
4. Implement proper logging
5. Monitor RU/s usage

## Security

1. Implement proper authentication with NextAuth.js
2. Use proper authorization
3. Implement proper input validation
4. Use proper error handling
5. Implement proper logging
6. Use environment variables for sensitive data

## Environment Variables

Create a `.env.local` file:

```env
# Azure Cosmos DB
COSMOS_ENDPOINT=your-cosmos-endpoint
COSMOS_KEY=your-cosmos-key
COSMOS_DATABASE=user-database
COSMOS_CONTAINER=users

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Azure AD
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
```

## Deployment

1. Push your code to GitHub
2. Connect your Azure App Service to your GitHub repository
3. Configure deployment settings in Azure Portal
4. Deploy your application
5. Configure environment variables in Azure App Service
6. Set up proper monitoring

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Integrating MCP Servers (context7, sequential-thinking, puppeteer) with GitHub Copilot and Cursor

### What are MCP Servers?
MCP (Model Context Protocol) servers like context7, sequential-thinking, and puppeteer allow you to supercharge Copilot and Cursor with advanced context, reasoning, and automation capabilities.

### 1. Add MCP Servers to GitHub Copilot and Cursor

#### a. context7 (Rules Engine)
- **Repo:** [context7/context7](https://github.com/context7/context7)
- **Docs:** [context7.com](https://context7.com/)
- **Usage:**
  1. Clone the repo and follow the setup instructions.
  2. Start the context7 MCP server locally or deploy it.
  3. In Cursor or Copilot, go to settings and add the MCP server endpoint (e.g., `http://localhost:8000`).
  4. Use context7 to search, apply, and manage rules for your project.
- **Screenshot:**
  ![context7 Home](Users/jaxenrimmerman/Downloads/context7-home-2025-06-08T00-12-05-738Z.png)
  ![context7 GitHub](Users/jaxenrimmerman/Downloads/context7-github-2025-06-08T00-12-25-398Z.png)
  ![context7 Copilot/Cursor Usage](Users/jaxenrimmerman/Downloads/context7-github-copilot-cursor-2025-06-08T00-13-49-908Z.png)

#### b. sequential-thinking (Chain-of-Thought Reasoning)
- **Repo:** [context7/sequential-thinking](https://github.com/context7/sequential-thinking)
- **Usage:**
  1. Clone and run the sequential-thinking MCP server.
  2. Add its endpoint to Cursor/Copilot MCP settings.
  3. Use it to enable advanced step-by-step reasoning in your AI workflows.
- **Screenshot:**
  ![sequential-thinking GitHub](Users/jaxenrimmerman/Downloads/sequential-thinking-github-2025-06-08T00-12-16-099Z.png)

#### c. puppeteer-mcp (Automation & Screenshots)
- **Repo:** [context7/puppeteer-mcp](https://github.com/context7/puppeteer-mcp)
- **Usage:**
  1. Clone and run the puppeteer-mcp server.
  2. Add its endpoint to Cursor/Copilot MCP settings.
  3. Use it to automate browser actions and take screenshots for documentation or testing.
- **Screenshot:**
  ![puppeteer-mcp GitHub](Users/jaxenrimmerman/Downloads/puppeteer-mcp-github-2025-06-08T00-13-22-995Z.png)

### 2. Why Use These MCPs?
- **context7:** Instantly search, apply, and enforce project rules. Great for onboarding and code consistency.
- **sequential-thinking:** Get step-by-step, chain-of-thought reasoning for complex tasks.
- **puppeteer-mcp:** Automate browser tasks, take screenshots, and generate visual documentation.

### 3. More Resources
- [context7.com](https://context7.com/) — Official docs and usage
- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [Cursor Directory](https://cursor.directory) — Search engine for rules

### 10. GitHub Token Setup for Azure Web App

To enable GitHub integration (for CI/CD, private repo access, or GitHub API calls), you need to generate a GitHub Personal Access Token and add it as an environment variable in your Azure Web App.

#### a. Generate a GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **Generate new token** (classic or fine-grained)
3. Give it a name (e.g., "Azure Web App Token")
4. Set an expiration (recommended: 90 days or less)
5. Select the required scopes (usually `repo`, `workflow`, and `read:user`)
6. Click **Generate token** and copy the token (starts with `ghp_...`)

#### b. Add the Token to Azure Web App
1. Go to the [Azure Portal](https://portal.azure.com/)
2. Navigate to your App Service (Web App)
3. In the left menu, select **Configuration** under **Settings**
4. Click **+ New application setting**
5. Set the name to `GITHUB_TOKEN` and paste your token as the value
6. Click **OK** and then **Save** at the top

**CLI alternative:**
```sh
az webapp config appsettings set --name <app-name> --resource-group <resource-group> --settings GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Never commit your token to code or share it publicly.**

### 11. Recommended Cursor/VS Code Rules for TypeScript/Next.js

For best practices, code quality, and consistency, use the [front-end-cursor-rules](https://cursor.directory/front-end-cursor-rules) from cursor.directory. These rules are designed for React, Next.js, TypeScript, TailwindCSS, and modern UI/UX frameworks.

#### How to Add These Rules in VS Code or Cursor

1. **Open your project in VS Code or Cursor.**
2. Open the integrated terminal.
3. Run:
   ```bash
   npx cursor-directory rules add front-end-cursor-rules
   ```
4. This will fetch and add the recommended rules to your `.cursor/rules` directory.
5. Review the rules in `.cursor/rules/front-end-cursor-rules.mdc` and adjust if needed.
6. Restart Cursor or VS Code to ensure the rules are loaded.

**Why use these rules?**
- Enforces best practices for TypeScript, Next.js, React, and TailwindCSS
- Ensures accessibility, naming, and code style standards
- Helps new team members onboard quickly
- Keeps your codebase clean and maintainable

For more details, see [cursor.directory/front-end-cursor-rules](https://cursor.directory/front-end-cursor-rules)

### 12. Example package.json and Explanation

Below is a sample `package.json` for this project, including all required dependencies and scripts for a Next.js + TypeScript + TailwindCSS app:

```json
{
  "devDependencies": {
    "@types/node": "^22.15.30"
  },
  "dependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/next": "^8.0.7",
    "@types/react": "^19.1.6",
    "autoprefixer": "^10.4.21",
    "bcryptjs": "^3.0.2",
    "next": "^15.3.3",
    "postcss": "^8.5.4",
    "react": "^19.1.0",
    "tailwindcss": "^4.1.8"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

#### What each line does:
- **devDependencies**: Packages needed only for development (type definitions for Node.js)
- **dependencies**: Main packages for your app:
  - `@types/bcryptjs`, `@types/react`: TypeScript type definitions for those libraries
  - `autoprefixer`, `postcss`, `tailwindcss`: For Tailwind CSS styling
  - `bcryptjs`: Password hashing for authentication
  - `next`: The Next.js framework
  - `react`: The React library
- **scripts**:
  - `dev`: Starts the Next.js development server (`npm run dev`)
  - `build`: Builds the app for production (`npm run build`)
  - `start`: Starts the production server (`npm run start`)

**Tip:** If you see `missing script: dev`, make sure your `package.json` includes the `scripts` section above.

### 13. Example GitHub Actions Workflow for Azure Deployment

Below is a full sample `.github/workflows/azure-webapps-node.yml` for deploying a Node.js + Next.js app to Azure Web App, including Azure login:

```yaml
name: Build and deploy Node.js app to Azure Web App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # Checkout code
      - uses: actions/checkout@v4

      # Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.x'

      # Install dependencies and build
      - name: npm install, build, and test
        run: |
          npm install
          npm run build

      # Login to Azure using a Service Principal
      - name: 'Login to Azure'
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      # Deploy to Azure Web App
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v3
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          package: .
```

#### What each part does:
- **on.push.branches.main**: Triggers the workflow on every push to the `main` branch
- **jobs.build-and-deploy**: The main job for building and deploying
- **runs-on: ubuntu-latest**: Uses the latest Ubuntu runner
- **actions/checkout@v4**: Checks out your code
- **actions/setup-node@v4**: Sets up Node.js 22.x for the build
- **npm install, build**: Installs dependencies and builds your app
- **azure/login@v2**: Logs in to Azure using a Service Principal (credentials stored in `AZURE_CREDENTIALS` secret)
- **azure/webapps-deploy@v3**: Deploys your app to Azure Web App using the app name secret

**Tip:**
- You must set the secret `AZURE_CREDENTIALS` in your GitHub repo settings for this workflow to work.
- This workflow is generated by Azure Deployment Center for Node.js/Next.js apps and is production-ready.

### 14. Requesting a Code Review from GitHub Copilot

With the latest GitHub Copilot features, you can now request an AI-powered code review directly from your pull request or code changes. This helps you catch bugs, improve code quality, and learn best practices—especially useful for new developers or teams.

#### How to Request a Copilot Code Review
1. Open a pull request in your GitHub repository.
2. Look for the **Copilot** or **Copilot Chat** panel (if enabled for your repo).
3. Click **Request Copilot Review** or use the Copilot Chat to ask for a review of your changes.
4. Copilot will analyze your code, suggest improvements, and highlight potential issues or best practices.

#### Benefits of Copilot Code Review
- **Catches bugs and anti-patterns** before they reach production
- **Suggests improvements** for readability, performance, and security
- **Explains code** and best practices, helping you learn as you go
- **Saves time** for both new and experienced developers
- **Works 24/7**—get feedback instantly, even outside business hours

**Tip:** Combine Copilot reviews with human code reviews for the best results!

For more, see [GitHub Copilot documentation](https://docs.github.com/en/copilot).

### 15. Azure App Service: Deployment Slot Setting for Environment Variables

When adding environment variables (application settings) in Azure App Service, you'll see a checkbox called **Deployment slot setting**.

#### What does it do?
- If checked, the variable is **sticky** to the current slot (e.g., staging or production). It will NOT be swapped when you swap slots.
- If unchecked, the variable is **shared** and will be swapped between slots during a deployment slot swap.

#### When should you check it?
- **Check it (make sticky):**
  - For secrets, credentials, or any value that should be different between slots (e.g., `COSMOS_KEY`, `NEXTAUTH_SECRET`, `AZURE_AD_CLIENT_SECRET`, `NEXTAUTH_URL`)
  - For slot-specific resources (e.g., different databases or storage for staging vs. production)
- **Leave it unchecked:**
  - For values that should be the same across all slots (e.g., feature flags, shared config)

| Variable                        | Check "Deployment slot setting"? | Why?                                 |
|----------------------------------|:-------------------------------:|--------------------------------------|
| `COSMOS_KEY`                     | ✔️ Yes                          | Secret, likely different per slot    |
| `COSMOS_ENDPOINT`                | ✔️ Yes (if using different DBs)  | DB endpoint may differ per slot      |
| `NEXTAUTH_SECRET`                | ✔️ Yes                          | Secret, should not be swapped        |
| `AZURE_AD_CLIENT_SECRET`         | ✔️ Yes                          | Secret, slot-specific                |
| `NEXTAUTH_URL`                   | ✔️ Yes                          | Should match the slot's URL          |
| `GITHUB_TOKEN`                   | ✔️ Yes (if using different tokens)| Secret, slot-specific                |
| `AZURE_BLOB_CONTAINER`           | ✔️ Yes (if using different containers)| Slot-specific storage               |
| Feature flag (e.g., `FEATURE_X`) | ❌ No                           | Same for all slots                   |

#### For testing/dev purposes
- If you are using a **single resource for both dev and prod** (e.g., one Cosmos DB, one storage account), it's OK to **leave the box unchecked** while you're getting started.
- As your app grows, you should check the box and use separate resources for each slot/environment for better security and isolation.

**Reference:** [Microsoft Docs: App settings and connection strings in Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots#app-settings-and-connection-strings)

### 16. Fixing Azure Login Error in GitHub Actions: Setting AZURE_CREDENTIALS (Azure Portal GUI Only)

If you see an error like:
```
Error: Login failed with Error: Using auth-type: SERVICE_PRINCIPAL. Not all values are present. Ensure 'client-id' and 'tenant-id' are supplied.
```
This means your GitHub Actions workflow is missing the correct Azure credentials.

#### How to Fix (Azure Portal Only)

1. **Go to the [Azure Portal](https://portal.azure.com/)**
2. **Create an App Registration (Service Principal):**
   - Go to **Azure Active Directory** > **App registrations** > **New registration**
   - Name: `github-actions-deploy` (or similar)
   - Supported account types: leave as default
   - Click **Register**
3. **Create a Client Secret:**
   - In your new app registration, go to **Certificates & secrets**
   - Click **New client secret**
   - Add a description and expiration, then click **Add**
   - Copy the **Value** (this is your `clientSecret`)
4. **Get the Required Values:**
   - **clientId**: From the app registration's **Overview** page (Application (client) ID)
   - **tenantId**: From the **Overview** page (Directory (tenant) ID)
   - **clientSecret**: From the secret you just created
   - **subscriptionId**: Go to **Subscriptions** in the Azure Portal and copy your Subscription ID
5. **Assign the Contributor Role:**
   - Go to **Subscriptions** > your subscription > **Access control (IAM)**
   - Click **Add** > **Add role assignment**
   - In the role selection panel, click **Privileged administrator roles** to see the **Contributor** role
   - Role: **Contributor**
   - Assign access to: **User, group, or service principal**
   - Select: Search for your app registration name and select it
   - Click **Save**
6. **Create the AZURE_CREDENTIALS JSON:**
   - Format:
     ```json
     {
       "clientId": "YOUR_CLIENT_ID",
       "clientSecret": "YOUR_CLIENT_SECRET",
       "subscriptionId": "YOUR_SUBSCRIPTION_ID",
       "tenantId": "YOUR_TENANT_ID"
     }
     ```
7. **Add the AZURE_CREDENTIALS Secret to GitHub:**
   - Go to your GitHub repo > **Settings** > **Secrets and variables** > **Actions**
   - Click **New repository secret**
   - Name: `AZURE_CREDENTIALS`
   - Value: (paste the JSON from above)
   - Click **Add secret**
8. **Re-run your GitHub Actions workflow**
   - Push a new commit or re-run the failed workflow. The Azure login step should now succeed.

**Note:**
- No CLI or Cloud Shell commands are required for this process. Use only the Azure Portal GUI for a smooth, future-proof setup.

**Reference:** [Azure/login GitHub Action Docs](https://github.com/Azure/login#configure-a-service-principal-with-a-secret)

**Why is the Contributor role required?**
- The Contributor role allows the Entra app registration (Service Principal) to deploy, update, and manage resources in your Azure subscription as part of your GitHub Actions workflow.
- This permission is necessary so that GitHub Actions can:
  - Deploy your web app
  - Update configuration and environment variables
  - Manage related Azure resources (e.g., storage, databases) as needed by your deployment pipeline
- Without this role, the deployment workflow would not have sufficient permissions to perform these actions in your Azure environment.

**Security Note:**
- The Contributor role grants broad permissions to manage resources, but does NOT allow access to secrets in Key Vault or change role assignments themselves.
- Always assign the minimum permissions needed and use a dedicated Service Principal for CI/CD automation.

--- 