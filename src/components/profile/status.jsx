import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStatus } from './profileSlice';
import  TextField  from '@mui/material/TextField';

const Status = (props) => {


  const [editmode, setEditmode] = useState(false);
  const [localStatus, setLocalStatus] = useState(props.status);

  const onStatusChange = (e) => {
    setLocalStatus(e.currentTarget.value)
  }
  const dispatch = useDispatch()
  const deactivateEditMode = () => {

    setEditmode(false)
    dispatch(setStatus(localStatus))
  }
  return (
    <>
      <div>
        {!editmode ? <span onClick={() => { setEditmode(true) }}>{props.status || 'no_status'}</span> : <TextField id="standard-basic" label="Status" variant="standard" onChange={onStatusChange} autoFocus={true} defaultValue={props.status} onBlur={deactivateEditMode}></TextField>}
      </div>
    </>


  )
};
export default Status;