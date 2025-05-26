"use client";

import React from 'react';
import { ClientSelector } from '@/components/client-theme/ClientSelector';

export default function ClientDemoPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Client White-Labeling Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Client Selection</h2>
        <ClientSelector />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-md">
          <h3 className="text-lg font-medium mb-4">Primary Color Elements</h3>
          <div className="space-y-4">
            <div className="p-4 bg-primary text-white rounded-md">Primary Background</div>
            <div className="p-4 border border-primary rounded-md">Primary Border</div>
            <div className="text-primary">Primary Text Color</div>
          </div>
        </div>
        
        <div className="p-6 border border-border rounded-md">
          <h3 className="text-lg font-medium mb-4">Secondary Color Elements</h3>
          <div className="space-y-4">
            <div className="p-4 bg-background-chatbar rounded-md">Secondary Background</div>
            <div className="p-4 border border-background-sidebar rounded-md">Secondary Border</div>
          </div>
        </div>
        
        <div className="p-6 border border-border rounded-md">
          <h3 className="text-lg font-medium mb-4">Accent Color Elements</h3>
          <div className="space-y-4">
            <div className="p-4 bg-agent text-white rounded-md">Accent Background</div>
            <button className="px-4 py-2 bg-agent text-white rounded-md hover:bg-agent-hovered">
              Accent Button
            </button>
            <div className="text-agent">Accent Text Color</div>
          </div>
        </div>
      </div>
    </div>
  );
}
