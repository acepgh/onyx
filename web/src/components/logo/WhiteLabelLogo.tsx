"use client";

import { useContext } from "react";
import { SettingsContext } from "../settings/SettingsProvider";
import { OnyxIcon, OnyxLogoTypeIcon } from "../icons/icons";
import { ClientLogo, ClientLogoType } from "./ClientLogo";

export function WhiteLabelLogo({
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
  const settings = useContext(SettingsContext);
  
  if (
    settings &&
    settings.enterpriseSettings &&
    settings.enterpriseSettings.use_custom_logo
  ) {
    return (
      <div style={{ height, width }} className={`flex-none relative ${className}`}>
        <img
          src="/api/enterprise-settings/logo"
          alt="Logo"
          style={{ objectFit: "contain", height, width }}
        />
      </div>
    );
  }
  
  try {
    return <ClientLogo height={height} width={width} className={className} size={size} />;
  } catch (error) {
    const sizeMap = {
      small: { height: 24, width: 22 },
      default: { height: 32, width: 30 },
      large: { height: 48, width: 45 },
    };

    const { height: defaultHeight, width: defaultWidth } = sizeMap[size];
    height = height || defaultHeight;
    width = width || defaultWidth;

    return (
      <div style={{ height, width }} className={className}>
        <OnyxIcon
          size={height}
          className={`${className} dark:text-[#fff] text-[#000]`}
        />
      </div>
    );
  }
}

export function WhiteLabelLogoType({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) {
  const settings = useContext(SettingsContext);
  
  if (
    settings &&
    settings.enterpriseSettings &&
    settings.enterpriseSettings.use_custom_logotype
  ) {
    return (
      <div className="items-center w-full">
        <img
          src="/api/enterprise-settings/logotype"
          alt="Logotype"
          className="h-8"
        />
      </div>
    );
  }
  
  try {
    return <ClientLogoType size={size} />;
  } catch (error) {
    return (
      <OnyxLogoTypeIcon
        size={115}
        className={`items-center w-full dark:text-[#fff]`}
      />
    );
  }
}
