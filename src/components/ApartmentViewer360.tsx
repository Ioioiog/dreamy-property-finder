import ViewerContainer from './360/ViewerContainer';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  console.log('🏠 Opening 360° viewer for property:', propertyId);
  
  return (
    <ViewerContainer
      isOpen={isOpen}
      onClose={onClose}
      propertyId={propertyId}
    />
  );
}