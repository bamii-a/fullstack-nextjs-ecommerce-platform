import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../utils/query";
import Products from "../components/products";
import styled from "styled-components";

interface products {
  attributes: {
    description: string;
    image: any;
    price: number;
    slug: string;
    title: string;
    // __typename: string;
  };
}

const Home: NextPage = () => {
  // fetch products from strapi
  const res = useQuery({ query: PRODUCT_QUERY });

  const { data, fetching, error } = res?.[0];

  // check for state in data
  if (fetching) return <h1>Loading...</h1>;
  if (error) return <p>404 {error.message}</p>;

  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>eCommerce Store</title>
        <meta name="description" content="myStore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>next js</h1>
        <Gallery>
          {products?.map((product: products, i: number) => (
            <React.Fragment key={i}>
              <Products {...product.attributes} />
            </React.Fragment>
          ))}
        </Gallery>
      </main>
    </div>
  );
};

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
`;
export default Home;
