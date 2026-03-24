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

  useEffect(() => {
    if (isLike !== undefined) {
      setIsLiked(!isLike);
    }
  }, [isLike]);

  const handleLikeClick = async () => {
    if (isLiking) return;

    const newIsLiked = !isLiked;
    
    setIsLiked(newIsLiked);
    setTotalLike((prev) => (newIsLiked ? prev + 1 : prev - 1));
    setIsLiking(true);

    try {
      await addLikeToThread(JSON.parse(threadId), userId, newIsLiked);
    } catch (error) {
      console.error("Error updating like:", error);
      setIsLiked(!newIsLiked);
      setTotalLike((prev) => (newIsLiked ? prev - 1 : prev + 1));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="item-center flex gap-2">
      <div className="relative">
        <Image
          src={isLiked ? "/assets/heart-gray-filled.svg": "/assets/heart-gray.svg" }
          alt="heart"
          width={24}
          height={24}
          className={`cursor-pointer object-contain ${isLiking ? "opacity-50" : ""}`}
          onClick={handleLikeClick}
          style={{ pointerEvents: isLiking ? "none" : "auto" }}
        />
        {isLiking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
      <p className="mt-1 text-subtle-medium text-gray-1">{currlike} like</p>
    </div>
  );
}

export default LikeThread;