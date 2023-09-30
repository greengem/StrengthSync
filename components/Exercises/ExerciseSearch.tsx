import {Input} from "@nextui-org/input";
import { IconSearch } from '@tabler/icons-react';
interface ExerciseSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function ExerciseSearch({ searchTerm, setSearchTerm }: ExerciseSearchProps) {
  return (
    <Input
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      type="text" 
      placeholder="Search" 
      className="input input-bordered input-primary w-full mb-5"
      startContent={
        <IconSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
}
