
import { FooterSection } from "@/lib/types";
import Contact from "./Contact";
import Social from "./Social";

const Topbar = ({ data }: { data?: FooterSection }) => {
  return (
    <section className="py-1 bg-gradient-to-t from-secondary to-secondary/60 backdrop-blur-sm text-primary text-sm">
      <div className="container mx-auto px-6">
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          {/* phone, email */}
          <Contact data={data} />
          {/* social media links */}
          <Social data={data} />
        </div>
      </div>
    </section>
  );
};

export default Topbar;