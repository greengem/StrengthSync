'use client'
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import { ExerciseSearch } from '@/components/Exercises/ExerciseSearch';
import ExerciseFilter from '@/components/Exercises/ExerciseFilter';
import { Button } from '@nextui-org/button';
interface Exercise {
  id: string;
  name: string;
  category: string;
}

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getData = async () => {
    await fetch('/api/exercises')
    .then(res => res.json())
    .then(data => {
      setExercises(data.data.rows);
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <PageContainer>
      <Heading title='Exercises' />
      <ExerciseSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExerciseFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {
        loading ?
          <div className='pt-20 text-center'>
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </div>
        :
          <div>
            {
              exercises.length > 0 ?
              <ul>
                {
                  exercises
                  .filter(exercise => 
                    (selectedCategory === '' || exercise.category === selectedCategory) && 
                    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((exercise) => (
<li key={exercise.id} className='bg-gray-900 flex justify-between items-center px-4 py-2 my-1 rounded-md'>
  <div>
    <p className='font-semibold mb-1'>
      {exercise.name}
    </p>
    <p className='uppercase text-xs text-gray-500'>
      {exercise.category}
    </p>
  </div>
  <Button>Add</Button>
</li>

                  ))
                }
              </ul>
              :
              <p>
                No data available
              </p>
            }
            <div className="mt-10 text-xs ">
              data received from Vercel Postgres
            </div>
          </div>
      }
    </PageContainer>
  );
}
