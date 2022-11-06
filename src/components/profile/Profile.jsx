import React from "react";
import { useState } from "react";
import './Profile'
import ProfileForm from './profileForm';
import ProfileData from './profileData';

const Profile = () => {

  const [editMode, setEditMode] = useState(false)

  return (
    editMode ? <ProfileForm setEditMode={setEditMode} /> : <ProfileData setEditMode={setEditMode} />

  )
}

export default Profile;