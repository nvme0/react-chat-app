import React, { useState } from "react";
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
  firstName: yup.string().max(255, "Too long").required("Required"),
  lastName: yup.string().max(255, "Too long").required("Required"),
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginErrors, setLoginErrors] = useState<TLoginErrors>({
    type: "none"
  });

  const handleSubmit = async (
    { email, password, firstName, lastName }: FormInputState,
    formikHelpers: FormikHelpers<FormInputState>
  ) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!user) throw new Error();

      await firebase.firestore().collection("users").doc(email).set({
        firstName,
        lastName
      });
      history.push("/dashboard");
    } catch (e) {
      setLoginErrors({
        type: "custom",
        customMessage: e.message ? e.message : "Unable to create account"
      });
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik<FormInputState>({
    initialValues: {
      firstName: "",
      lastName: "",
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
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="First Name"
                helperText={
                  formik.touched.firstName ? formik.errors.firstName : ""
                }
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                variant="outlined"
                required
                fullWidth
                {...formik.getFieldProps("firstName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                helperText={
                  formik.touched.lastName ? formik.errors.lastName : ""
                }
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                variant="outlined"
                required
                fullWidth
                {...formik.getFieldProps("lastName")}
              />
            </Grid>
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
            Sign Up
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
              Already have an account? <Link to="/login">Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterComponent;
