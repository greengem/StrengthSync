import React from 'react';
import { Routine, ExerciseDetail } from './types';
import {
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell 
} from "@nextui-org/table";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter 
} from "@nextui-org/react";
import { 
  Button 
} from "@nextui-org/button";
import { 
  Image 
} from "@nextui-org/image";
import { 
  Link 
} from "@nextui-org/link";
import NextImage from "next/image";
import NextLink from 'next/link';

export interface RoutineCardProps {
  routine: Routine;
  onDelete: (routineId: string) => void;
}

interface ExerciseTableProps {
  exercises: ExerciseDetail[];
}


const RoutineCardHeader: React.FC<{ routine: Routine }> = ({ routine }) => (
  <CardHeader className="flex gap-3">
    <Image
      as={NextImage}
      alt="Routine logo"
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
);

const ExerciseTable: React.FC<ExerciseTableProps> = ({ exercises }) => (
  <Table removeWrapper aria-label="Routine Exercises">
    <TableHeader>
      <TableColumn>Exercise</TableColumn>
      <TableColumn>Sets</TableColumn>
      <TableColumn>Reps</TableColumn>
      <TableColumn>Time</TableColumn>
    </TableHeader>
    <TableBody>
    {exercises.map((exerciseDetail: ExerciseDetail) => (
        <TableRow key={exerciseDetail.exercise.id}>
          <TableCell>{exerciseDetail.exercise.name}</TableCell>
          <TableCell>{exerciseDetail.sets}</TableCell>
          <TableCell>{exerciseDetail.reps}</TableCell>
          <TableCell>{exerciseDetail.duration} seconds</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onDelete }) => {
  const handleDelete = () => {
    onDelete(routine.id);
  };

  return (
    <Card className='mb-10'>
      <RoutineCardHeader routine={routine} />
      <CardBody>
        <ExerciseTable exercises={routine.exercises} />
      </CardBody>
      <CardFooter className='justify-between'>
        <Link as={NextLink} href='#' className='mr-2'>
          <Button color='secondary'>Edit</Button>
        </Link>
        <Button color='danger' onClick={handleDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default RoutineCard;
