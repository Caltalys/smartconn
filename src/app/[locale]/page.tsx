import About from "@/components/About"
import BackToTopButton from "@/components/BackToTopButton"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Advantages from "@/components/Advantages"
import Partners from "@/components/Partners"
import { getLandingPage } from "@/lib/api"
import { BaseProps } from "@/lib/types"
import Blog from "@/components/Blog"

export default async function Page({ params }: BaseProps) {
  const { locale } = await params;
  const [landingPageResponse] = await Promise.all([
    getLandingPage(locale),
  ]);
  const heroSection = landingPageResponse?.heroSection;
  const aboutSection = landingPageResponse?.aboutSection;
  const servicesSection = landingPageResponse?.servicesSection;
  const advantagesSection = landingPageResponse?.advantagesSection;
  const partnerSection = landingPageResponse?.partnerSection;
  const headerSection = landingPageResponse?.headerSection;

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
          <Blog />
          {/* <Gallery /> */}
        </main>
        {/* <Footer /> */}
        <BackToTopButton />
      </div>
    </>
  )
}
