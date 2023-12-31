import React from 'react';
import { Routine, ExerciseDetail } from './types';
import ExerciseTable from '@/components/Routines/ExerciseTable';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter 
} from "@nextui-org/card";
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

const RoutineCard: React.FC<RoutineCardProps> = ({ routine }) => {

  return (
    <Card className='mb-10'>
      <RoutineCardHeader routine={routine} />
      <CardBody className='pt-1'>
      {routine.notes && routine.notes.trim().length > 0 && (
        <p className='text-sm text-gray-500 mb-3'>Notes: {routine.notes}</p>
      )}

        <ExerciseTable exercises={routine.exercises} />
      </CardBody>
      <CardFooter>
        <Link as={NextLink} href={`/routines/edit/${routine.id}`} className='mr-2'>
          <Button color='secondary'>Edit</Button>
        </Link>
      </CardFooter>

    </Card>
  );
}

export default RoutineCard;
