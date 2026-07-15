export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UV Infra',
    url: 'https://uv-infra.com',
    logo: 'https://uv-infra.com/logo.png',
    description: 'Premium residential properties in Hyderabad',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-73860-86043',
      email: 'pavan@uv-infra.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Telangana',
      addressLocality: 'Hyderabad',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'UV Infra',
    image: 'https://uv-infra.com/og-image.jpg',
    description: 'Premium residential properties',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hyderabad',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'IN',
    },
    telephone: '+91-73860-86043',
    email: 'pavan@uv-infra.com',
    priceRange: '₹45L - ₹1.5Cr',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the available floor plans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UV Infra offers 2BHK and 3BHK premium apartments with modern amenities and thoughtful designs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the price range?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our properties range from ₹56 Lakhs for 2BHK apartments to ₹85 Lakhs for 3BHK luxury apartments.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I schedule a site visit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can fill out the enquiry form on our website or call us at +91 73860 86043 to schedule a visit.',
        },
      },
    ],
  };

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
