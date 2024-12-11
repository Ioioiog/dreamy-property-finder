import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ViewerControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function ViewerControls({ onPrevious, onNext }: ViewerControlsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
        aria-label="Previous view"
      >
        <ChevronLeft size={24} className="text-property-stone" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
        aria-label="Next view"
      >
        <ChevronRight size={24} className="text-property-stone" />
      </button>
    </>
  );
}