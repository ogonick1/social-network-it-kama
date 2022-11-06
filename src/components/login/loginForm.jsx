import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './loginForm.scss'
import { login } from "../profile/profileSlice";
import { useDispatch } from 'react-redux';


const LoginForm = () => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Please enter your email address in format yourname@example.com ')
          .required('required'),
        password: Yup.string()
          .min(6, 'min 6 sumbols')
      })}
      onSubmit={({email, password, rememberMe}) => dispatch(login({email, password, rememberMe}))}
    >
      <Form className="form">
        <h2>Login</h2>
        <label htmlFor="email"> write your email address</label>
        <Field
          className='field'
          name='email'
          type='email'
        />
        <ErrorMessage className="error" name='email' component='div' />
        <label htmlFor="password"> write your password</label>
        <Field 
          className='field'
          name='password'
          type='password'
        />
        <ErrorMessage className="error" name='password' component='div' />
      <label className="checkbox">
      <Field
        className='field'
          name='rememberMe'
          type='checkbox'
        />
         Remember Me
      </label>

      <button type='submit'> Log in</button>

      </Form>
    </Formik>
  )
}

export default LoginForm