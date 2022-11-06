import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from './../../axios/axios';

const initialState = {

  usersLoadingStatus: true,
  currentId: 25606,
  profileInfo: null,
  authInfo: null,
  status: null,
  login: false,
  photos: '',
}
export const setAuthInfo = createAsyncThunk(
  'profile/setAuthInfo',
  async () => {
    const data = await instance.get('auth/me')
    .then(response => { if (response.data.resultCode === 0 ){
      return response
    }

    } )
    return data.data
  }
)
export const savePhoto = createAsyncThunk(
  'profile/savePhoto',
  async (file) => {
    const formData = new FormData();
    formData.append('image', file)
    const data = await instance.put('profile/photo', formData, {
      headers:{
        'Content-type': 'multipart/form-data'
      }
    })
    .then(response => { if (response.data.resultCode === 0 ){
      return response.data
    }

    } )
    return data.data.photos.large
  }
  
)
export const login = createAsyncThunk(
  'profile/login',
  async ({email, password, rememberMe}) => {
 const data = await instance.post('auth/login', {email, password, rememberMe})
    .then(response => { if (response.data.resultCode === 0 ){
    return response.data
      
    }

    } )
    return data.data.userId
  }
  
)
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileForm) => {
 const data = await instance.put('profile', profileForm)
    .then(response => { if (response.data.resultCode === 0 ){
    return response.data.resultCode
      
    }

    } )
    return data
  }
  
)

export const logOut = createAsyncThunk(
  'profile/logOut',
  async () => {
    await instance.delete('auth/login')
    .then(response => {if (response.data.resultCode ===0) {
      return console.log('logout')
    }})
  }
)

export const getStatus = createAsyncThunk(
  'profile/getStatus',
  async (profileId ) => {
    const data = await instance.get(`profile/status/${profileId}`)
      .then(function(response) {
        return response
      })
    return data.data
  }
  
)
export const setStatus = createAsyncThunk(
  'profile/setStatus',
  async (status) => {
    const data = await instance.put('profile/status', {status})
      .then(function(response) { if (response.data.resultCode === 0 ){
        return response
      }
  
      })
    return data.data
  }
  
)

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (id) => {
    const data = await instance.get(`profile/${id}`)
      .then(function (response) {
        // обработка успешного запроса
        return response
      })
    return data.data
  }
);

export const profileSlise = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCurrendId: (state, action) => {
      state.currentId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, state => { state.usersLoadingStatus = false })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.usersLoadingStatus = true;
        state.profileInfo = action.payload;
      })
      .addCase(fetchProfile.rejected, state => {
        state.usersLoadingStatus = 'error';
      })
      .addCase(setAuthInfo.fulfilled, (state, action) => {
        
          state.authInfo = action.payload.data
      })
      .addCase(getStatus.fulfilled, (state, action)=> {
        state.status = action.payload
      })
      .addCase(setStatus.fulfilled, (state, action)=> {
        state.status = action.meta.arg
      })
      .addCase(savePhoto.fulfilled, (state, action)=> {
        state.photos = action.payload
      })
      .addCase(login.fulfilled, (state)=> {
        state.login = true
      })

      .addCase(logOut.fulfilled, state => {
        state.login = false
      })
      .addDefaultCase(() => { })
  }

}
);

const { actions, reducer } = profileSlise;



export default reducer;

export const {
  setCurrendId,
  setProfileInfo,
} = actions;
