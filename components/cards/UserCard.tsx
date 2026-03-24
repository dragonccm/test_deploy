"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className='user-card group transition-all duration-300 ease-in-out hover:bg-dark-2 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:ring-2 group-hover:ring-primary-500/50'>
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1 transition-colors duration-300 group-hover:text-primary-500'>{name}</h4>
          <p className='text-small-medium text-gray-1 transition-colors duration-300 group-hover:text-light-2'>@{username}</p>
        </div>
      </div>

      <Button
        className='user-card_btn transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-600 hover:shadow-md hover:shadow-primary-500/30'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
