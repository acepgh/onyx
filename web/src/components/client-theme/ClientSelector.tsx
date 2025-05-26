"use client";

import React from 'react';
import { useClientTheme } from "./ClientThemeProvider";
import { clients } from "../../lib/client-config/clients";

export function ClientSelector() {
  const { client, setClient } = useClientTheme();
  
  return (
    <div className="p-4 border border-border rounded-md">
      <h3 className="text-lg font-medium mb-2">Select Client Theme</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(clients).map((clientOption) => (
          <button
            key={clientOption.id}
            onClick={() => setClient(clientOption.id)}
            className={`p-2 rounded-md flex items-center gap-2 ${
              client.id === clientOption.id
                ? "bg-accent-background border-2 border-accent-color"
                : "bg-background-chatbar hover:bg-background-chat-hover"
            }`}
          >
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: clientOption.primaryColor }}></div>
            <span>{clientOption.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
