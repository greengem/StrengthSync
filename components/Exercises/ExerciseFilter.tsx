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
    'all',
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
    
    setSelectedCategory(newCategory === 'all' ? '' : newCategory);
  };

  return (
    <div className="tabs tabs-boxed mb-5">
      {categories.map((category, index) => (
        <a 
          key={index}
          className={`tab ${selectedCategory === (category === 'all' ? '' : category) ? 'tab-active' : ''}`}
          onClick={() => handleCategoryChange(category)}
        >
          {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)} 
        </a>
      ))}
    </div>
  );
}

export default ExerciseFilter;
