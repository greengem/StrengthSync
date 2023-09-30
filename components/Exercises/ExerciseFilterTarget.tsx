import React from 'react';
import { Select, SelectItem } from "@nextui-org/react";


export default function ExercisesFilterTarget() {
  return (
    <Select
      label="Select a category"
    >
        <SelectItem key="1" value="value">Arms</SelectItem>
    </Select>
  );
}
