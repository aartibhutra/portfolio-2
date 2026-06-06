import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Achievements from '@/components/Achievements';
import Experience from '@/components/Experience';
import Blogs from '@/components/Blogs';

import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Achievements />
      <About />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}
