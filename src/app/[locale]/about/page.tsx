import AboutPageContent from '@/components/AboutPageContent';
import { getAboutPage } from '@/lib/api';
import { AsyncBaseProps } from '@/lib/types';
import { notFound } from 'next/navigation';


export default async function AboutUsPage({ params }: AsyncBaseProps) {
  const { locale } = await params;
  const data = await getAboutPage(locale);

  if (!data) {
    notFound();
  }

  return <AboutPageContent data={data} />;
}