import React  from 'react';
import {Col, Row, Descriptions} from "antd";
import moment from 'moment';
import PageTitle from "../../components/PageTitle/PageTitle";
import Tile from "../../components/Tile/Tile";
import {formatMoney} from "../../utils/priceFormatting";
import {connect} from "react-redux";
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";

const Loans = ({ loans }) => {
  if (!loans) return null;
  return (
      <div>
        <PageTitle>Liabilities & Loans</PageTitle>
        <Row>
          {loans && loans.map(k => {
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
                        <Descriptions.Item label="Start Date">{moment(k.value.startDate).format('DD MM YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="End Date">{moment(k.value.endDate).format('DD MM YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="Amount"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(k.value.amount)}</Descriptions.Item>
                        <Descriptions.Item label="EMI"><span className="fas fa-rupee-sign" />&nbsp;{formatMoney(emi)}</Descriptions.Item>
                        <Descriptions.Item label="difference">{remainingEmis} / {totalEmis}</Descriptions.Item>
                        <Descriptions.Item label="Total Amount">{formatMoney(emi * totalEmis)}</Descriptions.Item>
                        <Descriptions.Item label="Remaining Amount">{formatMoney(emi * (totalEmis - remainingEmis))}</Descriptions.Item>
                        <Descriptions.Item label="Interest Rate">{k.value.interestRate}</Descriptions.Item>
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
const LoansEnhancer =  compose(
    firebaseConnect(props => (
        [
          {
            path: `loans/${props.uid}`,
            storeAs: 'loans'
          },
        ])
    ), connect(({ firebase }) => (
        {
          loans: firebase.ordered.loans,
        }
    )))(Loans);
export default connect(({firebase}) => ({
  uid: firebase.auth.uid
}))(LoansEnhancer);
