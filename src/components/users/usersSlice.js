import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from './../../axios/axios';


const initialState = {
  users: [],
  usersLoadingStatus: true,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  followProgres: [],
}

export const followUser = createAsyncThunk(
  'users/followUser',
 async (id) => {
   await instance.post(`follow/${id}`)
    .then(function(response) {
      if (response.data.resultCode === 0) {
        return id
      }
    })
    return id
  }
)
export const unFollowUser = createAsyncThunk(
  'users/unFollowUser',
 async (id) => {
   await instance.delete(`follow/${id}`)
    .then(function(response) {
      if (response.data.resultCode === 0) {
        return id
      }
    })
    return id
  }
)

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (num) => {
    const data = await instance.get(`users?page=${num}&count=${initialState.pageSize}`)
      .then(function (response) {
        // обработка успешного запроса
        return response
      })
    return data.data
  }
);

export const userSlise = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersCreated: (state, action) => {
      state.users.push(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
 
    follow: (state, action) => {
      state.users.map(i => {
        if (i.id === action.payload.id) {
          i.followed = !i.followed
        }
        return i
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, state => { state.usersLoadingStatus = false })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoadingStatus = true;
        state.users = [...action.payload.items];
        state.totalUsersCount = action.payload.totalCount;
      })
      .addCase(fetchUsers.rejected, state => {
        state.usersLoadingStatus = 'error';
      })
      .addCase(followUser.pending, (state,action) => { 
        state.followProgres.push(action.meta.arg) })
      .addCase(followUser.fulfilled, (state, action) =>{
        state.users.map(i => {
          if (i.id === action.payload.id) {
            i.followed = !i.followed
          }
          return i
        })
        state.followProgres.pop()
        
      })
      .addCase(unFollowUser.pending, (state, action) => { 
         state.followProgres.push(action.meta.arg)})
      .addCase(unFollowUser.fulfilled, (state, action) =>{
        state.users.map(i => {
          if (i.id === action.payload.id) {
            i.followed = !i.followed
          }
          return i
        })
        state.followProgres.pop()
        
      })
      .addDefaultCase(() => { })
  }

}
);

const { actions, reducer } = userSlise;



export default reducer;

export const {
  usersCreated,
  setCurrentPage,
  follow
} = actions;
