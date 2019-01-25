import React from 'react';
import { Card} from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from 'prop-types';
import t from "typy";

const TransectionsDetails = ({data, title}) => (
    data ? (
        <Card
            title={title}
        >
        {data.map(({key, value}) => <p key={key}> {key}: <b>{value}</b></p>)}
        </Card>
    ) : null
);

TransectionsDetails.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string
};

const enhancer = compose(
    firebaseConnect(
        ({match: {params}, uid}) => (
            [
                {
                    path: `data/${uid}/${params.id}`,
                    storeAs: 'transection',
                    queryParams: ['orderByChild=date']
                }
            ]
        )
    ),
    connect(
        ({firebase}) => ({
            data: t(firebase, 'ordered.transection').safeObject,
            title: t(firebase, 'data.transection.title').safeObject
        })
    )
);
const TransectionEnhancer = enhancer(TransectionsDetails);


export default connect(
    ({firebase}) => ({
        uid: firebase.auth.uid
    })
)(TransectionEnhancer);