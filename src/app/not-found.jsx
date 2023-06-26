'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const nextUrl = searchParams.get('next');
    let timer1 = setTimeout(() => {
      router.push(nextUrl ?? '/sign-in');
      router.refresh();
    }, 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="not-found">
      <h1>Ooops...</h1>
      <h2>That page cannot be found :(</h2>
      <p>
        Going back to the <Link href="/">Homepage</Link> is 3 seconds...
      </p>
    </div>
  );
};

export default NotFound;
