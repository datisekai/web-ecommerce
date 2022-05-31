import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

interface ProductProps {
  product: {
    id: string;
    category: string;
    description: string;
    image: string;
    price: number;
    rate: number;
    title: string;
    type: string;
  };
}

const ProductItem: NextPage<ProductProps> = ({ product }) => {
  console.log(product);

  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 345 }} className='mx-auto shadowBox'>
      <CardMedia
        component='img'
        height='100'
        image={product.image}
        alt='green iguana'
      />
      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'
          className='truncate'
        >
          {product.title}
        </Typography>
        <Typography variant='h6' component='div'>
          Prices: {product.price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => router.push(`/category/${product.id}`)}
          size='small'
          variant='outlined'
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
