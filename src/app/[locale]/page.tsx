import About from "@/components/About"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Stats from "@/components/Stats"
import Testimotional from "@/components/Testimotional"
import Topbar from "@/components/Topbar"
import Works from "@/components/Works"
import {getTranslations} from 'next-intl/server';

export default function Page() {
  return (
    <>
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Topbar />
          <Header />
        </div>
        <main className="pt-28"> {/* Adjust padding-top based on Topbar + Header height */}
          <Hero />
          <Services />
          <Stats />
          <About />
          <Works />
          <Testimotional />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}
