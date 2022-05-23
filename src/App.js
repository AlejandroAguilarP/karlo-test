import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from './layout/Layout';
import { getCurrentUser } from './redux/Actions';
import Login from './views/auth/Login';
import Dashboard from './views/Dashboard';

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user);
  return user.user.isLoggedIn ? children : <Navigate to="/" />;
}

function AuthRoute({children}) {
  const user = useSelector((state) => state.user);
  return (!user.user.isLoggedIn) ? children : <Navigate to="/admin" />;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getCurrentUser());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute><Layout /></AuthRoute> }>
          <Route index element={<AuthRoute><Login /></AuthRoute> } />
        </Route>
        <Route path="/admin" element={<PrivateRoute> <Layout /> </PrivateRoute>}>
          <Route index element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
