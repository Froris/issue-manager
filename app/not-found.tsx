import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className='flex justify-center items-center flex-col space-y-3 mt-20'>
      <h2>Not Found!</h2>
      <p>Could not find requested resource</p>
      <p>
        Go{' '}
        <Link href='/' className='text-blue-500 font-bold underline'>
          back
        </Link>
      </p>
    </div>
  );
}
