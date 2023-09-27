interface ExerciseSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function ExerciseSearch({ searchTerm, setSearchTerm }: ExerciseSearchProps) {
  return (
    <input
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      type="text" 
      placeholder="Search" 
      className="input input-bordered input-primary w-full mb-10"
    />
  );
}
