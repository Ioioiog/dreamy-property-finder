import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AgentPortal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Portal Agent</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Cereri Vizionare</h2>
          <p className="mb-4 text-gray-600">
            Gestionați cererile de vizionare pentru proprietățile listate
          </p>
          <Link to="/agent/viewing-request-form">
            <Button className="w-full">Vezi Cereri</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentPortal;