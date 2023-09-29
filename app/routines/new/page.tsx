import { useState } from 'react';
import PageContainer from '@/components/Layout/PageContainer'

import Heading from '@/components/Layout/Heading'
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import RoutineModal from '@/components/Routines/RoutineModal';

export default function RoutineNew() {
    const [selectedExercises, setSelectedExercises] = useState([]);

    return (
        <PageContainer>
            <Heading title='New Routine' />
            <Input
                isRequired
                type="text"
                label="Routine Name"
                className='mb-5'
            />
            <Textarea
                placeholder="Enter Notes"
                className='mb-5'
            />

            <ul>
                <li>Bench Press</li>
            </ul>
            <RoutineModal />
            <Button color='danger'>Save Routine</Button>
        </PageContainer>
    )
}
