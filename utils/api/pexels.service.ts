import { createClient, type PaginationParams } from 'pexels';

let client: ReturnType<typeof createClient> | null = null;

export function initClient(apiKey: string) {
  client = createClient(apiKey);
}

export function searchPhotos(params: PaginationParams & { query: string }) {
  if (!client) {
    throw new Error('Pexels client is not initialized');
  }
  return client.photos.search(params);
}

export function curatedPhotos(params: PaginationParams) {
  if (!client) {
    throw new Error('Pexels client is not initialized');
  }
  return client.photos.curated(params);
}

export function get(id: string) {
  if (!client) {
    throw new Error('Pexels client is not initialized');
  }
  return client.photos.show({ id });
}