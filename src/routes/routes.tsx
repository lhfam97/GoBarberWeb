import React, { Component } from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}
//Rota privada e usuario autenticado => OK
//Rota privada e usuario nao autenticado => Redirecionar ele pro login
//Rota nao ser privada e ele estar autenticado => Redirecionar para o Dashboard
//Rota nao ser privada e usuario nao autenticado => OK

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
