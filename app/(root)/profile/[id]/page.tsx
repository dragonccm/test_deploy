import Image from "next/image";

import { redirect } from "next/navigation";

import { getUser } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";

import Link from "next/link";

import ProfileHeader from "@/components/shared/ProfileHeadercopy";
import { Button } from "@/components/ui/button";




async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const session = await getServerSession();
  if (!session) return null;
  const data = await getUser(session.user?.name)
  if (!data.data) {
    <h1>loading</h1>
  };

  return (
    <section>
      <ProfileHeader
        username={data.data.username}
        imgUrl={data.data.profile_photo}
        email={data.data.email}
        fullname={data.data.fullname}
        gender={data.data.gender}
        dob={data.data.dob}
        hometown={data.data.hometown}
      />
      <Link href={`/profile/edit/${session.user.name}`} className='w-fit'>
        <Button type="submit" className="hover:bg-zinc-700">Thay Đổi Thông Tin</Button>
      </Link>
    </section>
  );
}
export default Page;




