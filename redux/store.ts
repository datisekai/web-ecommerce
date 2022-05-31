import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer';

const store = configureStore({
    reducer:{
        auth:AuthReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;