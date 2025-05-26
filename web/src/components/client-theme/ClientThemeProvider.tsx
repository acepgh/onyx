"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { clients, getClientIdFromEnv } from '@/lib/client-config/clients';
import { ClientConfig } from '@/lib/client-config/types';

interface ClientThemeContextType {
  client: ClientConfig;
  setClient: (clientId: string) => void;
}

const ClientThemeContext = createContext<ClientThemeContextType | null>(null);

export const useClientTheme = () => {
  const context = useContext(ClientThemeContext);
  if (!context) {
    throw new Error('useClientTheme must be used within a ClientThemeProvider');
  }
  return context;
};

export const ClientThemeProvider: React.FC<{
  children: React.ReactNode;
  initialClientId?: string;
}> = ({ children, initialClientId }: { children: React.ReactNode; initialClientId?: string }) => {
  const [clientId, setClientId] = useState(initialClientId || getClientIdFromEnv());
  const client = clients[clientId] || clients.default;

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', client.primaryColor);
    root.style.setProperty('--secondary-color', client.secondaryColor);
    root.style.setProperty('--accent-color', client.accentColor);
    
    root.style.setProperty('--primary', client.primaryColor);
    root.style.setProperty('--foreground', client.primaryColor);
    
    root.style.setProperty('--background-chatbar', client.secondaryColor);
    root.style.setProperty('--background-sidebar', client.secondaryColor);
    
    root.style.setProperty('--agent', client.accentColor);
    root.style.setProperty('--agent-sidebar', client.accentColor);
    root.style.setProperty('--agent-hovered', client.accentColor);
    root.style.setProperty('--link', client.accentColor);
    
    document.title = client.name;
  }, [client]);

  const setClient = (newClientId: string) => {
    if (clients[newClientId]) {
      setClientId(newClientId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('clientId', newClientId);
      }
    }
  };

  return (
    <ClientThemeContext.Provider value={{ client, setClient }}>
      {children}
    </ClientThemeContext.Provider>
  );
};
