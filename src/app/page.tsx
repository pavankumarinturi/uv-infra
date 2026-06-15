import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
            Our Projects
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover our flagship residential projects across Hyderabad
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder Project Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-r from-primary to-dark rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold text-dark mb-2 font-playfair">Project {i}</h3>
                <p className="text-gray-600 text-sm mb-4">Premium residential property with modern amenities</p>
                <div className="text-sm text-primary font-semibold">Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floor-plans" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
            Floor Plans
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Thoughtfully designed layouts for modern living
          </p>
          <div className="bg-white rounded-2xl p-8 border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-dark mb-4 font-playfair">2 BHK Floor Plan</h3>
                <div className="space-y-3">
                  <p className="text-gray-700"><span className="font-semibold text-primary">Area:</span> 1,150 sq.ft.</p>
                  <p className="text-gray-700"><span className="font-semibold text-primary">Facing:</span> East & West</p>
                  <p className="text-gray-700"><span className="font-semibold text-primary">Bedrooms:</span> 2</p>
                  <p className="text-gray-700"><span className="font-semibold text-primary">Bathrooms:</span> 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <section id="gallery" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-playfair text-center">
            Gallery
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our residential projects and amenities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gradient-to-br from-blue-300 to-primary rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🏘️</div>
                  <p className="font-semibold">Project View {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
