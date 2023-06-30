'use client';
import { formatUrl } from '@/api/axios';
import AddDialog from '@/component/ShoppingListAddDialog';
import useAxiosPrivate from '@/hook/useAxiosPrivate';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Button,
  ButtonBase,
  Card,
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
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import moment from 'moment';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [total, settotal] = useState(0);
  const [searchParams, setSearchParams] = useState({
    index: 0,
    count: process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE,
  });
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const timeRangeErrorMessage = 'start date must before end date';
  const timeRangeNotFinishMessage = 'start date and end date must be given';

  const onSubmit = async (data) => {
    var params = buildParamObject();
    if (data.nameKeyword) {
      params.name = data.nameKeyword;
    }
    if (data.createTimeStart && data.createTimeEnd) {
      console.log(data.createTimeStart);
      const start = moment(new Date(data.createTimeStart)).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      const end = moment(new Date(data.createTimeEnd)).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      params.createTimeAfter = start;
      params.createTimeBefore = end;
    }
    setSearchParams(params);
  };

  function buildParamObject() {
    const prev = searchParams;
    return prev == null
      ? {
          index: index > 0 ? index - 1 : 0,
          count: process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE,
        }
      : {
          index: prev.index,
          count: prev.count,
          finished: prev.finished,
          createTimeAfter: prev.createTimeAfter,
          createTimeBefore: prev.createTimeBefore,
        };
  }

  const handleChangeRadio = (e, value) => {
    const post = buildParamObject();
    if (value === 'finished') {
      post.finished = true;
    } else if (value === 'ongoing') {
      post.finished = false;
    } else if (value === 'all') {
      post.finished = null;
    }
    setSearchParams(post);
  };

  const handleResetSearchCondition = () => {
    const post = buildParamObject();
    post.name = null;
    post.createTimeAfter = null;
    post.createTimeBefore = null;
    setValue('nameKeyword', null);
    setValue('createTimeStart', null);
    setValue('createTimeEnd', null);
    clearErrors();
    setSearchParams(post);
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
    fetchData(searchParams);
  }, [searchParams, addMode]);

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
                  if (value == null && formValue.createTimeEnd != null) {
                    return timeRangeNotFinishMessage;
                  }
                  if (value != null && formValue.createTimeEnd != null) {
                    return (
                      value < formValue.createTimeEnd || timeRangeErrorMessage
                    );
                  }
                  return true;
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
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
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
                  if (value == null && formValue.createTimeStart != null) {
                    return timeRangeNotFinishMessage;
                  }
                  if (value != null && formValue.createTimeStart != null) {
                    return (
                      formValue.createTimeStart < value || timeRangeErrorMessage
                    );
                  }
                  return true;
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
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
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
            <Card
              key={item.id}
              onClick={() => {
                router.push('/shopping-list/' + item.id);
              }}
              sx={{ height: 1 / 1 }}
            >
              <CardHeader title={item.name} subheader={item.createTime} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description
                    ? item.description
                    : 'lazy man left nothing here :('}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {item.finished && (
                  <IconButton disabled aria-label="done item">
                    <DoneIcon sx={{ color: 'green' }} />
                  </IconButton>
                )}
                {!item.finished && (
                  <IconButton
                    aria-label="set done item"
                    onClick={async () => {
                      try {
                        await axiosPrivate.post(
                          '/shopping-list/mark-finished?id=' + item.id
                        );
                        const post = buildParamObject();
                        setSearchParams(post);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                )}
                {!item.finished && (
                  <IconButton aria-label="edit item">
                    <StorageIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={4}>
          <Card
            sx={{ height: data?.length > 0 ? 1 / 1 : 200, textAlign: 'center' }}
          >
            <ButtonBase
              sx={{ height: 1 / 1, width: 1 / 1 }}
              onClick={() => {
                setAddMode(true);
              }}
            >
              <AddIcon sx={{ fontSize: 40 }}></AddIcon>
            </ButtonBase>
          </Card>
        </Grid>
      </Grid>
      <AddDialog
        open={addMode}
        changeMode={(open) => {
          setAddMode(open);
        }}
      />
      <Stack spacing={2} disableSpacing>
        <Pagination
          count={Math.ceil(total / process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE)}
          defaultValue={index}
          shape="rounded"
          size="small"
          onChange={(e, page) => {
            setIndex(page);
            const post = buildParamObject();
            post.index = page - 1;
            setSearchParams(post);
          }}
        />
      </Stack>
    </Container>
  );
}

export default ShoppingList;
