import { CosmosClient } from '@azure/cosmos';

if (!process.env.COSMOS_ENDPOINT) {
  throw new Error('COSMOS_ENDPOINT is not defined');
}

if (!process.env.COSMOS_KEY) {
  throw new Error('COSMOS_KEY is not defined');
}

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

const database = client.database(process.env.COSMOS_DATABASE || 'user-database');
const container = database.container(process.env.COSMOS_CONTAINER || 'users');

export { client, database, container }; 