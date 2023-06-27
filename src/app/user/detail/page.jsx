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
import { useForm } from 'react-hook-form';

function Details() {
  const { auth, setAuth } = useAuthContext();
  const [editMode, setEditMode] = useState(false);

  // const [nickname, setNickname] = useState('');
  // const [mobile, setMobile] = useState('');

  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm();

  useEffect(() => {
    setValue('nickname', auth?.nickname);
    setValue('mobile', auth?.mobile);
  }, [auth]);

  const handleCancel = () => {
    setEditMode(false);
    setValue('nickname', auth?.nickname);
    setValue('mobile', auth?.mobile);
    clearErrors('nickname');
    clearErrors('mobile');
  };

  const onSubmit = async () => {
    const controller = new AbortController();
    const body = { id: auth?.id, nickname: null, mobile: null };
    if (getValues('nickname')) {
      body.nickname = getValues('nickname');
    }
    if (getValues('mobile')) {
      body.mobile = getValues('mobile');
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
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const validateSchema = {
    nickname: { required: 'required' },
    mobile: { required: 'required' },
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
                onClick={handleSubmit(onSubmit)}
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
          {errors?.nickname && (
            <Typography variant="text" sx={{ ml: 1, color: 'red' }}>
              {errors.nickname.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="nickname-value"
            name="nickname"
            variant="standard"
            InputProps={{ disableUnderline: !editMode }}
            fullWidth
            sx={{ ml: 10 }}
            disabled={!editMode}
            defaultValue={auth?.nickname}
            size="small"
            // onChange={(event) => {
            //   setNickname(event.target.value);
            // }}
            {...register('nickname', validateSchema.nickname)}
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
          {errors?.mobile && (
            <Typography variant="text" sx={{ ml: 1, color: 'red' }}>
              {errors.mobile.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="mobile-value"
            name="mobile"
            variant="standard"
            InputProps={{ disableUnderline: !editMode }}
            fullWidth
            sx={{ ml: 10 }}
            size="small"
            disabled={!editMode}
            defaultValue={auth?.mobile}
            // onChange={(event) => setMobile(event.target.value)}
            {...register('mobile', validateSchema.mobile)}
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
