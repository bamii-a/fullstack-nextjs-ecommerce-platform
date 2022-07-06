import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

interface products {
  attributes: {
    description: string;
    image: any;
    price: number;
    slug: string;
    title: string;
  };
}

const products: React.FC<products["attributes"]> = ({
  image,
  title,
  price,
  slug,
  description,
}) => {
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt={title} />
        </div>
      </Link>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyle>
  );
};

export default products;

const ProductStyle = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  h2 {
    padding: 0.5rem 0;
  }
`;
