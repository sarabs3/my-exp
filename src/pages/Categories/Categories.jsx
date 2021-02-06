import React, {useState} from 'react';
import {Col, Row, List, Avatar, Button, Modal} from "antd";
import PageTitle from "../../components/PageTitle/PageTitle";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";

const Categories = ({ categories, history, firebase, uid }) => {
    const [modal, updateModal] = useState(false);
    const [selected, updateSelected] = useState();
    if (!categories) return null;

    const confirmDeleteCategory = (id) => {
        updateSelected(id);
        updateModal(true);
    }
    const deleteCategory = () => {
        updateModal(false);
        firebase.remove(`Categories/${uid}/${selected}`);
    }

    return (
        <div className="site-layout-content">
            <Modal
                title="Delete Category"
                visible={modal}
                onOk={deleteCategory}
                onCancel={() => updateModal(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete?</p>
            </Modal>
            <Row>
                <Col span={12}>

                    <PageTitle>Categories</PageTitle>
                </Col>
                <Col span={4}>
                    <Button type="primary"><Link to="/dashboard/categories/add">Add New</Link></Button>
                </Col>
            </Row>
            <Row>
                <Col span={16}>
                    <List
                        itemLayout="horizontal"
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button
                                        onClick={() => history.push({
                                            pathname: `/dashboard/categories/edit/${item.key}`,
                                            state: {...item.value}
                                        })}
                                        type="link"
                                    >Edit</Button>,
                                <Button
                                    type="link"
                                    onClick={() => confirmDeleteCategory(item.key)}
                                >Delete</Button>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar />}
                                    title={item.value.title}
                                    description={item.value.description}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
};
const LoansEnhancer =  compose(
    firebaseConnect(props => (
        [
            {
                path: `Categories/${props.uid}`,
                storeAs: 'Categories'
            },
        ])
    ), connect(({ firebase }) => (
        {
            categories: firebase.ordered.Categories,
        }
    )))(Categories);
export default connect(({firebase}) => ({
    uid: firebase.auth.uid
}))(LoansEnhancer);
