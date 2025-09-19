export interface BaseProps {
  params: { locale: string };
}

export interface AsyncBaseProps {
  params: Promise<{ locale: string }>;
}
