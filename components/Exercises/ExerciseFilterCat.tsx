import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";

type ExerciseFilterProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

function ExerciseFilter({
  selectedCategory,
  setSelectedCategory,
}: ExerciseFilterProps) {
  const categories = [
    'all',
    'cardio',
    'olympic weightlifting',
    'stretching',
    'strength',
    'powerlifting',
    'strongman',
    'plyometrics',
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    console.log('Category changed to:', newCategory);
    setSelectedCategory(newCategory === 'all' ? '' : newCategory);
  };

  return (
    <Select
      label="Select a category"

      value={selectedCategory}
      onChange={handleCategoryChange}
    >
      {categories.map((category) => (
        <SelectItem key={category} value={category === 'all' ? '' : category}>
          {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
        </SelectItem>
      ))}
    </Select>
  );
}

export default ExerciseFilter;
