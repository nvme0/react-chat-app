import React from "react";
import { Grid } from "@material-ui/core";

export interface Props {
  type: "none" | "auth" | "network" | "custom";
  customMessage?: string;
}

const LoginErrors = ({ type, customMessage }: Props) => {
  return (
    <Grid container justify="center">
      <Grid item>
        {type === "auth" && (
          <>
            <p style={{ color: "#E53E3E" }}>Invalid email or password</p>
          </>
        )}
        {type === "network" && (
          <>
            <p style={{ color: "#E53E3E" }}>Unable to connect to server</p>
          </>
        )}
        {type === "custom" && (
          <p style={{ color: "#E53E3E" }}>{customMessage}</p>
        )}
      </Grid>
    </Grid>
  );
};

export default LoginErrors;
