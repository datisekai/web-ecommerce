import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/AuthReducer";
import { AppDispatch } from "../redux/store";

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className='flex flex-col container items-center justify-center h-full'>
      <h1 className='text-[22px] md:text-[40px] font-bold uppercase'>
        Welcome to Dshop
      </h1>
      <h2 className='text-[16px] md:text-[20px] mt-3'>Do you like shopping?</h2>
      <div className='mt-3'>
        <Link href={"/category"}>
          <Button variant='outlined' color='primary' size='large'>
            Go to shop
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
