
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container maxWidth="lg" >
      <Box sx={{ height: '100vh' }}>
        <Outlet />
      </Box>
    </Container>
  )
};

export default Layout;