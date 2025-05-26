import { ClientConfig } from './types';

export type { ClientConfig };

export const clients: Record<string, ClientConfig> = {
  default: {
    id: 'default',
    name: 'Onyx',
    logoPath: '/logos/default/logo.svg',
    primaryColor: '#262626', // --neutral-800
    secondaryColor: '#f5f3ee', // --background-chatbar
    accentColor: '#e47011', // --agent
  },
  client1: {
    id: 'client1',
    name: 'Client One',
    logoPath: '/logos/client1/logo.svg',
    primaryColor: '#0047AB', // Example: Cobalt Blue
    secondaryColor: '#F5F5F5',
    accentColor: '#FF6B35',
  },
  // Add more clients as needed
};

export const getClientIdFromUrl = (url: string): string => {
  try {
    // Extract from subdomain: client1.yourdomain.com
    const hostname = new URL(url).hostname;
    const subdomain = hostname.split('.')[0];
    if (subdomain && clients[subdomain]) {
      return subdomain;
    }
    
    // Or from path: yourdomain.com/client1/...
    const pathParts = new URL(url).pathname.split('/').filter(Boolean);
    const potentialClientId = pathParts[0];
    if (potentialClientId && clients[potentialClientId]) {
      return potentialClientId;
    }
  } catch (error) {
    console.error('Error parsing URL:', error);
  }
  
  return 'default';
};

export const getClientIdFromEnv = (): string => {
  if (typeof window !== 'undefined') {
    // Check localStorage first
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId && clients[storedClientId]) {
      return storedClientId;
    }
  }
  
  // Then check environment variable
  const envClientId = typeof window !== 'undefined' 
    ? (window as any).ENV?.NEXT_PUBLIC_CLIENT_ID 
    : undefined;
  
  if (envClientId && clients[envClientId]) {
    return envClientId;
  }
  
  return 'default';
};
