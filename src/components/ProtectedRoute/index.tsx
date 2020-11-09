import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";
import { User } from "../../hooks/useAuth";

export interface Props extends RouteProps {
  user: User | null;
  component:
    | React.ComponentType<RouteComponentProps<any> & { user: User }>
    | React.ComponentType<any>;
}

const ProtectRoute = ({ user, component: Component, ...props }: Props) => {
  if (!Component) return null;
  return !!user ? (
    <Route
      {...props}
      render={(renderProps) => <Component {...renderProps} user={user} />}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectRoute;
