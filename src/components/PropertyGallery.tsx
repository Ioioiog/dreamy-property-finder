import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Property } from "@/types/property";
import ThreeViewer from "./360/ThreeViewer";

interface PropertyGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  mode?: "gallery" | "360";
}

export default function PropertyGallery({ 
  isOpen, 
  onClose, 
  property,
  mode = "gallery"
}: PropertyGalleryProps) {
  if (mode === "360") {
    return <ThreeViewer propertyId={property.id} onClose={onClose} />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <div className="grid grid-cols-2 gap-4">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.title} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}