"use client"
import Image from "next/image";
import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'

interface Props {
  quote: string; // Thêm props cho tiêu đề bài viết
  hashtag: string; // Thêm props cho mô tả bài viết
  url: string; // Thêm props cho URL hình ảnh
}

function ShareBtn({
  quote,
  hashtag,
  url,
}: Props) {
  return (
    <FacebookShareButton
      url={url}
      quote={quote}
      hashtag={hashtag}
    >
      <Image
        src='/assets/share.svg'
        alt='heart'
        width={24}
        height={24}
        className='cursor-pointer object-contain'
      />
    </FacebookShareButton>
  );
}

export default ShareBtn;
