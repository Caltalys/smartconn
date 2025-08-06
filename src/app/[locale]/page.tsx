import About from "@/components/About"
import BackToTopButton from "@/components/BackToTopButton"
import Blog from "@/components/Blog"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Topbar from "@/components/Topbar"
import Gallery from "@/components/Gallery"
import WhyChooseUs from "@/components/WhyChooseUs"

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
          <WhyChooseUs />
          {/* <Stats /> */}
          {/* <Works /> */}
          {/* <Testimonials /> */}
          {/* <Faq /> */}
          <Blog />
          <Gallery />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </>
  )
}
