import { Box, Container, Card, CardContent, TextField, Typography, Button} from "@mui/material";
import React from "react";
import loginLogo from '../../assets/img/login.png';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {  getRegister } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email('Ingrese un email valido').required('Ingrese su email'),
  password: yup.string().required('Ingrese su password'),
  user_name: yup.string().required('Ingrese su nombre'),
  confirmPassword: yup.lazy((value) => {
      return yup.string().when('password', (password, schema) => {
        return schema.test({
                test: (confirmPassword) => confirmPassword === password,
                message: 'Deben coincidir las passwords'
            })
    })
})}).required();


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { handleSubmit, control, formState:{ errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      user_name: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    dispatch(getRegister(data));
    if(typeof user.errors !== 'undefined') {
      alert((Object.values(user.errors.at(-1)).toString()))
    }else{
      navigate('/login')
    }
  };
  return (
    <Container maxWidth="lg" >
      <Box display="flex" justifyContent="center" alignItems={'center'} sx={{ height: '100vh', minHeight: '600px' }}>
        <Card width="lg" elevation={10}>
          <CardContent>
              <Box display="flex" justifyContent="center" alignItems={'center'} width="30%" mx={'auto'}>
                  <img className="img-fluid" src={loginLogo} alt="login" />
              </Box>
              <Box px={6} my={5}>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="user_name"
                    control={control}
                    render={({ field }) => <TextField label="Nombre Completo" margin="normal" fullWidth {...field}  />}
                  />
                  <Typography variant="body2" color="red">
                    {(errors.user_name) && errors.user_name.message}
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField label="Correo" margin="normal" fullWidth {...field}  />}
                  />
                  <Typography variant="body2" color="red">
                    {(errors.email) && errors.email.message}
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField type="password" label="Password" margin="normal" fullWidth {...field}  />}
                  />
                  <Typography variant="body2" color="red">
                    {(errors.password) && errors.password.message}
                  </Typography>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <TextField type="password" label="Confirmar password" margin="normal" fullWidth {...field}  />}
                  />
                  <Typography variant="body2" color="red">
                    {(errors.confirmPassword) && errors.confirmPassword.message}
                  </Typography>
                  <Box display={'flex'} justifyContent="center" my={2} >
                    <Button variant="outlined" color="primary" type="submit">
                        Crear Cuenta
                    </Button>
                  </Box>
                  <Box display={'flex'} justifyContent="center" my={2} >
                    <Button onClick={()=> navigate('/')} variant="outlined" color="secondary" type="submit">
                        Iniciar Sesion
                    </Button>
                  </Box>
                </form>
              </Box>
            </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
