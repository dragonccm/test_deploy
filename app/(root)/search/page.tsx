import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import ThreadCard from "@/components/cards/ThreadCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { searchThreads } from "@/lib/actions/thread.actions";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const searchQuery = searchParams.q || "";

  const [usersResult, threadsResult] = await Promise.all([
    fetchUsers({
      userId: user.id,
      searchString: searchQuery,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    }),
    searchThreads({
      searchString: searchQuery,
      pageNumber: searchParams?.page ? +searchParams.page : 1,
      pageSize: 25,
    }),
  ]);

  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>

      <Searchbar routeType='search' />

      {/* Users Section */}
      <div className='mt-14'>
        <h2 className='text-2xl font-semibold mb-4'>Users</h2>
        <div className='flex flex-col gap-9'>
          {usersResult.users.length === 0 ? (
            <p className='no-result'>No users found</p>
          ) : (
            <>
              {usersResult.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Threads Section */}
      <div className='mt-14'>
        <h2 className='text-2xl font-semibold mb-4'>Posts</h2>
        <div className='flex flex-col gap-10'>
          {threadsResult.threads.length === 0 ? (
            <p className='no-result'>No posts found</p>
          ) : (
            <>
              {threadsResult.threads.map((post) => (
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={
                    post.text && post.text.length >= 700
                      ? post.text.slice(0, 600) + '\nxem thêm....'
                      : post.text || ''
                  }
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                  totalLike={post.like}
                  isLike={post.like.indexOf(user.id) == -1 ? true : false}
                  img={post.image || ''}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={usersResult.isNext || threadsResult.isNext}
      />
    </section>
  );
}

export default Page;
