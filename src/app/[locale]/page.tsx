import About from "@/components/About"
import Faq from "@/components/Faq"
import Blog from "@/components/Blog"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Testimonials from "@/components/Testimonials"
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
          {/* <Stats /> */}
          <Works />
          <Testimonials />
          <Faq />
          <Blog />
        </main>
        <Footer />
      </div>
    </>
  )
}
