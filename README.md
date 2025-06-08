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
│   ├── styles/
│   ├── utils/
│   ├── lib/
│   │   ├── db/
│   │   │   ├── cosmos.ts
│   │   │   ├── models/
│   │   │   │   └── user.ts
│   │   │   └── repositories/
│   │   │       └── userRepo.ts
│   │   └── auth/
│   │       └── [...nextauth].ts
│   └── models/
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