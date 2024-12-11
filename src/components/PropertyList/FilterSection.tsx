import PropertyFilterButton from '@/components/PropertyFilterButton';

interface FilterSectionProps {
  title: string;
  options: Array<{ label: string; value: string }>;
  currentValue: string;
  onChange: (value: string) => void;
}

export default function FilterSection({ title, options, currentValue, onChange }: FilterSectionProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <PropertyFilterButton
            key={option.value}
            label={option.label}
            value={option.value}
            currentValue={currentValue}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}