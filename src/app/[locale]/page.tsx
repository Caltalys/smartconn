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
        <Topbar />
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Stats />
          <Works />
          <Testimotional />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}
