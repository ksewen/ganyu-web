'use client';
import HttpGet from '@/app/request/httpGet';
import { Container, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Details() {
  const [userDetail, setUserDetail] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = localStorage.getItem(process.env.CURRENT_USER_CONTEXT_KEY);
    const info = JSON.parse(user);
    if (!info?.token) {
      const nextUrl = searchParams.get('next');
      router.push(nextUrl ?? '/sign-in');
      router.refresh();
      return;
    }

    (async () => {
      const user = await HttpGet('/user/detail', null, info.token);
      setUserDetail(user.data);
    })();
  }, []);

  return (
    <Container>
      <Typography variant="h5">User Detail</Typography>
      <Typography variant="text">username: {userDetail?.username}</Typography>
    </Container>
  );
}

export default Details;
