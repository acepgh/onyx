"use client";

import React from 'react';
import { useClientTheme } from '@/components/client-theme/ClientThemeProvider';

export function ClientLogo({
  height,
  width,
  className,
  size = "default",
}: {
  height?: number;
  width?: number;
  className?: string;
  size?: "small" | "default" | "large";
}) {
  const { client } = useClientTheme();
  
  const sizeMap = {
    small: { height: 24, width: 22 },
    default: { height: 32, width: 30 },
    large: { height: 48, width: 45 },
  };

  const { height: defaultHeight, width: defaultWidth } = sizeMap[size];
  height = height || defaultHeight;
  width = width || defaultWidth;

  return (
    <div style={{ height, width }} className={`flex-none relative ${className}`}>
      <img
        src={client.logoPath}
        alt={`${client.name} Logo`}
        style={{ objectFit: "contain", height, width }}
      />
    </div>
  );
}

export function ClientLogoType({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  const { client } = useClientTheme();
  
  if (client.logotypePath) {
    return (
      <div className="items-center w-full">
        <img 
          src={client.logotypePath} 
          alt={`${client.name} Logotype`}
          className="h-8 dark:invert"
        />
      </div>
    );
  }
  
  return (
    <div className="items-center w-full">
      <span className="text-xl font-bold dark:text-white">{client.name}</span>
    </div>
  );
}
