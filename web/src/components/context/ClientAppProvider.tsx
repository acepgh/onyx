"use client";
import { CombinedSettings } from "@/app/admin/settings/interfaces";
import { UserProvider } from "../user/UserProvider";
import { ProviderContextProvider } from "../chat/ProviderContext";
import { SettingsProvider } from "../settings/SettingsProvider";
import { AssistantsProvider } from "./AssistantsContext";
import { Persona } from "@/app/admin/assistants/interfaces";
import { User } from "@/lib/types";
import { ModalProvider } from "./ModalContext";
import { AuthTypeMetadata } from "@/lib/userSS";
import { ClientThemeProvider } from "../client-theme/ClientThemeProvider";

interface ClientAppProviderProps {
  children: React.ReactNode;
  user: User | null;
  settings: CombinedSettings;
  assistants: Persona[];
  hasAnyConnectors: boolean;
  hasImageCompatibleModel: boolean;
  authTypeMetadata: AuthTypeMetadata;
  clientId?: string;
}

export const ClientAppProvider = ({
  children,
  user,
  settings,
  assistants,
  hasAnyConnectors,
  hasImageCompatibleModel,
  authTypeMetadata,
  clientId,
}: ClientAppProviderProps) => {
  return (
    <ClientThemeProvider initialClientId={clientId}>
      <SettingsProvider settings={settings}>
        <UserProvider
          settings={settings}
          user={user}
          authTypeMetadata={authTypeMetadata}
        >
          <ProviderContextProvider>
            <AssistantsProvider
              initialAssistants={assistants}
              hasAnyConnectors={hasAnyConnectors}
              hasImageCompatibleModel={hasImageCompatibleModel}
            >
              <ModalProvider user={user}>{children}</ModalProvider>
            </AssistantsProvider>
          </ProviderContextProvider>
        </UserProvider>
      </SettingsProvider>
    </ClientThemeProvider>
  );
};
