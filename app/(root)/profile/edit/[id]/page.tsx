import AccountProfile from "@/components/forms/AccountProfile";
import { getUser } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";

async function Page({ params }: { params: { id: string } }) {

  if (!params.id) return null;
  const session = await getServerSession();
  if (!session) return null;
  const data = await getUser(session.user?.name)
  if (!data) {
    <h1>loading</h1>
  };

  return (
    <AccountProfile
      session = {session}
      profile_photo={data.data.profile_photo}
      username={data.data.username}
      password={data.data.password}
      fullname={data.data.fullname}
      gender={data.data.gender}
      dob={data.data.dob}
      hometown={data.data.hometown}
      email={data.data.email}
    />
  );
}
export default Page;




