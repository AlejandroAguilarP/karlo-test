
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = ({children}) => {
  return (
    <Container maxWidth="lg" >
      <Box sx={{ height: '100vh' }}>
          {children ? children : <Outlet/>}
      </Box>
    </Container>
  )
};

export default Layout;