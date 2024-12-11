import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import PanoramaViewer from "./PanoramaViewer";
import { Property } from "@/types/property";

interface PanoramaModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export default function PanoramaModal({ 
  isOpen, 
  onClose, 
  property 
}: PanoramaModalProps) {
  // Construct the panorama image path based on the property ID
  const panoramaImagePath = `/assets/360/${property.id}/panorama.jpg`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] p-0 bg-black">
        <div className="relative w-full h-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close 360° view"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{property.title}</h2>
            <p className="text-sm text-gray-600">
              Click and drag to look around. Use the mouse wheel to zoom in and out.
            </p>
          </div>

          <PanoramaViewer imageUrl={panoramaImagePath} />
        </div>
      </DialogContent>
    </Dialog>
  );
}