type AvatarBlockProps = {
    name: string;
    avatar: string;
    workouts: number;
};

const AvatarBlock: React.FC<AvatarBlockProps> = ({ name, avatar, workouts }) => {
    return (
        <div className="flex items-center space-x-4 mb-10">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-semibold">{name}</span>
                <span className="text-gray-500 text-sm">{workouts} workouts</span>
            </div>
        </div>
    )
}
export default AvatarBlock;
