import React from 'react';

type ExerciseFilterProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

function ExerciseFilter({
  selectedCategory,
  setSelectedCategory,
}: ExerciseFilterProps) {
  const categories = [
    'cardio',
    'olympic weightlifting',
    'stretching',
    'strength',
    'powerlifting',
    'strongman',
    'plyometrics',
  ];

  const handleCategoryChange = (newCategory: string) => {
    console.log('Category changed to:', newCategory);
    setSelectedCategory(newCategory);
  };

  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            id={category}
            name="exerciseCategory"
            value={category}
            checked={selectedCategory === category}
            onChange={() => handleCategoryChange(category)}
            className="radio radio-primary"
          />
          <label htmlFor={category} className="text-gray-600">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
}

export default ExerciseFilter;
