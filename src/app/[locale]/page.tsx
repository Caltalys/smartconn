import About from "@/components/About"
import BackToTopButton from "@/components/BackToTopButton"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Topbar from "@/components/Topbar"
import WhyChooseUs from "@/components/WhyChooseUs"
import { getLandingPage } from "@/lib/api"
import { BaseProps } from "@/lib/types"

export default async function Page({ params: { locale } }: BaseProps) {

  const [landingPageResponse] = await Promise.all([
    getLandingPage(locale),
  ]);

    const landingPage = landingPageResponse;
    const heroSection = landingPage?.heroSection;


  return (
    <>
      <div className="relative">
        <Topbar />
        {/* <Header /> */}
        <main>
          <Hero data={heroSection}/>
          <About />
          <Services />
          <WhyChooseUs />
          {/* <Stats /> */}
          {/* <Works /> */}
          {/* <Testimonials /> */}
          {/* <Faq /> */}
          {/* <Blog /> */}
          {/* <Gallery /> */}
        </main>
        {/* <Footer /> */}
        <BackToTopButton />
      </div>
    </>
  )
}
