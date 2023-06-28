'use client';
import { formatUrl } from '@/api/axios';
import useAxiosPrivate from '@/hook/useAxiosPrivate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

function ShoppingList() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [total, settotal] = useState(9);

  function buildParamObject() {
    const params = {
      index: index > 0 ? index - 1 : 0,
      count: process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE,
    };
    return params;
  }

  const handleChange = async (e, p) => {
    const params = buildParamObject();
    params.index = p - 1;
    fetchData(params);
  };

  async function fetchData(params) {
    var url = '/shopping-list/list';
    if (params) {
      url = formatUrl(url, params);
    }
    try {
      const response = await axiosPrivate.get(url);
      setData(response.data.data);
      setIndex(response.data.index);
      settotal(response.data.total);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData(buildParamObject());
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ ml: 5, fontWeight: 'bold' }}>
            Shopping List:
          </Typography>
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
      </Grid>
      <Stack spacing={2} disableSpacing>
        <Pagination
          count={Math.ceil(total / process.env.DEFAULT_SHOPPING_LIST_PAGE_SIZE)}
          defaultValue={index}
          shape="rounded"
          size="small"
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
}

export default ShoppingList;
