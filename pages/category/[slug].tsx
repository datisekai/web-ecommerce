import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import { Checkbox, FormControlLabel, Switch } from "@mui/material";
import Navigation from "../../components/Navigation";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
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

const Category: NextPage<ProductProps> = ({ product }) => {
  console.log(product);

  return (
    <div className='container'>
      <Navigation hasEndLink='' />
      <div className='mt-5 md:mt-[50px] flex flex-col md:flex-row items-center justify-center'>
        <img
          src='https://source.unsplash.com/random'
          className='w-[calc(100%-32px)] md:w-[500px] aspect-[4/3] object-cover rounded-[10px] shadowBox'
          alt=''
        />
        <div className='ml-0 md:ml-3 bg-white px-10 py-8 w-[calc(100%-32px)] md:w-auto rounded-[10px] mt-5 md:mt-0'>
          <h1 className='text-[22px] font-bold truncate'>Hollister</h1>
          <h2 className='text-[18px] text-[#666] mt-2'>
            Gray Colorblock Hoodie
          </h2>
          <h1 className='text-[22px] font-bold mt-2'>Price: 2400$</h1>
          <div className='mt-2'>
            <p className='text-[18px] capitalize'>Select size</p>
            <div className='grid grid-cols-2 gap-1'>
              {["X", "M", "L", "XL"].map((size) => (
                <FormControlLabel label={size} control={<Checkbox />} />
              ))}
            </div>
          </div>
          <LoadingButton
            loading={false}
            loadingPosition='start'
            startIcon={<SendIcon />}
            variant='outlined'
            className='mt-5'
          >
            ADD To Cart
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);

  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("id", "==", `${params.slug || "1"}`)
  );
  const resultSnapshots = await getDocs(q);
  let product;
  resultSnapshots.forEach((doc) => {
    product = { ...doc.data(), id: doc.id };
  });
  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const productCollection = collection(db, "products");
  const resultSnapshots = await getDocs(productCollection);
  const dataID: string[] = [];
  resultSnapshots.forEach((doc) => {
    dataID.push(doc.id);
  });

  return {
    paths: dataID.map((id) => ({
      params: {
        slug: id,
      },
    })),
    fallback: "blocking",
  };
};
