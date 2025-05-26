"use client";

import { ClientAppProvider } from "@/components/context/ClientAppProvider";
import { useSearchParams } from "next/navigation";

export default function ClientLayoutWrapper({
  children,
  combinedSettings,
  assistantsData,
  user,
  authTypeMetadata,
}: {
  children: React.ReactNode;
  combinedSettings: any;
  assistantsData: any;
  user: any;
  authTypeMetadata: any;
}) {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId");
  
  const { assistants, hasAnyConnectors, hasImageCompatibleModel } = assistantsData;

  return (
    <ClientAppProvider
      authTypeMetadata={authTypeMetadata}
      user={user}
      settings={combinedSettings}
      assistants={assistants}
      hasAnyConnectors={hasAnyConnectors}
      hasImageCompatibleModel={hasImageCompatibleModel}
      clientId={clientId || undefined}
    >
      {children}
    </ClientAppProvider>
  );
}
