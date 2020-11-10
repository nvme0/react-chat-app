import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

import useStyles from "../components/Login/styles";
import LoginErrors, {
  Props as TLoginErrors
} from "../components/Login/LoginErrors";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, "Email is invalid")
    .max(255, "Too long")
    .email()
    .required("Required"),
  password: yup
    .string()
    .min(7, "Password must be atleast 7 characters")
    .max(255, "Too long")
    .required("Required")
});

interface FormInputState {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginErrors, setLoginErrors] = useState<TLoginErrors>({
    type: "none"
  });

  const handleSubmit = async (
    { email, password }: FormInputState,
    formikHelpers: FormikHelpers<FormInputState>
  ) => {
    try {
      const {
        user: firebaseUser
      } = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (!firebaseUser) throw new Error();

      history.push("/dashboard");
    } catch (e) {
      let message = "Unable to login to account";
      if (e.message) {
        switch (e.code) {
          case "auth/user-not-found":
            message = "The user account does not exist";
            break;
          case "auth/wrong-password":
            message = "The password is invalid";
            break;
          default:
            message = e.message;
            break;
        }
      }
      setLoginErrors({
        type: "custom",
        customMessage: message
      });
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik<FormInputState>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                autoComplete="email"
                type="email"
                helperText={formik.touched.email ? formik.errors.email : ""}
                error={formik.touched.email && Boolean(formik.errors.email)}
                variant="outlined"
                required
                fullWidth
                {...formik.getFieldProps("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                autoComplete="password"
                type="password"
                helperText={
                  formik.touched.password ? formik.errors.password : ""
                }
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                variant="outlined"
                required
                fullWidth
                {...formik.getFieldProps("password")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting}
            style={{
              color: formik.isSubmitting ? "transparent" : undefined
            }}
          >
            Login
            {formik.isSubmitting && (
              <CircularProgress
                style={{ color: "#fff", position: "absolute" }}
                size="1.5rem"
              />
            )}
          </Button>
          <LoginErrors {...loginErrors} />
          <Grid container justify="center">
            <Grid item>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginComponent;
