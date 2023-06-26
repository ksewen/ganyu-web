'use client';
import { useAuthContext } from '@/context/AuthProvider';
import useAxiosPrivate from '@/hook/useAxiosPrivate';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

function Details() {
  const { auth, setAuth } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  const [nickname, setNickname] = useState('');
  const [mobile, setMobile] = useState('');

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setNickname(auth?.nickname);
    setMobile(auth?.mobile);
  }, [auth]);

  const handleCancel = () => {
    setEditMode(false);
    setNickname(auth?.nickname);
    setMobile(auth?.mobile);
  };

  const handleSubmit = async () => {
    const controller = new AbortController();
    const body = { id: auth?.id, nickname: null, mobile: null };
    if (nickname) {
      body.nickname = nickname;
    }
    if (mobile) {
      body.mobile = mobile;
    }
    try {
      const response = await axiosPrivate.post(
        '/user/modify',
        JSON.stringify(body),
        {
          signal: controller.signal,
        }
      );
      setAuth(response.data.data);
      handleCancel();
    } catch (err) {
      console.error(err);
    }
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
                onClick={handleSubmit}
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
        <Grid item xs={5}>
          <TextField
            id="username-value"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            fullWidth
            sx={{ ml: 10 }}
            size="small"
            disabled
            defaultValue={auth?.username}
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            nickname:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="nickname-value"
            variant="standard"
            InputProps={{ disableUnderline: !editMode }}
            fullWidth
            sx={{ ml: 10 }}
            disabled={!editMode}
            defaultValue={auth?.nickname}
            size="small"
            onChange={(event) => {
              setNickname(event.target.value);
            }}
            value={nickname}
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            email:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="email-value"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            fullWidth
            sx={{ ml: 10 }}
            size="small"
            disabled
            defaultValue={auth?.email}
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            mobile:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="mobile-value"
            variant="standard"
            InputProps={{ disableUnderline: !editMode }}
            fullWidth
            sx={{ ml: 10 }}
            size="small"
            disabled={!editMode}
            defaultValue={auth?.mobile}
            onChange={(event) => setMobile(event.target.value)}
            value={mobile}
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          <Typography variant="text" sx={{ ml: 10 }}>
            create time:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="create-time-value"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            fullWidth
            sx={{ ml: 10 }}
            size="small"
            disabled
            defaultValue={auth?.createTime}
          ></TextField>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}

export default Details;
