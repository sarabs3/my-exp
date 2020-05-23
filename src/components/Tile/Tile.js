import React from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  tile: (theme) => ({
    borderRadius: 25,
    background: 'white',
    boxShadow: "0 0 30px -12px rgba(0, 0, 0, 0.2)",
    minHeight: 200,
    padding: '40px 20px',
    margin: 16,
    fontSize: 32,
    fontFamily: "'Raleway', sans-serif",
    ...theme,
  }),
});

const Tile = ({ children, customStyle }) => {
  const classes = styles(customStyle);
  return (
      <div className={classes.tile}>
        {children}
      </div>
  );
};

export default Tile;
