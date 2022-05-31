import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
const Login = () => {
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        };

        localStorage.setItem("user", JSON.stringify(currentUser));

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);

        // ...
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div className='container flex items-center justify-center '>
      <div className='w-[90%] md:w-[500px] bg-white rounded-[10px] p-5 shadowBox'>
        <h1 className='text-[22px] font-bold text-center mb-5'>Sign in</h1>
        <div className='mt-5'>
          <TextField
            id='outlined-basic'
            label='Email'
            fullWidth
            variant='outlined'
          />
        </div>
        <div className='mt-5'>
          <TextField
            id='outlined-basic'
            label='Password'
            fullWidth
            variant='outlined'
          />
        </div>
        <div className='mt-5'>
          <LoadingButton
            size='large'
            endIcon={<SendIcon />}
            loading={false}
            loadingPosition='end'
            variant='outlined'
            fullWidth
          >
            Login
          </LoadingButton>
        </div>
        <div className='mt-5 flex justify-between items-center'>
          <div className='flex items-center'>
            <p className='text-[14px]'>Sign in with</p>
            <div onClick={handleLoginGoogle}>
              <GoogleIcon className='ml-2 cursor-pointer' />
            </div>
            <GitHubIcon className='ml-2 cursor-pointer' />
          </div>
          <Link href={"/register"}>
            <Button variant='outlined' size='small' color='error'>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
