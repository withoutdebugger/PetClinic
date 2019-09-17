import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "./auth/providers/authProvider";

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = Component => props => (
    <AuthConsumer>
      {({ isAuthenticated, signinRedirect }) => {
        if (Component && !isAuthenticated()) {
          signinRedirect();
          return <span>Cargando...</span>;
        } else {
          return <Component {...props} />;

        }
      }}
    </AuthConsumer>
  );

  return <Route {...rest} render={renderFn(component)} />;
};
