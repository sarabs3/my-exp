import React, {useEffect} from 'react';
import {Col, Row, Descriptions, Button} from "antd";
import moment from 'moment';
import PageTitle from "../../components/PageTitle/PageTitle";
import Tile from "../../components/Tile/Tile";
import {formatMoney} from "../../utils/priceFormatting";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";

const ViewSaving = ({ savings, firebase, uid, mySavings }) => {
  useEffect(() => {
    // firebase.push(`savingAccounts/${uid}`, { name: 'kmeti 1 - 1,50,000', duration: 10 });
  }, []);
  if (!savings || !mySavings) return null;
  const myTotalSavings = mySavings.map(k => parseInt(k.value.amount)).reduce((a,b) => a+b);
  console.log(myTotalSavings, myTotalSavings);
  return (
      <div>
        <PageTitle>Savings</PageTitle>
        <Row>
          {savings && savings.map(k => {
            const amount = k.value.emi * k.value.duration;
            const remainingEmis = moment().diff(k.value.startDate, 'months') + 1;
            return (
                <Col id={k.key} className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                  <Tile>
                    <div>
                      <Descriptions
                          title={k.value.name}
                          bordered
                          column={1}
                      >
                        <Descriptions.Item label="Start Date">{moment(k.value.startDate).format('DD MM YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="End Date">{moment(k.value.endDate).format('DD MM YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="Amount"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(amount)}</Descriptions.Item>
                        <Descriptions.Item label="Total Paid"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(myTotalSavings)}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{remainingEmis} / {k.value.duration}</Descriptions.Item>
                        <Descriptions.Item label="EMI">{formatMoney(k.value.emi)}</Descriptions.Item>
                        {/*<Descriptions.Item label="Remaining Amount">{formatMoney(emi * (totalEmis - remainingEmis))}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Interest Rate">{k.value.interestRate}</Descriptions.Item>*/}
                      </Descriptions>
                    </div>
                  </Tile>
                </Col>
            )
          })}
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
            path: `savingAccounts/${props.uid}`,
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
          savings: firebase.ordered.savingAccounts,
          mySavings: firebase.ordered.mySavings,
        }
    )))(ViewSaving);
export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(SavingsEnhancer);
