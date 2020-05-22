import React from 'react';
import {createUseStyles} from "react-jss";
import { Button } from 'antd';

const styles = createUseStyles({
  button: {
    marginTop: '16px !important',
    fontSize: '20px !important',
    paddingTop: '20px !important',
    paddingBottom: '20px !important',
    height: 'auto !important',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    background: '#2C74FC',
    color: 'white',
  },
});

const LargeButton = ({ onClick, children }) => {
  const classes = styles();
  return (
      <Button className={classes.button} shape="round" size="large" type="type" block onClick={onClick}>{children}</Button>
  );
};

export default LargeButton;
