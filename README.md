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
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

- Azure will set the required secrets (`AZURE_WEBAPP_NAME`, `AZURE_WEBAPP_PUBLISH_PROFILE`) automatically if you use the Deployment Center.
- For Next.js, make sure your build output is correctly configured (see Azure docs for SSR/static export options).

### 4. Local Project Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery

# Create Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --eslint

# Install required dependencies
npm install @azure/cosmos @azure/identity next-auth

# If npm reports vulnerabilities, run:
npm audit fix
```

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

#### Azure Cosmos DB Setup

1. Create a new Cosmos DB account:
   ```bash
   # Using Azure CLI
   az cosmosdb create --name your-cosmos-account --resource-group your-resource-group --locations regionName=your-location --default-consistency-level Session
   ```

2. Create a database and container:
   ```bash
   # Create database
   az cosmosdb sql database create --account-name your-cosmos-account --name user-database --resource-group your-resource-group

   # Create users container
   az cosmosdb sql container create --account-name your-cosmos-account --database-name user-database --name users --resource-group your-resource-group --partition-key-path "/email" --throughput 400
   ```

3. Initial data model:
   ```typescript
   // src/lib/db/models/user.ts
   interface User {
     id: string;
     email: string;
     passwordHash: string;
     createdAt: Date;
     lastLogin: Date;
     isActive: boolean;
     settings: {
       theme: 'light' | 'dark';
       notifications: boolean;
       preferences: Record<string, any>;
     };
     roles: string[];
     type: 'user';
   }
   ```

4. Configure security:
   - Enable Azure AD authentication
   - Set up network security rules
   - Configure private endpoints if needed
   - Enable encryption at rest

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
    "@types/next-auth": "^3.13.0",
    "@types/react": "^19.1.6",
    "autoprefixer": "^10.4.21",
    "bcryptjs": "^3.0.2",
    "next": "^15.3.3",
    "next-auth": "^4.24.11",
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
  - `@types/bcryptjs`, `@types/next`, `@types/next-auth`, `@types/react`: TypeScript type definitions for those libraries
  - `autoprefixer`, `postcss`, `tailwindcss`: For Tailwind CSS styling
  - `bcryptjs`: Password hashing for authentication
  - `next`: The Next.js framework
  - `next-auth`: Authentication for Next.js
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
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
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
- **azure/webapps-deploy@v3**: Deploys your app to Azure Web App using the publish profile and app name secrets

**Tip:**
- You must set the secrets `AZURE_CREDENTIALS`, `AZURE_WEBAPP_NAME`, and `AZURE_WEBAPP_PUBLISH_PROFILE` in your GitHub repo settings for this workflow to work.
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

--- 