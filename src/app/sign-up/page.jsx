'use client';
import { useAuthContext } from '@/context/AuthProvider';
import { Box, Button, Container, Grid, Link, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function SignUp() {
  const { signUp } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await signUp(data.username, data.password, data.email, data.nickname);
  };

  const validateSchema = {
    username: { required: 'username ist required' },
    email: {
      required: 'email is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'please enter a valid email',
      },
    },
    password: {
      required: 'password is required',
      minLength: {
        value: 6,
        message: 'minimum characters 6 required',
      },
      maxLength: {
        value: 18,
        message: 'maximum characters is 18',
      },
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                helperText={errors.username ? errors.username.message : ''}
                autoFocus
                error={errors.username ? true : false}
                {...register('username', validateSchema.username)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="nickname"
                label="Nickname"
                name="nickname"
                autoComplete="nickname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                helperText={errors.email ? errors.email.message : ''}
                error={errors.email ? true : false}
                {...register('email', validateSchema.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="new-password"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={errors.password ? errors.password.message : ''}
                error={errors.password ? true : false}
                {...register('password', validateSchema.password)}
              />
            </Grid>
            {/* <Grid item xs={12}> */}
            {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            {/* </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
