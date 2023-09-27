'use client'
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import ExerciseSearch from '@/components/Exercises/ExerciseSearch';
import ExerciseList from '@/components/Exercises/ExerciseList';
import ExerciseFilter from '@/components/Exercises/ExerciseFilter';

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState('cardio'); // Default category

  useEffect(() => {
    console.log("ExercisesPage category:", selectedCategory);
  }, [selectedCategory]);
  

  return (
    <PageContainer>
      <Heading title='Exercises' />
      <ExerciseSearch />
      <ExerciseFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <ExerciseList category={selectedCategory} />
    </PageContainer>
  );
}
