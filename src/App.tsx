import { useState } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyList from './components/PropertyList';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AgentPortal from './pages/agent/AgentPortal';
import ViewingRequestForm from './components/ViewingRequestForm';

const queryClient = new QueryClient();

// Root Layout Component
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

// Main Layout Component
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <PropertyList />
      <AgentPortal />
      <Contact />
      <Footer />
    </div>
  );
};

// Router Configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<MainLayout />} />
      <Route path="/agentportal" element={<AgentPortal />} />
      <Route 
        path="/agent/viewing-request-form" 
        element={<Navigate to="/" replace />} // Redirect to home since this form should only be opened via modal
      />
    </Route>
  )
);

// App Component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;