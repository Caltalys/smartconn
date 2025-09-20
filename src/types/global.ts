export interface BaseProps {
  params: { locale: string };
}

export interface AsyncBaseProps {
  params: Promise<{ locale: string }>;
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};