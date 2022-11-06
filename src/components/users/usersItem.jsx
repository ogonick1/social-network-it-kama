
import { NavLink } from 'react-router-dom';
import userPhoto from './../header/logo.png';
import { Button } from '@mui/material';

const UsersItem = (props) => {
 
  return(
    <div className="user">
    <NavLink to={'/profile/' + props.id} onClick={() => props.setId(props.id)}><img className="fotos" src={props.photos != null ? props.photos : userPhoto} alt="foto" /></NavLink>

    <div> {props.followed ? <Button variant="outlined" disabled={props.followProgres.includes(props.id)} onClick={() => {
      props.unFollow(props.id)

    }} className="btn-follow">Unfollow</Button> : <Button variant="contained" disabled={props.followProgres.includes(props.id)} onClick={() => {
      props.onFollow(props.id)

    }} className="btn-follow">Follow</Button>}<div className='status'><b>status: </b>{props.status}</div>
     <b>name:</b> {props.name}</div>

  </div>
  )
};

export default UsersItem;