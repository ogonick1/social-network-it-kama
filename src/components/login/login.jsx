
import LoginForm from './loginForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Login = () => {
  const authMe = useSelector((state) => state.profile.login)
  
  let navigate = useNavigate();
  
  useEffect(() => {
     if (authMe) {
        return navigate("/profile");
     }
  },[authMe, navigate])
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default Login;