import React from 'react';

const Page = () => {
    const fieldItem = {
        1:{
            label: "áo evisu" ,
            maxScore: 100
        },
        2:{
            label: "khẩu trang máy chém" ,
            maxScore: 100
        },
        3:{
            label: 'đẹp trai',
            maxScore: 100
        },
        4:{
            label: "uống sting" ,
            maxScore: 100
        },
    };

    return (
        <form action="/" className='flex flex-col p-6'>
            {Object.entries(fieldItem).map(([key, value]) => (
                <div className='w-full flex justify-between m-2' key={key}>
                    <label htmlFor={key.toString()} className='hover:outline w-auto rounded p-2 m-2 text-center text-small-medium'>
                        {value.label}
                    </label>
                    <select className='w-20 p-2 text-center rounded'>
                        {Array.from({ length: value.maxScore / 10 }, (_, index) => (
                            <option key={index} value={10 * (index + 1)} className='w-20 text-center p-2'>
                                {10 * (index + 1)}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </form>
    );
};

export default Page;