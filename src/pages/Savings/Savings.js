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

const Savings = ({ savings, firebase, uid }) => {
  useEffect(() => {
    // firebase.push(`savingAccounts/${uid}`, { name: 'kmeti 1 - 1,50,000', duration: 10 });
  }, []);
  if (!savings) return null;
  return (
      <div>
        <PageTitle>Savings</PageTitle>
        <Row>
          {savings && savings.map(k => {
            const remainingEmis = moment().diff(k.value.startDate, 'months');
            const totalEmis = moment(k.value.endDate).diff(k.value.startDate, 'months') + 1;
            const emi = k.value.emi ? k.value.emi : k.value.amount * (k.value.interestRate / 100 / 12);
            return (
                <Col id={k.key} className="gutter-row" xs={24} sm={24} md={8} lg={8}>
                  <Tile>
                    <div>
                      <Descriptions
                          title={k.value.name}
                          bordered
                          column={1}
                      >
                        {/*<Descriptions.Item label="Start Date">{moment(k.value.startDate).format('DD MM YYYY')}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="End Date">{moment(k.value.endDate).format('DD MM YYYY')}</Descriptions.Item>*/}
                        <Descriptions.Item label="Amount"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(k.value.amount)}</Descriptions.Item>
                        <Descriptions.Item label="Total Paid"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(emi)}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{k.value.duration}</Descriptions.Item>
                        {/*<Descriptions.Item label="Total Amount">{formatMoney(emi * totalEmis)}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Remaining Amount">{formatMoney(emi * (totalEmis - remainingEmis))}</Descriptions.Item>*/}
                        {/*<Descriptions.Item label="Interest Rate">{k.value.interestRate}</Descriptions.Item>*/}
                      </Descriptions>
                      <Button><Link to={`/dashboard/savings/${k.key}`}>View</Link></Button>
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
    firebaseConnect(props => (
        [
          {
            path: `savingAccounts/${props.uid}`,
            storeAs: 'savingAccounts'
          },
        ])
    ), connect(({ firebase }) => (
        {
          savings: firebase.ordered.savingAccounts,
        }
    )))(Savings);
export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(SavingsEnhancer);
