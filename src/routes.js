import React from 'react';
import { Switch, Route} from 'react-router-dom';
import PrivateRoute from "./routes/protectedRoute";

// Lazy load components
const Login = React.lazy(() => import('./pages/auth/login'));
const Logout = React.lazy( () => import('./pages/auth/logout'));
const UnProtectedRoute = React.lazy(() => import("./routes/unProtectedRoute"));

export default (props) => (
  <Route render={({location}) => (
        <Switch location={location}>
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={PrivateRoute} />
          <UnProtectedRoute path="/" component={Login}  />
        </Switch>
  )} />
);

