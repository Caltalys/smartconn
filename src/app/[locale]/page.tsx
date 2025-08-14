import About from "@/components/About"
import BackToTopButton from "@/components/BackToTopButton"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Advantages from "@/components/Advantages"
import Partners from "@/components/Partners"
import { getAllArticles, getLandingPage } from "@/lib/api"
import { Article, BaseProps } from "@/lib/types"
import Blog from "@/components/Blog"

export default async function Page({ params }: BaseProps) {
  const { locale } = await params;
  const [landingPageResponse, articlesResponse] = await Promise.all([
    getLandingPage(locale),
    getAllArticles(locale, { pageSize: 3 }),
  ]);
  const heroSection = landingPageResponse?.heroSection;
  const aboutSection = landingPageResponse?.aboutSection;
  const servicesSection = landingPageResponse?.servicesSection;
  const advantagesSection = landingPageResponse?.advantagesSection;
  const partnerSection = landingPageResponse?.partnerSection;
  const articles = articlesResponse?.data;

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
          <Blog articles={articles} />
          {/* <Gallery /> */}
        </main>
        {/* <Footer /> */}
        <BackToTopButton />
      </div>
    </>
  )
}
