import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  {updateProfile}  from "./profileSlice";
import { useDispatch } from 'react-redux';


const ProfileForm = (props) => {
  const dispatch = useDispatch()
  return (
    <Formik
  
      initialValues={{
        aboutMe: '',
        fullName: '',
        lookingForAJob: true,
        lookingForAJobDescription: '',
       
      }}

      onSubmit={(profileForm) => {dispatch(updateProfile(profileForm));setTimeout(() => {
        props.setEditMode(false);
      }, 1000) }
      }
    >
      <Form className="form">

      <label> aboutMe</label>
        <Field
          placeholder='about me'
          className='field'
          name='aboutMe'
          type='textrea'
        />
        <ErrorMessage className="error" name='aboutMe' component='div' />
      <label> fullName</label>
      
        <Field
          placeholder='fullName'
          className='field'
          name='fullName'
          type='textrea'
        />

        <label className="checkbox">
          <Field
            className='field'
            name='lookingForAJob'
            type='checkbox'
          />
          lookingForAJob
        </label>
        <label > lookingForAJobDescription</label>
        <Field
        
          placeholder='lookingForAJobDescription'
          className='field'
          name='lookingForAJobDescription'
          type='textrea'
        />
        <ErrorMessage className="error" name='lookingForAJobDescription' component='div' />


        <button type="submit" > save</button>

      </Form>
    </Formik>
  )
}

export default ProfileForm