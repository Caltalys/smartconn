import React from "react";

export interface BaseProps {
  params: { locale: string };
}

export interface AsyncBaseProps {
  params: Promise<{ locale: string }>;
}

export type AsyncProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
