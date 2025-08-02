
import Contact from "./Contact";
import Social from "./Social";

const Topbar = () => {
  return (
    <section id="home" className="py-1 bg-gradient-to-t from-secondary to-secondary/60 backdrop-blur-sm text-primary text-sm">
      <div className="container mx-auto px-6">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          {/* phone, email */}
          <Contact />
          {/* social media links */}
          <Social />
        </div>
      </div>
    </section>
  );
};

export default Topbar;