import React from 'react';
import { FilterButtonProps } from '@/types/property';

export default function PropertyFilterButton({ label, value, currentValue, onChange }: FilterButtonProps) {
  return (
    <button
      onClick={() => onChange(value)}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        currentValue === value
          ? 'bg-brand-orange text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}