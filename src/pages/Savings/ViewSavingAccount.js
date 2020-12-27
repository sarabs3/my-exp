import React, {useEffect} from 'react';
import {Col, Row, Descriptions} from "antd";
import moment from 'moment';
import PageTitle from "../../components/PageTitle/PageTitle";
import Tile from "../../components/Tile/Tile";
import {formatMoney} from "../../utils/priceFormatting";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";

const ViewSaving = ({ savings, mySavings }) => {
  useEffect(() => {
    // firebase.push(`savingAccounts/${uid}`, { name: 'kmeti 1 - 1,50,000', duration: 10 });
  }, []);
  if (!savings || !mySavings) return null;
  const myTotalSavings = mySavings.map(k => parseInt(k.value.amount)).reduce((a,b) => a+b);
  console.log(myTotalSavings, myTotalSavings);
  const amount = savings.emi * savings.duration;
  const remainingEmis = moment().diff(savings.startDate, 'months') + 1;
  return (
      <div>
        <PageTitle>Savings</PageTitle>
        <Row>
          <Col className="gutter-row" xs={24} sm={24} md={8} lg={8}>
            <Tile>
              <div>
                <Descriptions
                    title={savings.name}
                    bordered
                    column={1}
                >
                  <Descriptions.Item label="Start Date">{moment(savings.startDate).format('DD MM YYYY')}</Descriptions.Item>
                  <Descriptions.Item label="End Date">{moment(savings.endDate).format('DD MM YYYY')}</Descriptions.Item>
                  <Descriptions.Item label="Amount"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(amount)}</Descriptions.Item>
                  <Descriptions.Item label="Total Paid"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(myTotalSavings)}</Descriptions.Item>
                  <Descriptions.Item label="Expected Pay"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(savings.emi * remainingEmis )}</Descriptions.Item>
                  <Descriptions.Item label="Duration">{remainingEmis} / {savings.duration}</Descriptions.Item>
                  <Descriptions.Item label="EMI">{formatMoney(savings.emi)}</Descriptions.Item>
                </Descriptions>
              </div>
            </Tile>
          </Col>
        </Row>
      </div>
  );
};
const SavingsEnhancer =  compose(
    firebaseConnect(props => {
      console.log('props', props.match.params.id);
      return (
        [
          {
            path: `savingAccounts/${props.uid}/${props.match.params.id}`,
            storeAs: 'savingAccounts'
          },
          {
            path: `savings/${props.uid}`,
            queryParams: ['orderByChild=accountId', `equalTo=${props.match.params.id}`],
            storeAs: 'mySavings'
          },
        ])}
    ), connect(({ firebase }) => (
        {
          savings: firebase.data.savingAccounts,
          mySavings: firebase.ordered.mySavings,
        }
    )))(ViewSaving);
export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(SavingsEnhancer);
