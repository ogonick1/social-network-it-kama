import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {  useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from './usersSlice';


 const PaginationRounded = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers(props.currentPage));
  }, [dispatch, props.currentPage])

  // let page = [];
  
  // for (let i = 1; i <= props.countPage; i++) {
  //   page.push(i)
  // }
  
  // let portionSize = 10
  
  // let portionCount = Math.ceil(props.countPage / portionSize);
  
  // const [portionNumber, setPortionNumber] = useState(1)
  
  // let leftPortionPageNumber = ((portionNumber - 1) * portionSize + 1);
  
  // let rightPortionPageNumber = (portionNumber * portionSize)

  const handleChange = (event, value) => {
    props.pageClick(value);
  };

  return (
    <div>
      {/* {portionNumber > 1 && <button onClick={()=> setPortionNumber(portionNumber - 1)}>prev</button>}
         {page
      .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
      .map(p => (
      <button key={p} onClick={() => props.pageClick(p)} className={props.currentPage === p ? 'active' : null}>{p}</button>))}
      {portionCount > portionNumber && <button onClick={()=> setPortionNumber(portionNumber +1)}>next</button>} */}
    <Stack spacing={2}>    
      <Pagination onChange={handleChange}   count={Math.ceil(props.countPage)} variant="outlined" shape="rounded" />
    </Stack>
    </div>
  );
}

export default PaginationRounded