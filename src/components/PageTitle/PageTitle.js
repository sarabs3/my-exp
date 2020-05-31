import React from 'react';
import {Layout, Row, Col} from "antd";

const PageTitle = ({ children }) => {
  const {Content} = Layout;
  return (
      <Content>
        <Row gutter={10}>
          <Col>
            <h4>{children}</h4>
          </Col>
        </Row>
      </Content>
  );
};

export default PageTitle;
