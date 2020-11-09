import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import DashboardComponent from "./Dashboard";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";
import theme from "./theme";
import useAuth from "./hooks/useAuth";
import ProtectRoute from "./components/ProtectedRoute";

const App = () => {
  const { isLoading, user } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isLoading && (
        <Router>
          <Switch>
            <Route path="/login" component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <ProtectRoute
              user={user}
              path="/dashboard"
              component={DashboardComponent}
            />
          </Switch>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
