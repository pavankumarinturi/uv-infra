export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center py-32 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 font-playfair">
          Welcome to UV Infra
        </h1>
        <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
          Premium residential apartments in Hyderabad. Build your dream home with confidence.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-dark transition-colors">
            Explore Projects
          </button>
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-background transition-colors">
            Schedule a Visit
          </button>
        </div>
      </div>
    </main>
  );
}
