import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import swal from 'sweetalert';
import { db } from '../firebase';


interface AuthState {
    loading:boolean,
    user:any
}

interface userState {
    email:string,
    password:string
}

const initialState:AuthState = {
    loading:false,
    user:undefined
}

export const register = createAsyncThunk('auth/register',async(user:any) => {
    const dbCollection = collection(db, "users")
    const q = query(dbCollection,where('email','==',user.email))
    const querySnapshot = await getDocs(q);
    const users:userState[] = []
    querySnapshot.forEach((doc) => {
      const user:userState = doc.data() as userState;
      users.push(user);   
    });
    
    if(users.length === 0)
    {
        const docRef = await addDoc(dbCollection, {
           email:user.email,
           password:user.password 
          });
          console.log("Document written with ID: ", docRef.id);
          return docRef;
    }
    
    return null;
})

const AuthSlide = createSlice({
    name:'auth',
    initialState,
    reducers:{
        getUser:(state) => {
            state.user = JSON.parse(localStorage.getItem('user') || '') || undefined
        }
    },
    extraReducers:builder => {
        builder.addCase(register.pending,state => {
            state.loading = true;
        })
        builder.addCase(register.fulfilled,(state, action) => {
            if(action.payload === null)
            {
                swal('Email is already');
                state.loading = false;
                return;
            }
            state.loading = false;
            state.user = action.payload;
            swal('Register successfull')
        })
        builder.addCase(register.rejected,(state) => {
            state.loading = false;
            swal('Internal server')
        })
    }
})
export const {getUser} = AuthSlide.actions

export default AuthSlide.reducer