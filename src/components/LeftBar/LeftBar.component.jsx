import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import {Snapshot} from '../snapshot';
import SpentWidget from '../../pages/dashboard/components/spentWidget';

const filterData = data => data.length ? data.filter(item => moment().isSame(item.value.date, 'day')) : [];

const Leftbar = (props) => (
    <Row>
        <Col span={24}>
            <Link to="/dashboard/add/income">
                <Button>Add Income</Button>
            </Link>
            <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                <Snapshot
                    title='Today Snapshot'
                    type='today'
                    data={props.data ? filterData(props.data) : []}
                    icon
                />
            </React.Suspense>
        </Col>
        <Col span={24}>
            <React.Suspense fallback={<p>waiting for lazy componenets...</p>}>
                <SpentWidget categories={props.Categories} />
            </React.Suspense>
        </Col>
    </Row>
);

export default Leftbar;
