import Hero from '@/components/sections/Hero';
import EnquiryForm from '@/components/sections/EnquiryForm';
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

      {/* Enquiry Form Section */}
      <EnquiryForm />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you!
          </p>
          <div className="bg-gradient-to-br from-primary to-dark rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Ready to Build Your Dream Home?</h3>
            <p className="text-lg mb-8 opacity-90">Contact us today to schedule a visit or enquire about our projects</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+917386086043" className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-background transition-colors font-semibold">
                📞 +91 73860 86043
              </a>
              <a href="mailto:pavan@uv-infra.com" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
