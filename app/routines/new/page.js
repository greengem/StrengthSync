'use client'
import { useState } from 'react';
import PageContainer from '@/components/Layout/PageContainer'
import Heading from '@/components/Layout/Heading'
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import RoutineModal from '@/components/Routines/RoutineModal';

export default function RoutineNew() {
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [routineName, setRoutineName] = useState('');

    function addExercises(newExercises) {
        setSelectedExercises(prevExercises => [...prevExercises, ...newExercises]);
    }

    async function saveRoutine() {
        try {
            const response = await fetch('/api/routines/save-routine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ routineName, exercises: selectedExercises })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to save routine. Server responded with ${response.status}: ${errorData.error || 'Unknown Error'}`);
            }

            const data = await response.json();

            if (data.success) {
                alert('Routine saved successfully!');
                // Optionally, redirect the user or clear the form
            } else {
                alert('Error saving routine: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error saving routine:', error); // Log the full error for debugging
            alert('Error saving routine: ' + error.message);
        }
    }

    return (
        <PageContainer>
            <Heading title='New Routine' />
            <Input
                isRequired
                type="text"
                label="Routine Name"
                className='mb-5'
                value={routineName}
                onChange={e => setRoutineName(e.target.value)}
            />
            <Textarea
                placeholder="Enter Notes"
                className='mb-5'
            />
            <ul>
            {selectedExercises.map((exercise, index) => (
                <li key={index}>{exercise}</li>
            ))}
            </ul>
            <RoutineModal onAddExercises={addExercises} />
            <Button color='danger' onClick={saveRoutine}>Save Routine</Button>
        </PageContainer>
    )
}

