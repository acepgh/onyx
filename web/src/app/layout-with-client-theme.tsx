"use client";

import React from 'react';
import { ClientThemeProvider } from '@/components/client-theme/ClientThemeProvider';
import { useSearchParams } from 'next/navigation';

export default function LayoutWithClientTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const clientId = searchParams?.get('clientId');
  
  return (
    <ClientThemeProvider initialClientId={clientId || undefined}>
      {children}
    </ClientThemeProvider>
  );
}
