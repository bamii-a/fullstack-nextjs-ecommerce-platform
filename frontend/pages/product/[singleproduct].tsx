import React from "react";
import { useQuery } from "urql";
import styled from "styled-components";
import { GET_PRODUCT_QUERY } from "../../utils/query";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../utils/context";

type Props = {
  qty: number;
};
const SingleProduct = () => {
  // state
  const { qty, increaseQty, decreaseQty } = useStateContext();

  // fetch id
  const { query } = useRouter();

  // fetch data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.singleproduct },
  });

  const { data, fetching, error } = results;

  // check for state in data
  if (fetching) return <h1>Loading...</h1>;
  if (error) return <p>404 {error.message}</p>;

  // get data
  const { title, description, image } = data.products.data[0].attributes;

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.small.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy>add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
};

const DetailsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
`;

const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;

  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }

  svg {
    color: #494949;
  }
`;

const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;

export default SingleProduct;
