'use client'
import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import React, { useState, useEffect } from 'react';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";
import { IconArrowLeft } from '@tabler/icons-react';

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
      <Link as={NextLink} href='/routines/new' className='mb-5'>
        <Button color='primary'>New Routine</Button>
      </Link>
      {
        loading ?
          <div className='pt-20 text-center'>
            <span className="loading loading-infinity loading-lg text-primary"></span>
          </div>
        :
          <div>
            {
              routines.length > 0 ?
<div>
  {
    routines.map((routine) => (
      <Card key={routine.id} className='mb-10'>
            <CardHeader className="flex gap-3">
        <Image
          as={NextImage}
          alt="nextui logo"
          height={40}
          radius="sm"
          src="/icons/barbell.svg"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{routine.name}</p>
          <p className="text-small text-default-500">{new Date(routine.updatedAt).toLocaleString()}</p>
        </div>
      </CardHeader>
        <CardBody>
          <Table aria-label="Example static collection table">
          <TableHeader>
        <TableColumn>Exercise</TableColumn>
        <TableColumn>Sets</TableColumn>
        <TableColumn>Reps</TableColumn>
        <TableColumn>Time</TableColumn>
      </TableHeader>
      <TableBody>
            {
              routine.exercises.map((exerciseDetail) => (
                <TableRow key={exerciseDetail.exercise.id}>
                  <TableCell>{exerciseDetail.exercise.name}</TableCell>
                  <TableCell>{exerciseDetail.sets}</TableCell>
                  <TableCell>{exerciseDetail.reps}</TableCell>
                  <TableCell>{exerciseDetail.duration} seconds</TableCell>
                  </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter className='justify-between'>
          <Link as={NextLink} href='#' className='mr-2'><Button color='secondary'>Edit</Button></Link>
          <Link as={NextLink} href='#'><Button color='danger'>Delete</Button></Link>
        </CardFooter>
      </Card>
    ))
  }
</div>

              :
              <p>
                No data available
              </p>
            }
          </div>
      }
    </PageContainer>
  )
}
