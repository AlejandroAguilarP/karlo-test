import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { createUserFn, deleteUserFn,updateUserFn } from "../Actions/UsersActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserForm(props) {
  const setOpen = props.setOpen;
  console.log(props);
  const handleClose = () => setOpen(false);
  const [schemaValue, setschemaValue] = React.useState(0);
  const dispatch = useDispatch();
  const schema = [
    yup
      .object({
        user_email: yup
          .string()
          .email("Ingrese un email valido")
          .required("Ingrese su email"),
        password: yup.string().required("Ingrese su password"),
        user_name: yup.string().required("Ingrese su nombre"),
        confirmPassword: yup.lazy((value) => {
          return yup.string().when("password", (password, schema) => {
            return schema.test({
              test: (confirmPassword) => confirmPassword === password,
              message: "Deben coincidir las passwords",
            });
          });
        }),
      })
      .required(),
    yup
      .object({
        user_email: yup
          .string()
          .email("Ingrese un email valido")
          .required("Ingrese su email"),
        user_name: yup.string().required("Ingrese su nombre"),
      })
      .required(),
  ];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_email: "",
      user_name: "",
      confirmPassword: "",
      user_name: "",
    },
    resolver: yupResolver(schema[schemaValue]),
  });

  React.useEffect(() => {
    if (props.userEditor) {
      reset(props.userEditor);
      setschemaValue(1);
    } else {
      reset({
        user_email: "",
        password: "",
        confirmPassword: "",
        user_name: "",
      });
      setschemaValue(0)
    }
  }, [props.userEditor]);

  const onSubmit = (data) => {
    if (!props.userEditor) {
      
      dispatch(createUserFn(data)).then((r) => {
        if (r.error) {
          alert(r.error);
        } else {
          alert("Guardado exitosamente");
          reset({
            user_email: "",
            password: "",
            confirmPassword: "",
            user_name: "",
          });
          handleClose();
        }
      });
    } else {
      data = {...data, user_id: props.userEditor.user_id}
      dispatch(updateUserFn(data)).then((r) => {
        if (r.error) {
          alert(r.error);
        } else {
          alert("Actualizado exitosamente");
          reset({
            user_email: "",
            password: "",
            confirmPassword: "",
            user_name: "",
          });
          handleClose();
        }
      });
    }
  };

  const deleteUser = (user_id) =>{
    if(props.userEditor){
      dispatch(deleteUserFn(user_id))
      .then((r) => {
        if(r.error){
          alert(r.error)
        }else{
          alert('Eliminado satisfactoriamente')
          reset({
            user_email: "",
            password: "",
            confirmPassword: "",
            user_name: "",
          });
          handleClose();
        }
      })
    }
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box px={1} my={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="user_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Nombre Completo"
                    margin="normal"
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Typography variant="body2" color="red">
                {errors.user_name && errors.user_name.message}
              </Typography>
              <Controller
                name="user_email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Correo"
                    margin="normal"
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Typography variant="body2" color="red">
                {errors.user_email && errors.user_email.message}
              </Typography>
              {!props.userEditor && (
                <>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                  <Typography variant="body2" color="red">
                    {errors.password && errors.password.message}
                  </Typography>
                </>
              )}
              {!props.userEditor && (
                <>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        type="password"
                        label="Confirmar password"
                        margin="normal"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                  <Typography variant="body2" color="red">
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </Typography>
                </>
              )}
              {!props.userEditor && (
                <Box display={"flex"} justifyContent="center" my={2}>
                  <Button variant="outlined" color="primary" type="submit">
                    Crear Usuario
                  </Button>
                </Box>
              )}
              {props.userEditor && (
                <Box display={"flex"} justifyContent="space-between" my={2}>
                  <Button variant="outlined" color="primary" type="submit">
                    Actualizar
                  </Button>{" "}
                  <Button
                    mx={2}
                    variant="outlined"
                    color="secondary"
                    onClick={()=>deleteUser(props.userEditor.user_id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
