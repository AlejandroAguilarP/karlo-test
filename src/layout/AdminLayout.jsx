
import { Box, Container } from "@mui/material";
import ResponsiveDrawer from '../components/Aside';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({children}) => {
  return (
    <Container maxWidth="xl" >
      <Box sx={{ height: '100vh' }}>
       <ResponsiveDrawer>
        {children ? children : <Outlet/>}
        </ResponsiveDrawer>
      </Box>
    </Container>
  )
};

export default AdminLayout;