import Link from "next/link";
import Image from "next/image";

interface Props {
  username: string;
  imgUrl: string;
  email: string,
  fullname: string,
  gender: string,
  dob: string, // 'dob' should be a JavaScript Date string.
  hometown: string,
}

function ProfileHeader({
  username,
  imgUrl,
  email,
  fullname,
  gender,
  dob,
  hometown,
}: Props) {

  // Convert 'dob' to 'dd/mm/yyyy' format.
  let date = new Date(dob);

  let formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {username}
            </h2>
            <p className='text-base-medium text-gray-1'>{email}</p>
          </div>
        </div>
      </div>
      <div className="bg-dark-2 overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6 ">
          <h3 className="text-lg leading-6 font-medium text-light-1">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-1 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-1">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Họ Và Tên 
              </dt>
              <dd className="mt-1 text-sm text-light-1 sm:mt-0 sm:col-span-2">
                {fullname}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Giới Tính
              </dt>
              <dd className="mt-1 text-sm text-light-1 sm:mt-0 sm:col-span-2">
                {gender}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Ngày Sinh
              </dt>
              <dd className="mt-1 text-sm text-light-1 sm:mt-0 sm:col-span-2">
                {formattedDate}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Địa Chỉ
              </dt>
              <dd className="mt-1 text-sm text-light-1 sm:mt-0 sm:col-span-2">
                {hometown}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;