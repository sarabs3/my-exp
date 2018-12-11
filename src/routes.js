import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from './pages/auth/login';
import UnProtectedRoute from "./routes/unProtectedRoute";
import PrivateRoute from "./routes/protectedRoute";

export default (props) => (
  <Route render={({location}) => (
        <Switch location={location}>
          {/* <PrivateRoute path="/list" component={Datalist} />
          <PrivateRoute path="/page" render={()=>(
          <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
            {value => <div>{value.x}</div>}
          </Motion>
          )} />
          <PrivateRoute path="/stats" component={Stats} />
          <PrivateRoute path="/form" component={()=> <SimpleForm onSubmit={props.handleSubmit} />} />
          <PrivateRoute path="/Dashboard" component={Dashboard}  /> */}
          <Route path="/dashboard" component={PrivateRoute} />
          <UnProtectedRoute path="/" component={Login}  />
        </Switch>
  )} />
);

