import React from 'react';

const Page = () => {
    const fieldItem = {
        1: "skdksd",
        2: "skjdksjd",
        3: 'skdksjsjdksjdkjskdjkdjksjdkjs',
        4: "sdjksdksjkdk",
    };

    return (
        <form action="/" className='flex flex-col p-6'>
            {Object.entries(fieldItem).map(([key, value]) => (
                <div className='w-full flex justify-between m-2'>
                    <label htmlFor={key.toString()} key={key} className='hover:outline w-auto rounded p-2 m-2 text-center text-small-medium'>
                        {value}
                    </label>
                    <select className='w-20 p-2 text-center rounded'>
                        <option value="1" className='w-20 text-center p-2'>1</option>
                        <option value="1" className='w-20 text-center p-2'>1</option>
                    </select>
                </div>
            ))}
        </form>
    );
};

export default Page;