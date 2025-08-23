import About from "@/components/About"
import BackToTopButton from "@/components/elements/BackToTopButton"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Advantages from "@/components/Advantages"
import Partners from "@/components/Partners"
import { getAllArticles, getLandingPage } from "@/lib/api"
import { AsyncBaseProps } from "@/lib/types"
import Blog from "@/components/Blog"
import BlockRenderer from "@/components/blog/BlockRenderer"

export default async function Page({ params }: AsyncBaseProps) {
  const { locale } = await params;
  const [landingPageResponse, articlesResponse] = await Promise.all([
    getLandingPage(locale),
    getAllArticles(locale, { pageSize: 4 }),
  ]);
  const heroSection = landingPageResponse?.heroSection;
  const aboutSection = landingPageResponse?.aboutSection;
  const servicesSection = landingPageResponse?.servicesSection;
  const advantagesSection = landingPageResponse?.advantagesSection;
  const partnerSection = landingPageResponse?.partnerSection;
  const articles = articlesResponse?.data;
  const blocks = landingPageResponse?.blocks;

  return (
    <>
      <div className="relative">
        {/* <Header data={headerSection}/> */}
        <main>
          <Hero data={heroSection}/>
          <About data={aboutSection}/>
          <Services data={servicesSection}/>
          <Advantages data={advantagesSection} />
          <Partners data={partnerSection} />
          {/* <Stats /> */}
          {/* <Works /> */}
          {/* <Testimonials /> */}
          {/* <Faq /> */}
          {blocks && blocks.length > 0 && <div className="container mx-auto px-6"><BlockRenderer blocks={blocks} /></div>}
          <Blog articles={articles} />
          {/* <Gallery /> */}
        </main>
        {/* <Footer /> */}
        <BackToTopButton />
      </div>
    </>
  )
}
