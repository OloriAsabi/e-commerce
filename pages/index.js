import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';

function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
 
  const { loading, error, products } = state;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const products = await client.fetch(`*[_type == "product"]`);
      console.log("Products:", products)
      setState({ products, loading: false });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
    };
  fetchData();
   }, []);
  return (
    <Layout>
    {loading ? (
      <CircularProgress />
    ) : error ? (
      <Alert variant="danger">{error}</Alert>
    ) : (
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} key={product.slug}>
            <Typography>{product.name}</Typography>
            <ProductItem
              product={product}
              // addToCartHandler={addToCartHandler}
            ></ProductItem>
          </Grid>
        ))}
      </Grid>
    )}
  </Layout>
  )
}

export default Home