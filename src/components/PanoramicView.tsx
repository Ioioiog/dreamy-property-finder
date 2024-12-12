import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { propertyData } from '@/data/properties';

export default function PanoramicView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData.find(p => p.id === id);

  if (!property || !property.panoramicUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Imagine panoramică indisponibilă</h1>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2" />
            Înapoi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white shadow-sm p-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2" />
          Înapoi
        </Button>
        <h1 className="text-2xl font-bold">{property.title} - Vedere Panoramică</h1>
      </div>
      <div className="flex-1 bg-gray-100">
        <iframe
          src={property.panoramicUrl}
          className="w-full h-full border-0"
          allowFullScreen
          title={`Vedere panoramică - ${property.title}`}
        />
      </div>
    </div>
  );
}