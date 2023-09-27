import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * FROM exercises LIMIT 10`;

  return (
    <ul>
{rows.map((row) => (
  <li key={row.id} className="border-b-2">
    <p>{row.name}</p>
    <p>{row.force}</p>
    <p>{row.level}</p>
    <p>{row.mechanic}</p>
    <p>{row.equipment}</p>

    <p>Primary Muscles:</p>
    {row.primaryMuscles && (
      <ul>
        {row.primaryMuscles.map((muscle, index) => (
          <li key={index}>{muscle}</li>
        ))}
      </ul>
    )}

    <p>Secondary Muscles:</p>
    {row.secondaryMuscles && (
      <ul>
        {row.secondaryMuscles.map((muscle, index) => (
          <li key={index}>{muscle}</li>
        ))}
      </ul>
    )}

    <p>Instructions:</p>
    {row.instructions && (
      <ol>
        {row.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    )}

    <p>{row.category}</p>
  </li>
))}


    </ul>
  );
}
