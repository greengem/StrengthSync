import React, { useState, useEffect } from 'react';

type Exercise = {
  name: string;
  category: string;
};

type ExerciseListProps = {
  category: string;
};

function ExerciseList({ category }: ExerciseListProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/exercises?category=${category}`);
      const data = await response.json();
      console.log("Fetching exercises for category:", category);
      setExercises(data);
    }
    fetchData();
  }, [category]);

  return (
    <ul>
      {exercises.map((exercise, index) => (
        <li key={index} className="border-b-2">
          <p>{exercise.name}</p>
          <p>{exercise.category}</p>
        </li>
      ))}
    </ul>
  );
}

export default ExerciseList;
