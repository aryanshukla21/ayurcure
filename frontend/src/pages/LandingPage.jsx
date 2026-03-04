import { Button } from '../components/common/Button';

export const LandingPage = () => {
  return (
    <div className="bg-ayur-green-light min-h-screen">
      <section className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Rooted in <span className="text-ayur-green">Tradition.</span><br />
            Powered by <span className="text-ayur-orange">Technology.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Experience personalized Ayurvedic care through our modern digital platform. 
            Connect with experts and track your holistic journey.
          </p>
          <div className="mt-10 flex gap-4">
            <Button variant="primary">Book Appointment</Button>
            <Button variant="outline">How it Works</Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
            {/* Placeholder for Page 1 Image [cite: 1] */}
            <img src="/hero-ayurveda.jpg" alt="Ayurvedic Treatment" className="w-full h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};