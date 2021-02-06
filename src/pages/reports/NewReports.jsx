import React, {useEffect, useState} from "react";
import {List, Row, Col,Button, Select, Tag, Descriptions} from 'antd';
import PageTitle from "../../components/PageTitle/PageTitle";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {DateInList} from "../../components/dateInList";
import moment from "moment";

const months = [
    {
        id: 1,
        value: "January"
    },{
        id: 2,
        value: "February"
    },{
        id: 3,
        value: "March"
    },{
        id: 4,
        value: "April"
    },{
        id: 5,
        value: "May"
    },{
        id: 6,
        value: "June"
    },{
        id: 7,
        value: "July"
    },{
        id: 8,
        value: "August"
    },{
        id: 9,
        value: "September"
    },{
        id: 10,
        value: "October"
    },{
        id: 11,
        value: "November"
    },{
        id: 12,
        value: "December"
    }
];
const years = [
    {
        id: 1,
        value: "2021"
    },
    {
        id: 2,
        value: "2020"
    },
    {
        id: 3,
        value: "2019"
    },{
        id: 4,
        value: "2018"
    }
];
const NewReports = ({ data, categories, firebase, uid }) => {
    const [form, updateForm] = useState({category: ""});
    const [records, updateRecords] = useState(data || []);
    const handleChange = (name, value) => {
        updateForm({ ...form, [name]: value })
    }
    useEffect(() => {
        updateRecords(data);
    }, [data]);
    const getReportData = () => {
        firebase.ref(`data/${uid}`)
            .orderByChild('category')
            .equalTo(form.category)
            .limitToLast(20)
            .once("value")
            .then(a => {
                const newRecords = [];
                const result = a.val();
                for (let key in result) {
                    newRecords.push({ key, value: result[key] })
                }
                updateRecords(newRecords);
            })
            .catch((e) => console.log('error', e));
    }
    if (!records) return null;
    return (
        <div className="site-layout-content">
            <Row>
                <Col span={12}>
                    <PageTitle>Reports</PageTitle>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <Select value={form.category} onChange={(e) => handleChange("category", e)} name="category" style={{ width: "100%"}} defaultValue="">
                        <Select.Option value="">Select Category</Select.Option>
                        {categories && categories.map((category) => (
                            <Select.Option value={category.key}>{category.value.title}</Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select name="year" style={{ width: "100%"}} defaultValue="">
                        <Select.Option value="">Select Year</Select.Option>
                        {years && years.map((year) => (
                            <Select.Option value={year.id}>{year.value}</Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select name="month" style={{ width: "100%"}} defaultValue="">
                        <Select.Option value="">Select Month</Select.Option>
                        {months && months.map((month) => (
                            <Select.Option value={month.id}>{month.value}</Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={2}>
                    <Button onClick={getReportData} type="primary">Submit</Button>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        header={<h3>{`${records.length} Records`}</h3>}
                        dataSource={records}
                        renderItem={item => {
                            const {value: {title, amount, date, category}} = item;
                            const day = moment(date).format('Do');
                            const month = moment(date).format(' MMM');
                            return (
                                <List.Item
                                    extra={<DateInList date={day} month={month} />}
                                >
                                    <List.Item.Meta
                                        title={<div>
                                            <h4>{title}</h4>
                                            {category && <Tag color="magenta">{category}</Tag>}
                                        </div>}
                                        description={amount}
                                    />
                                </List.Item>
                            )
                        }}
                    />
                </Col>
                <Col span={3}>&nbsp;</Col>
                <Col span={8}>
                    <Descriptions
                        title="Stats"
                        bordered
                        column={1}
                    >
                        <Descriptions.Item label="Total Spend">Rs. {Object.values(records).reduce((t, {value}) => t + parseFloat(value.amount), 0)}</Descriptions.Item>
                        <Descriptions.Item label="Total Transactions"> {records.length}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

const ReportEnhancer =  compose(
    firebaseConnect(props => (
        [
            {
                path: `data/${props.uid}`,
                storeAs: 'data',
                queryParams: [ 'limitToLast=50','orderByChild=category', 'equalTo=living' ]
            },
            {
                path: `Categories/${props.uid}`,
                storeAs: 'Categories'
            }
        ])
    ), connect(({ firebase }) => (
        {
            data: firebase.ordered.data,
            categories: firebase.ordered.Categories
        }
    )))(NewReports);
export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(ReportEnhancer);
