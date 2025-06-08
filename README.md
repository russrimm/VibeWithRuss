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

### 2. GitHub Setup

1. Create a GitHub account at [github.com/signup](https://github.com/signup)
2. Create a new repository:
   - Click "New repository"
   - Name it "product-photo-gallery"
   - Make it Public
   - Initialize with README
   - Click "Create repository"

### 3. Local Project Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery

# Create Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --eslint

# Install required dependencies
npm install @azure/cosmos @azure/identity next-auth
```

### 4. VS Code Setup

1. Open VS Code
2. Install the following extensions:
   - Cursor AI
   - ESLint
   - Prettier
   - Azure Tools
   - Azure Cosmos DB

### 5. Using Cursor AI Agent

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

### 6. Azure Services Setup

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

### 7. Cursor Rules

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

### 8. Project Structure

```
product-photo-gallery/
├── .cursor/
│   └── rules/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── users/
│   │   │   
│   │   │   
│   │   │   
│   │   └── models/
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

### 9. GitHub Token Setup for Azure Web App

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

--- 