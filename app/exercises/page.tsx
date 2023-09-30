'use client';
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/Layout/PageContainer';
import Heading from '@/components/Layout/Heading';
import { ExerciseSearch } from '@/components/Exercises/ExerciseSearch';
import ExerciseFilter from '@/components/Exercises/ExerciseFilterCat';
import ExerciseFilterTarget from '@/components/Exercises/ExerciseFilterTarget';
import { Button } from '@nextui-org/button';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
interface Exercise {
  id: string;
  name: string;
  category: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
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
      <div className='grid grid-cols-2 mb-10 gap-x-5'>
      <ExerciseFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ExerciseFilterTarget />

      </div>
      {loading ?
        <div className='pt-20 text-center'>
          <span className="loading loading-infinity loading-lg text-primary"></span>
        </div>
        :
        <div>
          {exercises.length > 0 ?
            <Table aria-label="Exercise table">
              <TableHeader>
                <TableColumn>Exercise Name</TableColumn>
                <TableColumn>Category</TableColumn>
                <TableColumn>Force</TableColumn>
                <TableColumn>Level</TableColumn>
                <TableColumn>Mechanic</TableColumn>
                <TableColumn>Equipment</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No results."}>
                {exercises
                  .filter(exercise =>
                    (selectedCategory === '' || exercise.category === selectedCategory) &&
                    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell>{exercise.name}</TableCell>
                      <TableCell>{exercise.category}</TableCell>
                      <TableCell>{exercise.force}</TableCell>
                      <TableCell>{exercise.level}</TableCell>
                      <TableCell>{exercise.mechanic}</TableCell>
                      <TableCell>{exercise.equipment}</TableCell>
                      <TableCell><Button>Add</Button></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            :
            <p>No data available</p>
          }
          <div className="mt-10 text-xs">
            Data received from Vercel Postgres
          </div>
        </div>
      }
    </PageContainer>
  );
}
