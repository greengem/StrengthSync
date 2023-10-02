'use client'
import React from 'react';
import { ExerciseDetail } from './types';
import {
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell 
} from "@nextui-org/table";

interface ExerciseTableProps {
  exercises: ExerciseDetail[];
}

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

export default ExerciseTable;
