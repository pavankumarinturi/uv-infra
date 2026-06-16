import Hero from '@/components/sections/Hero';
import GetInTouch from '@/components/sections/GetInTouch';
import Projects from '@/components/sections/Projects';
import FloorPlanViewer from '@/components/sections/FloorPlanViewer';
import Gallery from '@/components/sections/Gallery';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* Floor Plans Section */}
      <FloorPlanViewer />

      {/* Specifications Section */}
      <section id="specifications" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
            Specifications
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Built with premium quality and attention to detail
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Structure', desc: 'RCC M25 Grade' },
              { title: 'Flooring', desc: 'Vitrified Tiles' },
              { title: 'Windows', desc: 'UPVC with MS Grills' },
              { title: 'Doors', desc: 'Wooden & Metal' },
              { title: 'Electrical', desc: 'Quality Wiring' },
              { title: 'Plumbing', desc: 'CPVC Pipes' },
            ].map((spec, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-primary mb-2">{spec.title}</h4>
                <p className="text-gray-700">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Get In Touch Section with Contact Info & Enquiry Form */}
      <GetInTouch />
    </>
  );
}
