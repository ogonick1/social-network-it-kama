import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "12892cd8-0ca6-4d61-baa2-3db7e76b32e9"
  }
});

const  getUsers = async() => {

 const data = await instance.get('users')
    .then(function (response) {
      // обработка успешного запроса
      return response
    })
    .catch(function (error) {
      // обработка ошибки
      console.log(error);
    })
  return data.data.items
}

export default getUsers;