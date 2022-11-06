import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProfile, getStatus, savePhoto, setCurrendId } from './profileSlice';
import Preloader from './../preloader/preloader';
import Status from './status';
import Contact from './contact';
import { Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './Profile.scss';

const ProfileData = (props) => {

  const dispatch = useDispatch()
  const profileId = useSelector((state) => state.profile.currentId)
  const profile = useSelector((state) => state.profile.profileInfo)
  const status = useSelector((state) => state.profile.status)
  const authMe = useSelector((state) => state.profile.authInfo)

  useEffect(() => {
    dispatch(fetchProfile(profileId))
    dispatch(getStatus(profileId))

  }, [dispatch, profileId])


  if (!profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }
  return (
    <div>
      <div><img className='profilefoto' src={profile.photos.large} alt="foto" /></div>

      <Button variant="text" onClick={() => {
        dispatch(fetchProfile(authMe.id));
        dispatch(setCurrendId(authMe.id));
      }}>me</Button>
{authMe ? authMe.id === profileId &&
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden onChange={onMainPhotoSelected} accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>: null}
{authMe ? authMe.id === profileId && <Button variant="text" onClick={() => props.setEditMode(true)}>edit</Button> : null }      
      
      <Status status={status} />

      <div>{profile.UserId}</div>
      <div><b>about me: </b>{profile.aboutMe}</div>
      <div><b>loking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob && <div> <b> my skill: </b> {profile.lookingForAJobDescription}</div>}

      <div><b>name: </b>{profile.fullName}</div>
      <div><b> contacts: </b> {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}</div>

    </div>
  )
}

export default ProfileData;