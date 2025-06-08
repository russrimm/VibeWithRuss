import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with Cosmos DB user lookup
        if (credentials?.email === 'demo@example.com' && credentials.password === 'password') {
          return { id: '1', email: 'demo@example.com' };
        }
        return null;
      },
    }),
    // To enable Azure AD, uncomment and configure:
    // AzureADProvider({
    //   clientId: process.env.AZURE_AD_CLIENT_ID!,
    //   clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    //   tenantId: process.env.AZURE_AD_TENANT_ID!,
    // }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}); 