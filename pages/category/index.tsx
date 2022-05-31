import React from "react";
import Navigation from "../../components/Navigation";
import ListCategory from "../../components/Category";
import ProductItem from "../../components/ProductItem";
import { Pagination } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

interface CategoryProps {
  categories: onlyCategoryState[];
  products: onlyProductState[];
}

interface onlyCategoryState {
  id: string;
  name: string;
}

interface onlyProductState {
  id: string;
  category: string;
  description: string;
  image: string;
  priceS: number;
  rate: number;
  title: string;
  type: string;
}

const Category: NextPage<CategoryProps> = ({ categories, products }) => {
  return (
    <div className='container'>
      <Navigation hasEndLink='' />
      <div className='flex flex-col md:flex-row justify-between max-w-[1200px] mx-auto'>
        <div className='w-full md:w-[20%] p-3'>
          <h1 className='text-[18px] font-medium mt-5 mb-2'>Category</h1>
          <ListCategory categories={categories} />
        </div>
        <div className='w-full md:w-[80%] p-3  ml-0 md:ml-2'>
          <div className='flex items-center justify-between  mt-5 mb-2'>
            <h1 className='text-[18px] font-medium'>Products</h1>
            <Pagination count={10} variant='outlined' shape='rounded' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {products.map((product) => (
              <ProductItem product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async () => {
  const cateCollection = collection(db, "types");
  const resultSnapshots = await getDocs(cateCollection);
  const categories: onlyCategoryState[] = [];
  resultSnapshots.forEach((doc) => {
    const category: onlyCategoryState = doc.data() as onlyCategoryState;
    categories.push(category);
  });

  const productCollection = collection(db, "products");
  const resultProducts = await getDocs(productCollection);
  const products: onlyProductState[] = [];
  resultProducts.forEach((doc) => {
    const product: onlyProductState = {
      ...doc.data(),
      id: doc.id,
    } as onlyProductState;
    products.push(product);
  });

  return {
    props: { categories, products },
    revalidate: 60,
  };
};
