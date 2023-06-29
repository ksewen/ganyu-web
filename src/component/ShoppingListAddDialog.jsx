import useAxiosPrivate from '@/hook/useAxiosPrivate';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const AddDialog = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const onSubmit = async (value) => {
    const controller = new AbortController();
    const body = {
      name: value.name,
    };
    if (value.description) {
      body.description = value.description;
    }
    try {
      await axiosPrivate.post('/shopping-list/add', JSON.stringify(body), {
        signal: controller.signal,
      });
      closeAction();
    } catch (err) {
      console.error(err);
    }
  };

  const closeAction = () => {
    resetField('name');
    resetField('description');
    props.changeMode(false);
  };

  const validateSchema = {
    name: { required: 'name is required' },
  };

  return (
    <Dialog
      open={props.open}
      onClose={closeAction}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '550px',
          },
        },
      }}
    >
      <form>
        <DialogTitle>New Shopping List</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              sx={{ mt: 1 }}
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              size="large"
              error={errors.name ? true : false}
              {...register('name', validateSchema.name)}
              helperText={errors.name ? errors.name.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        resetField('name');
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ mt: 1 }}
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              {...register('description')}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ mr: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 1, width: 90 }}
            size="middle"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            sx={{ width: 90 }}
            size="middle"
            onClick={closeAction}
          >
            Cancel
          </Button>
        </DialogActions>
        <Box sx={{ mb: 2 }} />
      </form>
    </Dialog>
  );
};

export default AddDialog;
