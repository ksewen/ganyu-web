'use client';
import { useAuthContext } from '@/context/AuthProvider';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Input,
  Typography,
} from '@mui/material';

function Details() {
  const { auth } = useAuthContext();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ ml: 5, fontWeight: 'bold' }}>
            User Detail:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Avatar
            src={auth?.avatarUrl}
            sx={{ width: 150, height: 150, ml: 10 }}
          ></Avatar>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" sx={{ mt: 3 }} size="middle">
            Edit
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            username:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="text" sx={{ ml: 10 }}>
            {auth?.username}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            nickname:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ ml: 10, width: 350 }}
            disabled
            defaultValue={auth?.nickname}
            size="small"
          ></Input>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            email:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ ml: 10, width: 350 }}
            size="small"
            disabled
            defaultValue={auth?.email}
          ></Input>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            mobile:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ ml: 10, width: 350 }}
            size="small"
            disabled
            defaultValue={auth?.mobile}
          ></Input>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            create time:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Input
            sx={{ ml: 10, width: 350 }}
            size="small"
            disabled
            defaultValue={auth?.createTime}
          ></Input>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Details;
