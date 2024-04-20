
import {getServerSession } from "next-auth";

const page = async () => {
    const session = await getServerSession();

    return (
        <h1 className='text-base-semibold text-light-2'>{JSON.stringify(session)}</h1>
    );
}

export default page;