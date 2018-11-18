import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import {Motion, spring, TransitionMotion} from 'react-motion';
import Stats from './pages/stats/Month';
import SimpleForm from './pages/form';
import Datalist from './dataList';
import Dashboard from './pages/dashboard';

export default (props) => (
  <Switch>
    <Route path="/list" component={Datalist} />
    <Route path="/page" render={()=>(
    <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
      {value => <div>{value.x}</div>}
    </Motion>
    )} />
    <Route path="/stats" component={Stats} />
    <Route path="/form"render={()=> <SimpleForm onSubmit={props.handleSubmit} />} />
    <Route path="/" component={Dashboard}  />
  </Switch>
);

class Demo extends React.Component {
  state = {
    items: [{key: 'a', size: 10},
    {key: 'b', size: 20},
    {key: 'c', size: 30}],
  };
  componentDidMount() {
    this.setState({
      items: [{key: 'a', size: 10}, {key: 'b', size: 20},{key: 'c', size: 30}], // remove c.
    });
  }
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  }
  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <div>
            {interpolatedStyles.map(config => {
              return <div key={config.key} style={{...config.style, border: '1px solid'}} >{config.size}</div>
            })}
          </div>
        }
      </TransitionMotion>
    );
  }
};