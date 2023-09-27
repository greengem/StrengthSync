type AvatarBlockProps = {
    title: string;
};


export default function AvatarBlock({ title }: AvatarBlockProps) {
    return (
        <h1 className='text-3xl font-semibold mb-10'>{title}</h1>
    )
}
