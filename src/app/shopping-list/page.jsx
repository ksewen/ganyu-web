'use client';
import { formatUrl } from '@/api/axios';
import useAxiosPrivate from '@/hook/useAxiosPrivate';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

function ShoppingList() {
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    control,
  } = useForm();

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [total, settotal] = useState(9);
  const [finish, setFinish] = useState('all');
  const timeRangeErrorMessage = 'start date must befor end date';

  const onSubmit = async (data) => {
    var params = buildParamObject();
    if (data.nameKeyword) {
      params.name = data.nameKeyword;
    }
    if (data.createTimeStart && data.createTimeEnd) {
      var after = params.createTimeAfter;
      var before = params.createTimeBefore;
      params.createTimeAfter = after;
      params.createTimeBefore = before;
    }
    console.log(JSON.stringify(params));
  };

  function buildParamObject() {
    const params = {
      index: index > 0 ? index - 1 : 0,
      count: process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE,
    };
    if (finish === 'finished') {
      params.finished = true;
    } else if (finish === 'ongoing') {
      params.finished = false;
    }
    return params;
  }

  const handleChangePage = (e, page) => {
    setIndex(page);
  };

  const handleChangeRadio = (e, value) => {
    setFinish(value);
  };

  const handleResetSearchCondition = () => {
    setValue('nameKeyword', null);
    setValue('createTimeStart', null);
    setValue('createTimeEnd', null);
    clearErrors();
  };

  useEffect(() => {
    async function fetchData(params) {
      var url = '/shopping-list/list';
      if (params) {
        url = formatUrl(url, params);
      }
      try {
        const response = await axiosPrivate.get(url);
        setData(response.data.data);
        setIndex(response.data.index + 1);
        settotal(response.data.total);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData(buildParamObject());
  }, [index, finish]);

  return (
    <Container>
      <Grid container component="main" spacing={2}>
        <Grid item xs={8} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ ml: 5, fontWeight: 'bold' }}>
            Shopping List:
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ ml: 5 }}>
            <RadioGroup
              row
              name="shopping-list-finished-radio-group"
              defaultValue="all"
              onChange={handleChangeRadio}
              sx={{ mr: 2 }}
            >
              <FormControlLabel
                value="all"
                control={<Radio size="small" />}
                label="all"
              />
              <FormControlLabel
                value="finished"
                control={<Radio size="small" />}
                label="finished"
              />
              <FormControlLabel
                value="ongoing"
                control={<Radio size="small" />}
                label="ongoing"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="name-keyword"
            name="name-keyword"
            label="Name"
            variant="outlined"
            size="small"
            sx={{ ml: 3, mr: 2 }}
            {...register('nameKeyword')}
          />
          <Controller
            control={control}
            rules={{
              validate: {
                startMustBeforEnd: (value, formValue) => {
                  if (value == null || formValue.createTimeEnd == null) {
                    return true;
                  }
                  return (
                    value < formValue.createTimeEnd || timeRangeErrorMessage
                  );
                },
              },
            }}
            name="createTimeStart"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Create Time Start"
                  slotProps={{
                    textField: {
                      size: 'small',
                      helperText: errors.createTimeStart?.message,
                      error: errors.createTimeStart ? true : false,
                    },
                  }}
                  sx={{ ml: 1 }}
                  disableFuture
                  onChange={onChange}
                  value={value}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            control={control}
            rules={{
              validate: {
                startMustBeforEnd: (value, formValue) => {
                  if (value == null || formValue.createTimeStart == null) {
                    return true;
                  }
                  return (
                    formValue.createTimeStart < value || timeRangeErrorMessage
                  );
                },
              },
            }}
            name="createTimeEnd"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Create Time End"
                  slotProps={{
                    textField: {
                      size: 'small',
                      helperText: errors.createTimeEnd?.message,
                      error: errors.createTimeEnd ? true : false,
                    },
                  }}
                  sx={{ ml: 1 }}
                  disableFuture
                  onChange={onChange}
                  value={value}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            type="submit"
            sx={{ ml: 12, mr: 1, width: 90 }}
            size="middle"
            onClick={handleSubmit(onSubmit)}
          >
            SEARCH
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 90 }}
            size="middle"
            onClick={handleResetSearchCondition}
          >
            RESET
          </Button>
        </Grid>
        {data.map((item) => (
          <Grid key={item.id} item xs={4}>
            <Card key={item.id} sx={{ height: 1 / 1 }}>
              <CardHeader title={item.name} subheader={item.createTime} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Card sx={{ height: 1 / 1, textAlign: 'center' }}>
            <CardActionArea sx={{ height: 1 / 1 }}>
              <AddIcon sx={{ fontSize: 70 }}></AddIcon>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Stack spacing={2} disableSpacing>
        <Pagination
          count={Math.ceil(total / process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE)}
          defaultValue={index}
          shape="rounded"
          size="small"
          onChange={handleChangePage}
        />
      </Stack>
    </Container>
  );
}

export default ShoppingList;
