import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyList from './components/PropertyList';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PropertyGallery from './components/PropertyGallery';
import { Property } from './types/property';
import { useState } from 'react';

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen">
          <Outlet />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const MainLayout = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <PropertyList 
        onPropertySelect={(property) => {
          setSelectedProperty(property);
          setShowGallery(true);
        }}
      />
      <Contact />
      <Footer />
      {showGallery && selectedProperty && (
        <PropertyGallery
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
          property={selectedProperty}
        />
      )}
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<MainLayout />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;