import React from 'react';
import Loader from 'react-loader-spinner';
import { Row, Col } from "antd";
import PropTypes from 'prop-types';

const LoaderComponent = ({color, type}) => (
   <Row type="flex" justify="center" align="middle" style={{height: '100vh'}}>
      <Col >
      <Loader
         type={type}
         color={color}
         height="100"
         width="100"
      />
      </Col>
   </Row>
);

LoaderComponent.propTypes = {
   color: PropTypes.string,
   type: PropTypes.string
}

LoaderComponent.defaultProps = {
   color: '#00BFFF',
   type: 'TailSpin'
}

export default LoaderComponent;