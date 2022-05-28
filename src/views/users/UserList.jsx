import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFn } from '../../redux/Actions/UsersActions';
import UserForm from '../../redux/Components/UserForm';
import { Box, Button } from '@mui/material';

const columns = [
  { field: 'user_id', headerName: 'ID', width: 200 },
  { field: 'user_name', headerName: 'Nombre', width: 250 },
  { field: 'user_email', headerName: 'Correo', width: 300 },
];


export default function UsersList() {
   const dispatch = useDispatch();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setUserEditor(null);setOpen(true);};
   const users = useSelector((state) => state.users);
   const [userEditor, setUserEditor] = React.useState()

   const handleClickUser = React.useCallback((data) => {
     setUserEditor(data)
     setOpen(true)
   })
   React.useEffect(() => {
      dispatch(getUsersFn());
   }, []);
  return (
    <>
      <div style={{ height: '500px', width: '100%' }}>
        <DataGrid
          rows={users.users}
          columns={columns}
          pageSize={10}
          getRowId={(row) =>  row.user_id}
          rowsPerPageOptions={[3]}
          onCellClick={({row}) => handleClickUser(row)}
        />
      </div>
      <Box className="button-add" onClick={handleOpen} color="primary" bgcolor="primary.main"  >
        +
      </Box>
      <UserForm userEditor={userEditor} setOpen={setOpen} open={open}/>
    </>
  );
}