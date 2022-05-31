import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { register } from "../redux/AuthReducer";
import { AppDispatch, RootState } from "../redux/store";

interface MyFormValues {
  email: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Must be format email"),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be more than 6 character"),
      confirm: Yup.string()
        .required("Required")
        .min(6, "Must be more than 6 character")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
      if (user) {
        localStorage.setItem("user", JSON.parse(user));
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div className='container flex items-center justify-center '>
      <div className='w-[90%] md:w-[500px] bg-white rounded-[10px] p-5 shadowBox'>
        <h1 className='text-[22px] font-bold text-center mb-5'>Sign in</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='mt-5'>
            <TextField
              id='outlined-basic'
              label='Email'
              fullWidth
              variant='outlined'
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className='text-red-400 text-[14px]'>
              {formik.errors.email &&
                formik.touched.email &&
                formik.errors.email}
            </p>
          </div>
          <div className='mt-5'>
            <TextField
              id='outlined-basic'
              label='Password'
              fullWidth
              variant='outlined'
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className='text-red-400 text-[14px]'>
              {formik.errors.password &&
                formik.touched.password &&
                formik.errors.password}
            </p>
          </div>
          <div className='mt-5'>
            <TextField
              id='outlined-basic'
              label='Confirm'
              fullWidth
              variant='outlined'
              name='confirm'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className='text-red-400 text-[14px]'>
              {formik.errors.confirm &&
                formik.touched.confirm &&
                formik.errors.confirm}
            </p>
          </div>
          <div className='mt-5'>
            <LoadingButton
              size='large'
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition='end'
              variant='outlined'
              fullWidth={true}
              type='submit'
            >
              Register
            </LoadingButton>
          </div>
        </form>
        <div className='mt-5 flex justify-between items-center'>
          <p className='text-[14px]'>Do you already have an account?</p>
          <Link href={"/login"}>
            <Button variant='outlined' size='small' color='error'>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
