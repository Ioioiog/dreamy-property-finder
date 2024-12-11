import ViewerContainer from './360/ViewerContainer';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  return (
    <ViewerContainer
      isOpen={isOpen}
      onClose={onClose}
      propertyId={propertyId}
    />
  );
}