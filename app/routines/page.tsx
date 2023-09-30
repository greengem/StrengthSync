'use client'
import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import React, { useState, useEffect } from 'react';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

interface ExerciseDetail {
  exercise: {
    id: string;
    name: string;
  };
  sets: number;
  reps: number;
  duration: number;
  order: number;
}

interface Routine {
  id: string;
  name: string;
  exercises: ExerciseDetail[];
  createdAt: string;
  updatedAt: string;
}


export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await fetch('/api/routines')
    .then(res => res.json())
    .then(data => {
      setRoutines(data.data);
      console.log(data.data);
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
      <Heading title='Routines' />
      <Link as={NextLink} color='danger' href='/routines/new'>New Routine</Link>
      {
        loading ?
          <div className='pt-20 text-center'>
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </div>
        :
          <div>
            {
              routines.length > 0 ?
<ul>
  {
    routines.map((routine) => (
      <li key={routine.id} className='flex flex-col justify-between items-start px-4 py-2 my-1 rounded-md'>
        <div className='mb-2'>
          <p className='font-semibold mb-1'>{routine.name}</p>
          <p>Created: {new Date(routine.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(routine.updatedAt).toLocaleString()}</p>
        </div>
        <div>
          <p className='font-semibold'>Exercises:</p>
          <ul>
            {
              routine.exercises.map((exerciseDetail, index) => (
                <li key={exerciseDetail.exercise.id}>
                  <span className='font-medium'>{index + 1}. {exerciseDetail.exercise.name}</span>
                  <p>Sets: {exerciseDetail.sets}</p>
                  <p>Reps: {exerciseDetail.reps}</p>
                  <p>Duration: {exerciseDetail.duration} seconds</p>
                </li>
              ))
            }
          </ul>
        </div>
        <button className="btn btn-primary mt-2">Edit</button>
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
  )
}
