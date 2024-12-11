interface FiltersHeaderProps {
  onResetFilters: () => void;
}

export default function FiltersHeader({ onResetFilters }: FiltersHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-brand-dark">Filtrează proprietățile</h3>
      <button
        onClick={onResetFilters}
        className="text-sm text-property-gold hover:text-property-stone"
      >
        Resetează filtrele
      </button>
    </div>
  );
}