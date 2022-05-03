import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '3mwh3zg4',
  dataset: 'product',
  useCdn: true,
  apiVersion: '2022-02-01',
  token: process.env.SANITY_TOKEN,
});
export default client;