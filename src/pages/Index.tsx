import { motion } from 'framer-motion';
import { PropertiesGrid } from '@/components/PropertiesGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-property-cream">
      <header className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury Property"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              Premium Properties
            </span>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Discover Luxury Living
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Explore our handpicked selection of premium properties in the most desired locations
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-property-gold/10 px-4 py-2 text-sm font-medium text-property-gold">
            Featured Properties
          </span>
          <h2 className="text-3xl font-bold text-property-stone md:text-4xl">
            Exceptional Homes
          </h2>
        </div>

        <PropertiesGrid />
      </main>
    </div>
  );
};

export default Index;