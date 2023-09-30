import Image from 'next/image'
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";
import {User} from "@nextui-org/user";

type AvatarBlockProps = {
    name: string;
    avatar: string;
    workouts: number;
};

const AvatarBlock: React.FC<AvatarBlockProps> = ({ name, avatar, workouts }) => {
    return (
        <User
            name={name}
            description={`${workouts} workouts`}
            avatarProps={{
                src: avatar,
            }}
            className='mb-10'
        />
    )
}
export default AvatarBlock;
