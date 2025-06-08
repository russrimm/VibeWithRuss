# Product Photo Gallery Web App

A modern web application built with Next.js, TypeScript, Tailwind CSS, and Azure services for displaying product photos.

## Prerequisites

- **Node.js**: LTS version (recommended: v20.x, as v22.x may not be fully supported by Azure yet)
- **Visual Studio Code**: Download from [code.visualstudio.com](https://code.visualstudio.com)
- **Git**: Download from [git-scm.com](https://git-scm.com)
- **GitHub Account**: Sign up at [github.com](https://github.com)
- **Azure Account**: Sign up for a free account at [azure.microsoft.com/free](https://azure.microsoft.com/free)

## Getting Started

### 0. Recommended: Use the Official Next.js + Tailwind Starter

For a reliable setup with Tailwind CSS v4+ and Next.js, start with the official template:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

This ensures correct configuration for Tailwind v4 and Next.js. Copy your code into this project or use it as a reference.

## 1. Development Environment Setup

1. Install Node.js from [nodejs.org](https://nodejs.org).
2. Install Visual Studio Code from [code.visualstudio.com](https://code.visualstudio.com).
3. Install Git from [git-scm.com](https://git-scm.com).

## 2. GitHub Repository Setup & Workflow

### a. Create a New GitHub Repository

1. Go to [github.com](https://github.com).
2. Click the **+** icon (top right) > **New repository**.
3. Name it (e.g., `product-photo-gallery`).
4. Set visibility (Public or Private).
5. (Optional) Add a description.
6. Initialize with a README (optional but recommended).
7. Click **Create repository**.

### b. Clone the Repository Locally

Using Git command line:

```bash
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery
```

Or use GitHub Desktop:
1. Open GitHub Desktop.
2. Go to **File > Clone repository**.
3. Select your repo or paste the URL.
4. Click **Clone**.

### c. Create a New Branch

Using Git command line:

```bash
git checkout -b feature/your-feature-name
```

Or use GitHub Desktop:
1. Click the **Current Branch** dropdown.
2. Click **New Branch**.
3. Name it (e.g., `feature/your-feature-name`).
4. Click **Create Branch**.

### d. Make Changes, Pull, and Push

1. Make code changes in VS Code.
2. Stage and commit changes:
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```
3. Pull the latest changes from the main branch:
   ```bash
   git pull origin main
   ```
4. Resolve any conflicts if prompted.
5. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

Or use GitHub Desktop:
1. View changed files in the left panel.
2. Enter a commit message in the commit pane.
3. Click **Commit to** [branch].
4. Click **Pull origin** to sync with GitHub.
5. Click **Push origin** to upload changes.

### e. Create a Pull Request (PR)

1. In GitHub, navigate to your repository.
2. Click **Pull requests > New pull request**.
3. Select your branch and compare it to `main`.
4. Fill in PR details and click **Create pull request**.
5. Wait for review and merge.

### f. Check GitHub Actions Status

1. Go to the **Actions** tab in your GitHub repository.
2. Click the latest workflow run to check build/deployment status.
3. Fix any errors and push changes if needed.

### What are Commits, Pull Requests, and Merging?

- **Commit**: A snapshot of code changes with a descriptive message. Created using `git commit -m "message"`.
- **Pull Request (PR)**: A request to merge your changes into another branch (e.g., `main`). PRs enable code review and collaboration.
- **Merging**: Integrates changes from one branch into another, typically PR approval.
- **Why use this process?**
  - Ensures code quality through reviews.
  - Prevents conflicts in the main codebase.
  - Tracks changes and enables rollbacks.

## 3. Azure Deployment YAML (Node.js + Next.js)

Azure can generate a GitHub Actions workflow for deploying your app. Below is an updated YAML file using modern actions and caching for faster builds.

Create `.github/workflows/ci-deployment.yml`:

```yaml
name: Build and deploy to Azure Web App

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
          node-version: '20.x' # Use LTS version
          cache: 'npm' # Cache dependencies for faster builds

      - name: Install dependencies and build
        run: |
          npm ci
          npm run build

      - name: Login to Azure
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v4
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          package: .
```

### Setting Secrets

1. In Azure Portal, go to your App Service > **Deployment Center**.
2. Select **GitHub** as the source, authenticate, and choose your repo/branch.
3. Azure will generate `AZURE_WEBAPP_NAME` and `AZURE_CREDENTIALS` secrets in your GitHub repository settings.
4. If manually setting secrets:
   - Go to GitHub repository > **Settings > Secrets and variables > Actions**.
   - Add `AZURE_WEBAPP_NAME` (your App Service name).
   - Add `AZURE_CREDENTIALS` as a JSON string (see section 16).

### Notes

- Use Node.js 20.x for compatibility with Azure App Service.
- For Next.js, configure `next.config.js` for static site generation (SSG) or server-side rendering (SSR) based on your needs. See [Next.js Azure docs](https://nextjs.org/docs/deployment#azure).
- **Security Best Practices**:
  - Use Service Principal authentication (via `AZURE_CREDENTIALS`).
  - Avoid publish profiles in workflows.
  - Never commit secrets to your repository.

## 4. Local Project Setup

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/product-photo-gallery.git
cd product-photo-gallery

# Install dependencies
npm install @azure/cosmos @azure/identity next-auth tailwindcss @tailwindcss/cli postcss autoprefixer react next @types/react @types/node @types/bcryptjs bcryptjs

# Run audit fix for vulnerabilities
npm audit fix
```

### Tailwind CSS Setup (v4+)

1. Install Tailwind CSS:
   ```bash
   npm install tailwindcss @tailwindcss/cli postcss autoprefixer --save-dev
   ```

2. Create `postcss.config.mjs`:
   ```javascript
   export default {
     plugins: {
       '@tailwindcss/cli': {},
       autoprefixer: {},
     },
   };
   ```

3. Create `src/styles/globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. (Optional) Create `tailwind.config.js` if customizations are needed:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       './src/pages/**/*.{js,ts,jsx,tsx}',
       './src/components/**/*.{js,ts,jsx,tsx}',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 5. VS Code Setup

1. Open your project in VS Code.
2. Install recommended extensions:
   - **ESLint**: For TypeScript linting.
   - **Prettier**: For code formatting.
   - **Azure Tools**: For Azure service integration.
   - **Azure Cosmos DB**: For database management.

## 6. Azure Services Setup

1. Create an Azure account at [azure.microsoft.com/free](https://azure.microsoft.com/free).
2. Set up the following services in Azure Portal:
   - **Azure Blob Storage**: For product images.
   - **Azure App Service**: For hosting.
   - **Azure CDN**: For image delivery (optional).
   - **Azure Cosmos DB**: For user data (Core SQL API).
   - **Microsoft Entra ID**: For authentication.

### 6a. Azure Cosmos DB Setup

1. In Azure Portal, go to **Create a resource > Azure Cosmos DB**.
2. Select **Core (SQL)** API.
3. Fill in:
   - Subscription: Your Azure subscription.
   - Resource Group: Create new or use existing.
   - Account Name: Unique name (e.g., `product-gallery-cosmos`).
   - Region: Choose a region close to you.
4. Click **Review + create** > **Create**.
5. After deployment, go to **Data Explorer**:
   - Create a new database: `user-database`.
   - Create a new container: `users`, with partition key `/email` (adjust based on query patterns).
   - Set throughput: 400 RU/s for development.
6. Get credentials:
   - Go to **Keys** > Copy **URI** (`COSMOS_ENDPOINT`) and **PRIMARY KEY** (`COSMOS_KEY`).
7. Add to `.env.local`:
   ```env
   COSMOS_ENDPOINT=your-cosmos-endpoint-url
   COSMOS_KEY=your-cosmos-key
   COSMOS_DATABASE=user-database
   COSMOS_CONTAINER=users
   ```

**Tip**: Add `.env.local` to `.gitignore` to prevent committing secrets.

### 6b. Microsoft Entra ID Setup

1. In Azure Portal, go to **Microsoft Entra ID > App registrations > New registration**.
2. Fill in:
   - Name: `Product Photo Gallery App`.
   - Supported account types: Single-tenant (or multi-tenant as needed).
   - Redirect URI: `http://localhost:3000/api/auth/callback/azure-ad` (for development).
3. Click **Register**.
4. Configure token settings:
   - Go to **Authentication**.
   - Enable **ID tokens** under **Implicit grant and hybrid flows**.
   - (Optional) Enable **Access tokens** if calling APIs from the browser.
5. Create a client secret:
   - Go to **Certificates & secrets > New client secret**.
   - Add a description and expiration, then copy the **Value** (`AZURE_AD_CLIENT_SECRET`).
6. Set API permissions:
   - Go to **API permissions > Add a permission > Microsoft Graph > Delegated permissions**.
   - Add: `openid`, `profile`, `email`, (optional) `offline_access`.
   - Click **Grant admin consent** if required.
7. Get credentials:
   - **AZURE_AD_CLIENT_ID**: From **Overview** (Application ID).
   - **AZURE_AD_TENANT_ID**: From **Overview** (Directory ID).
   - **AZURE_AD_CLIENT_SECRET**: From the secret created.
8. Add to `.env.local`:
   ```env
   AZURE_AD_CLIENT_ID=your-client-id
   AZURE_AD_CLIENT_SECRET=your-client-secret
   AZURE_AD_TENANT_ID=your-tenant-id
   ```
9. For production, update **Redirect URIs** in **Authentication** with your production URL (e.g., `https://yourdomain.com/api/auth/callback/azure-ad`).

### 6c. Azure Blob Storage Setup

1. In Azure Portal, go to **Create a resource > Storage account**.
2. Fill in:
   - Subscription, Resource Group, Name, Region.
   - Performance: Standard.
   - Redundancy: Locally-redundant storage (LRS) for development.
3. Click **Review + create** > **Create**.
4. After deployment, go to **Containers > + Container**.
5. Name it (e.g., `product-images`).
6. Set **Public access level** to `Blob` (for public read) or `Private` (for uploads).
7. Get credentials:
   - Go to **Access keys** > Copy **Connection string** (`AZURE_STORAGE_CONNECTION_STRING`).
   - Container name: `product-images`.
8. Add to `.env.local`:
   ```env
   AZURE_STORAGE_CONNECTION_STRING=your-connection-string
   AZURE_BLOB_CONTAINER=product-images
   ```

## 7. Project Structure

```plaintext
product-photo-gallery/
├── .github/
│   └── workflows/
│       └── ci-deployment.yml
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── users/
│   ├── lib/
│   │   └── db/
│   │       └── models/
│   └── styles/
│       └── globals.css
├── public/
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 8. Environment Variables

Create `.env.local` in the project root:

```env
# Azure Cosmos DB
COSMOS_ENDPOINT=your-cosmos-endpoint
COSMOS_KEY=your-cosmos-key
COSMOS_DATABASE=user-database
COSMOS_CONTAINER=users

# Azure Blob Storage
AZURE_STORAGE_CONNECTION_STRING=your-connection-string
AZURE_BLOB_CONTAINER=product-images

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Microsoft Entra ID
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

**Tip**: Ensure `.env.local` is listed in `.gitignore`.

## 9. Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 10. Database Management

- Use **Azure Portal** or **Azure Data Studio** for Cosmos DB management.
- Implement error handling and connection pooling in your code.
- Monitor RU/s usage in Azure Portal to optimize costs.

## 11. Security

- Use **NextAuth.js** for authentication with Microsoft Entra ID.
- Validate all user inputs.
- Use environment variables for sensitive data.
- Implement proper error handling and logging.

## 12. Deployment

1. Push code to GitHub.
2. In Azure Portal, go to App Service > **Deployment Center**.
3. Connect to your GitHub repository and branch.
4. Configure environment variables in **App Service > Configuration**:
   - Add all `.env.local` variables as application settings.
   - Check **Deployment slot setting** for secrets (e.g., `COSMOS_KEY`, `NEXTAUTH_SECRET`).
5. Deploy via GitHub Actions.
6. Set up a custom domain and SSL in **App Service > Custom domains**.
7. Enable monitoring in **App Service > Monitoring**.

## 13. Example package.json

```json
{
  "name": "product-photo-gallery",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@azure/cosmos": "^4.1.1",
    "@azure/identity": "^4.4.1",
    "next": "^15.3.3",
    "next-auth": "^4.24.7",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "bcryptjs": "^3.0.2",
    "tailwindcss": "^4.1.8",
    "@tailwindcss/cli": "^4.1.8",
    "postcss": "^8.5.4",
    "autoprefixer": "^10.4.21"
  },
  "devDependencies": {
    "@types/node": "^22.7.5",
    "@types/react": "^19.1.6",
    "@types/react-dom": "^19.1.6",
    "@types/bcryptjs": "^2.4.6",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.3.3",
    "typescript": "^5.6.2"
  }
}
```

## 14. Product Type Definition

In `src/lib/db/models/product.ts`:

```typescript
export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'product';
}
```

**Note**: Update this interface if you add new fields to ensure type safety.

## 15. Troubleshooting

### Styling or Build Issues

If Tailwind CSS or build processes fail:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Common Errors

- **Cannot find module '@azure/cosmos'**: Run `npm install @azure/cosmos`.
- **NextAuth.js errors**: Ensure `NEXTAUTH_SECRET` and Entra ID credentials are correct.
- **Azure login error in GitHub Actions**: Verify `AZURE_CREDENTIALS` JSON format (see section 16).
- **Styles not applying**: Check `src/styles/globals.css` exists and is imported in `pages/_app.tsx`.

For specific errors, search [Stack Overflow](https://stackoverflow.com) or [GitHub Issues](https://github.com) and provide the URL to your AI assistant for tailored fixes.

## 16. Fixing Azure Login Error in GitHub Actions

If you see:

```
Error: Login failed with Error: Using auth-type: SERVICE_PRINCIPAL. Not all values are present.
```

### Fix: Set AZURE_CREDENTIALS

1. In Azure Portal, go to **Microsoft Entra ID > App registrations > New registration**.
2. Name: `github-actions-deploy`.
3. Click **Register**.
4. Create a client secret:
   - Go to **Certificates & secrets > New client secret**.
   - Copy the **Value** (`clientSecret`).
5. Get values:
   - **clientId**: From **Overview** (Application ID).
   - **tenantId**: From **Overview** (Directory ID).
   - **subscriptionId**: From **Subscriptions** in Azure Portal.
6. Assign the Contributor role:
   - Go to **Subscriptions > Your subscription > Access control (IAM)**.
   - Click **Add role assignment > Contributor**.
   - Select your app registration and save.
7. Create `AZURE_CREDENTIALS` JSON:
   ```json
   {
     "clientId": "YOUR_CLIENT_ID",
     "clientSecret": "YOUR_CLIENT_SECRET",
     "subscriptionId": "YOUR_SUBSCRIPTION_ID",
     "tenantId": "YOUR_TENANT_ID"
   }
   ```
8. Add to GitHub:
   - Go to GitHub repository > **Settings > Secrets and variables > Actions**.
   - Add secret: Name: `AZURE_CREDENTIALS`, Value: (paste JSON).
9. Re-run the workflow.

## 17. Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

## 18. License

This project is licensed under the MIT License. See the `LICENSE` file for details.