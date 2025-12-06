# Vibe Coding Shell App

A web application built with Next.js, TypeScript, Tailwind CSS, and Azure services for getting startd with agentic development.

> **New to development?** It is strongly recommended to read the [Glossary](#glossary) at the end of this document first! It explains common terms you'll encounter throughout this guide in simple, beginner-friendly language.

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

1. Open GitHub Desktop.
2. Go to **File > Clone repository**.
3. Select your repo or paste the URL.
4. Click **Clone**.

### c. Create a New Branch

In GitHub Desktop:
1. Click the **Current Branch** dropdown.
2. Click **New Branch**.
3. Name it (e.g., `feature/your-feature-name`).
4. Click **Create Branch**.

### d. Make Changes, Pull, and Push

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
git clone https://github.com/YOUR_USERNAME/repositoryname.git
cd repositoryname

# Install dependencies
npm install @azure/identity next-auth tailwindcss @tailwindcss/cli postcss autoprefixer react next @types/react @types/node @types/bcryptjs bcryptjs

# Run audit fix for vulnerabilities
npm audit fix

# Start the development server
npm run dev
```

**Note**: Configuration files like `postcss.config.mjs`, `tailwind.config.js`, and `globals.css` are typically generated automatically by the installation process or AI agents. If customization is needed, consult the official documentation or ask your AI assistant.

## 5. VS Code Setup

1. Open your project in VS Code.
2. Install recommended extensions:
   - **ESLint**: For TypeScript linting.
   - **Prettier**: For code formatting.
   - **Azure Tools**: For Azure service integration.

## 6. Azure Services Setup

1. Create an Azure account at [azure.microsoft.com/free](https://azure.microsoft.com/free).
2. Set up the following services in Azure Portal:
   - **Azure App Service**: For hosting.
   - **Microsoft Entra ID**: For authentication.

### 6a. Microsoft Entra ID Setup

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
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Microsoft Entra ID
AZURE_AD_CLIENT_ID=your-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret
AZURE_AD_TENANT_ID=your-tenant-id
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

## 10. Security

- Use **NextAuth.js** for authentication with Microsoft Entra ID.
- Validate all user inputs.
- Use environment variables for sensitive data.
- Implement proper error handling and logging.

## 11. Deployment

1. Push code to GitHub.
2. In Azure Portal, go to App Service > **Deployment Center**.
3. Connect to your GitHub repository and branch.
4. Configure environment variables in **App Service > Configuration**:
   - Add all `.env.local` variables as application settings.
   - Check **Deployment slot setting** for secrets (e.g., `NEXTAUTH_SECRET`).
5. Deploy via GitHub Actions.
6. Set up a custom domain and SSL in **App Service > Custom domains**.
7. Enable monitoring in **App Service > Monitoring**.

## 12. Example package.json

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

## 13. Product Type Definition

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

## 14. Troubleshooting

### Styling or Build Issues

If Tailwind CSS or build processes fail:
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Common Errors

- **NextAuth.js errors**: Ensure `NEXTAUTH_SECRET` and Entra ID credentials are correct.
- **Azure login error in GitHub Actions**: Verify `AZURE_CREDENTIALS` JSON format (see section 16).
- **Styles not applying**: Check `src/styles/globals.css` exists and is imported in `pages/_app.tsx`.

For specific errors, search [Stack Overflow](https://stackoverflow.com) or [GitHub Issues](https://github.com) and provide the URL to your AI assistant for tailored fixes.

## 15. Fixing Azure Login Error in GitHub Actions

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

## 16. Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

## 17. License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Glossary

New to coding? Don't worry! Here are the most common terms you'll see in this guide, explained in plain English:

### **Node.js**
A program that lets you run JavaScript code on your computer (not just in web browsers). Think of it as the engine that powers your app.

### **npm (Node Package Manager)**
A tool that helps you install and manage code libraries (called "packages") that other developers have created. Instead of writing everything from scratch, you can use npm to download pre-built solutions.

**Common npm commands:**
- `npm install` - Downloads and installs all the packages your project needs
- `npm run dev` - Starts your app in development mode so you can test it locally
- `npm run build` - Prepares your app for deployment (makes it ready for the internet)
- `npm audit fix` - Fixes security issues in your packages

### **npx**
A tool that comes with npm. It runs commands from packages without installing them permanently. Great for one-time tasks like creating a new project.

**Example:** `npx create-next-app` creates a new Next.js project without cluttering your computer.

### **Next.js**
A framework (set of tools) built on top of React that makes it easier to build fast, modern websites. It handles routing, server-side rendering, and other complex stuff for you.

### **Vite**
A fast build tool that helps develop modern web applications. It's an alternative to other build tools and is known for being super speedy during development.

### **React**
A JavaScript library for building user interfaces (the parts of websites you see and click). It lets you create reusable components like buttons, forms, and cards.

### **TypeScript**
JavaScript with extra features that help catch mistakes before you run your code. It adds "types" so you can specify what kind of data (text, numbers, etc.) your code should work with.

### **Tailwind CSS**
A tool for styling your website using pre-built CSS classes. Instead of writing custom CSS, you add class names like `bg-blue-500` or `text-center` directly to your HTML.

### **CSS (Cascading Style Sheets)**
The language used to make websites look good - colors, fonts, layouts, spacing, etc. If HTML is the skeleton, CSS is the clothes and makeup.

### **Lint / Linter**
A tool that checks your code for errors, bad practices, and style issues - like a spell-checker for code. **(Note: It's NOT the fuzzy stuff you find in your pocket! That's a different kind of lint.** 😄**)**

**Example:** ESLint checks JavaScript/TypeScript code.

### **Repository (Repo)**
A folder that contains all your project files and tracks changes over time. Think of it as a special folder with a time machine built in.

### **GitHub**
A website where developers store and share their code repositories. It's like Google Drive, but specifically designed for code with powerful collaboration features.

### **Git**
The underlying version control system that tracks changes to your files. GitHub uses Git behind the scenes.

### **Commit**
Saving a snapshot of your changes with a descriptive message. Like saving your game progress with a note about what you accomplished.

**Example:** `git commit -m "Added login button"`

### **Check-in**
Another term for commit - saving your changes to the repository.

### **Branch**
A separate version of your code where you can make changes without affecting the main version. Imagine creating a copy of your project to experiment in - if it works, you can merge it back; if not, just delete the branch.

**Example branches:** `main` (the primary version), `feature/login-page` (working on a login feature)

### **Push**
Uploading your local commits (saved changes) to GitHub so others can see them and so they're backed up online.

**Command:** `git push`

### **Pull**
Downloading changes from GitHub to your local computer. This keeps your local copy up-to-date with what's online.

**Command:** `git pull`

### **Staging (Git Stage)**
Selecting which changes you want to include in your next commit. It's like putting items in a shopping cart before checking out - you can review what you're about to commit and add or remove files as needed.

**Command:** `git add filename.txt` (stage one file) or `git add .` (stage all changes)

### **Stash (Git Stash)**
Temporarily saving your uncommitted changes without committing them, so you can work on something else and come back later. Think of it as putting your work-in-progress in a drawer so you can use the desk for something urgent.

**Common commands:**
- `git stash` - Save current changes temporarily
- `git stash pop` - Restore the most recent stashed changes
- `git stash list` - See all stashed changes

**Use case:** You're working on a feature but need to quickly fix a bug on another branch. Stash your current work, switch branches, fix the bug, then come back and pop your stash to continue where you left off.

### **Pull Request (PR)**
A request to merge your branch's changes into the main branch. It's a way to say, "Hey team, I made these changes - can you review them before we add them to the main version?"

### **Clone**
Making a copy of a repository from GitHub to your computer so you can work on it locally.

**Command:** `git clone https://github.com/username/repo.git`

### **API (Application Programming Interface)**
A way for different pieces of software to talk to each other. Think of it as a menu at a restaurant - it lists what you can order (request) and what you'll get back (response).

### **Environment Variables (.env)**
Secret settings for your app (like passwords, API keys) that you don't want to share publicly. They're stored in a `.env.local` file that stays on your computer and never gets uploaded to GitHub.

### **Localhost**
Your own computer acting as a web server. When you run `npm run dev`, your app runs at `http://localhost:3000` - only you can see it.

### **Deployment**
Putting your app on the internet so other people can use it. Like moving from your private workshop to a public store.

### **Build**
Preparing your code for deployment by optimizing it, compiling TypeScript to JavaScript, and bundling everything together.

**Command:** `npm run build`

### **Package.json**
A file that describes your project - its name, version, dependencies (packages it needs), and commands you can run.

### **Dependencies**
Other people's code (packages/libraries) that your project needs to work. Listed in `package.json` and installed with `npm install`.

### **Azure**
Microsoft's cloud computing platform. It provides services for hosting websites, storing data, and much more without you needing to manage physical servers.

### **Cosmos DB**
A database service from Azure that stores your app's data (users, products, etc.) in the cloud.

### **VS Code (Visual Studio Code)**
A free, powerful code editor from Microsoft. It's like Microsoft Word, but designed specifically for writing code.

### **Terminal / Command Line / Shell**
A text-based interface where you type commands to control your computer. Instead of clicking buttons, you type instructions like `npm install` or `git push`.

---

**Still confused about something?** That's totally normal! Coding has a steep learning curve, but every expert was once a beginner. Feel free to search for terms online, watch tutorial videos, or ask AI assistants like GitHub Copilot for help. You've got this! 🚀