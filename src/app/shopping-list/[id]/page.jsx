'use client';
import useAxiosPrivate from '@/hook/useAxiosPrivate';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ShoppingListItem(context) {
  const router = useRouter();
  const id = context.params.id;
  const [detail, setDetail] = useState({});
  const [items, setItems] = useState([]);
  const [updateTime, setUpdateTime] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchData() {
      var url = '/shopping-list/detail?id=' + id;
      try {
        const response = await axiosPrivate.get(url);
        setDetail(response.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      var url = '/shopping-list/items?shoppingListId=' + id;
      try {
        const response = await axiosPrivate.get(url);
        setItems(response.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItems();
  }, [updateTime]);

  return (
    <Container>
      <Grid container component="main" spacing={2}>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            sx={{ width: 90 }}
            size="small"
            onClick={() => {
              router.push('/shopping-list');
            }}
          >
            BACK
          </Button>
          {detail?.finished && (
            <Button
              variant="outlined"
              sx={{ ml: 1, width: 90 }}
              size="small"
              disabled
            >
              FINISHED
            </Button>
          )}
          {!detail?.finished && (
            <Tooltip title="Click and mark as finished">
              <Button
                variant="contained"
                sx={{ ml: 1, width: 90 }}
                size="small"
                onClick={async () => {
                  try {
                    await axiosPrivate.post(
                      '/shopping-list/mark-finished?id=' + detail.id
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                ONGOING
              </Button>
            </Tooltip>
          )}
        </Grid>
        <Grid item xs={9} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {detail?.name + ':'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <Box sx={{ fontWeight: 'bold', md: 3 }}>{'Description: '}</Box>
            {detail?.description
              ? detail?.description
              : 'lazy man left nothing here :('}
          </Typography>
        </Grid>
      </Grid>
      <Stack sx={{ mt: 2 }} spacing={2}>
        {items?.map((item) => (
          <Paper key={item.id} variant="outlined">
            <Grid
              container
              spacing={2}
              justifyItems="center"
              alignItems="center"
            >
              <Grid key={item.id} item xs={2}>
                <Box
                  component="img"
                  sx={{
                    height: 75,
                    width: 75,
                    alignSelf: 'center',
                    ml: 1,
                    mt: 1,
                    md: 1,
                  }}
                  alt={item.name}
                  src={item.imageUrl ? item.imageUrl : '/avatar.jpg'}
                />
              </Grid>
              <Grid key={item.id} item xs={2}>
                <Tooltip title="Click and mark as bought">
                  <Button
                    variant="contained"
                    sx={{ width: 90 }}
                    size="small"
                    disabled={item.bought}
                    onClick={async () => {
                      try {
                        await axiosPrivate.post(
                          'shopping-list/item/mark-bought?id=' + item.id
                        );
                        const prev = updateTime;
                        setUpdateTime(prev + 1);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {item.bought ? 'BOUGHT' : 'BUYING'}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid key={item.id} item xs={2}>
                <Typography key={item.name} variant="body">
                  {item.name}
                </Typography>
              </Grid>
              <Grid key={item.id} item xs={2}>
                <Typography key={item.name} variant="body">
                  {item.brand}
                </Typography>
              </Grid>
              <Grid key={item.id} item xs={2}>
                <Typography key={item.name} variant="body">
                  {item.description}
                </Typography>
              </Grid>
              <Grid key={item.id} item xs={2}>
                <Typography key={item.name} variant="body">
                  {item.createTime}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default ShoppingListItem;
