'use client';
import { useAuthContext } from '@/context/AuthProvider';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Input,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function Details() {
  const { auth } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  const [nickname, setNickname] = useState(auth?.nickname);
  const [email, setEmail] = useState(auth?.email);
  const [mobile, setMobile] = useState(auth?.mobile);

  const handleCancel = () => {
    setEditMode(false);
    setNickname(auth?.nickname);
    setEmail(auth?.email);
    setMobile(auth?.mobile);
  };

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
          {!editMode && (
            <Button
              variant="contained"
              sx={{ mt: 3, width: 90 }}
              size="middle"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
          {editMode && (
            <Box>
              <Button
                variant="contained"
                sx={{ mt: 3, mr: 1, width: 90 }}
                size="middle"
              >
                SUBMIT
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 3, width: 90 }}
                size="middle"
                onClick={handleCancel}
              >
                CANCEL
              </Button>
            </Box>
          )}
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
            disabled={!editMode}
            defaultValue={auth?.nickname}
            size="small"
            onChange={(event) => {
              setNickname(event.target.value);
            }}
            value={nickname}
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
            disabled={!editMode}
            defaultValue={auth?.email}
            onChange={(event) => setEmail(event.target.value)}
            value={email}
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
            disabled={!editMode}
            defaultValue={auth?.mobile}
            onChange={(event) => setMobile(event.target.value)}
            value={mobile}
          ></Input>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            create time:
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="text" sx={{ ml: 10 }}>
            {auth?.createTime}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Details;
