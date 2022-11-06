
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, followUser, unFollowUser } from './usersSlice';
import { setCurrentPage, } from "./usersSlice";
import { setCurrendId } from "../profile/profileSlice";
import Preloader from "../preloader/preloader";
import './users.scss'
import UsersItem from './usersItem';
import PaginationRounded from './PaginationRounded';


const User = (props) => {

  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.users.currentPage);
  const user = useSelector((state) => state.users.users);
  const followProgres = useSelector((state) => state.users.followProgres);
  const loading = useSelector((state) => state.users.usersLoadingStatus);
  const pageSize = useSelector((state) => state.users.pageSize);
  const countPage = useSelector((state) => state.users.totalUsersCount / pageSize);


  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage])


  const pageClick = (e) => {
    dispatch(setCurrentPage(e))
    dispatch(fetchUsers(e))
  }

  const onFollow = (id) => {
    dispatch(followUser(id))
    dispatch(fetchUsers(currentPage))
  }
  const unFollow = (id) => {
    dispatch(unFollowUser(id))
    dispatch(fetchUsers(currentPage))
  }

  const setId = (id) => {
    dispatch(setCurrendId(id))
  }

  return (
    <>
      {!loading ? <Preloader /> : null}
      <div className="users"> {user.map(item =>
        <UsersItem key={item.id} id={item.id} photos={item.photos.small} followed={item.followed} status={item.status} name={item.name} onFollow={onFollow} unFollow={unFollow} setId={setId} followProgres={followProgres} />
      )}</div>
      {<PaginationRounded pageClick={pageClick} countPage={countPage} pageSize={pageSize} currentPage={currentPage} />}
    </>
  )
}
export default User;