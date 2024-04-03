"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { addLikeToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  userId: string;
  totalLike: {}[];
  isLike?: boolean;
}

function LikeThread({
  threadId,
  totalLike,
  userId,
  isLike,
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [currlike, setTotalLike] = useState(totalLike.length);
  const [isLiking, setIsLiking] = useState(false);
  const [likeTimeout, setLikeTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLike !== undefined) {
      setIsLiked(!isLike);
    }
  }, [isLike]);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => {
      const updatedIsLiked = !prevIsLiked;

      setIsLiking(true);
      setTotalLike((prevTotalLike) => prevTotalLike + (updatedIsLiked ? 1 : -1));

      
      if (likeTimeout) {
        clearTimeout(likeTimeout);
      }

      const timeout = setTimeout(() => {
        addLikeToThread(JSON.parse(threadId), userId, updatedIsLiked)
          .then(() => {
            
          })
          .catch((error) => {
            console.error("Error updating like:", error);
          })
          .finally(() => {
            setIsLiking(false);
          });
      },250); 

      setLikeTimeout(timeout);

      return updatedIsLiked;
    });

    setIsLiking(false); 
  };

  return (
    <>
      <div className="item-center flex gap-2">
        <Image
          src={isLiked ? "/assets/heart-gray-filled.svg" :  "/assets/heart-gray.svg" }
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleLikeClick}
        />
        <p className="mt-1 text-subtle-medium text-gray-1">{currlike} like</p>
      </div>

      {isLiking}
    </>
  );
}


export default LikeThread;