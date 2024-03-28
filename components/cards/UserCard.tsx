"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Link from "next/link";


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
    <>
      {
      isCommunity ? (<Link
        href={`/communities/${id}`}
        key={id}
      >
        <article className='user-card'>
          <div className='user-card_avatar'>
            <div className='relative h-12 w-12'>
              <Image
                src={imgUrl}
                alt='user_logo'
                fill
                className='rounded-full object-cover'
              />
            </div>

            <div className='flex-1 text-ellipsis'>
              <h4 className='text-base-semibold text-light-1'>{name}</h4>
              <p className='text-small-medium text-gray-1'>@{username}</p>
            </div>
          </div>
        </article>
      </Link>) : (<Link
        href={`/profile/${id}`}
        key={id}
      >
        <article className='user-card'>
          <div className='user-card_avatar'>
            <div className='relative h-12 w-12'>
              <Image
                src={imgUrl}
                alt='user_logo'
                fill
                className='rounded-full object-cover'
              />
            </div>

            <div className='flex-1 text-ellipsis'>
              <h4 className='text-base-semibold text-light-1'>{name}</h4>
              <p className='text-small-medium text-gray-1'>@{username}</p>
            </div>
          </div>
        </article>
      </Link>)
      }
    </>
  );
}

export default UserCard;
