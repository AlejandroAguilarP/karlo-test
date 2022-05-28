import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css';
import Layout from './layout/Layout';
import AdminLayout from './layout/AdminLayout';
import { getCurrentUser } from './redux/Actions';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import UsersList from './views/users/UserList';
import ProductList from './views/products/productsList';

function PrivateRoute({ children, redirectPath='/login', user}) {
  if(user.user){
    if (Object.values(user.user).length === 0) {
      return <Navigate to={redirectPath} replace />;
    }
  }
  return children ? <AdminLayout>{children} </AdminLayout> : <AdminLayout> <Outlet /></AdminLayout>;
}

function AuthRoute({children, user}) {
  console.log(user)
  if(user.user){
    if(Object.values(user.user).length === 0){
      return children ?  (<Layout> {children} </Layout>) : <Navigate to="/users"  replace/>;
    }
  }
  return <Navigate to="/users"  replace/>

}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
      dispatch(getCurrentUser());
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/login" element={<AuthRoute user={user.user}><Login /></AuthRoute> } />
          <Route path='register' element={<AuthRoute user={user.user}><Register /></AuthRoute> } />
          <Route element={<PrivateRoute user={user.user}/> }>
            <Route path="products" element={ <ProductList />} />
            <Route path="users" element={<UsersList />} />
          </Route>
          <Route
              path="*"
              element={<Navigate to="/login" replace />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
