import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from './pages/auth/login';
import Logout from './pages/auth/logout';
import UnProtectedRoute from "./routes/unProtectedRoute";
import PrivateRoute from "./routes/protectedRoute";

export default (props) => (
  <Route render={({location}) => (
        <Switch location={location}>
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={PrivateRoute} />
          <UnProtectedRoute path="/" component={Login}  />
        </Switch>
  )} />
);

