import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { theme } from '../constants';
import { PAYMENTTYPES } from '../data/dummy-data';
import { selectPayment } from '../slices/paymentSlice';
import { Column } from '../utilities/components/common';
import { formatNumber } from '../utilities/formatNumber';

const GlanceRight = (props) => {
  return (
    <View style={styles.glanceRight}>
      <Text
        style={{ fontFamily: 'archivo-regular600', fontSize: 16 }}
      >
        ₦{formatNumber(props.price)}
      </Text>
      <IconButton icon="chevron-right" />
    </View>
  );
};

const TitleSection = (props) => {
  return (
    <Column style={{ justifyContent: 'center' }}>
      <Text
        style={{ fontFamily: 'archivo-regular600', fontSize: 16 }}
      >
        {props.name}{' '}
        <Text style={{ color: theme.color.neutral500 }}>
          ({props.paymentType})
        </Text>
      </Text>
    </Column>
  );
};
// export type OrderListItemProps = {
//   log: ORDER,
//   selectable: boolean,
//   selected?: string[],
//   index: number,
//   itemCount: number,
//   roundCorners: boolean,
//   logPressed?: (() => void) | undefined,
//   dispatch: AppDispatch,
// };

const PaymentLogItem = (props) => {
  const {
    dispatch,
    selectable = false,
    selected = [],
    logPressed,
    log,
  } = props;

  let { payment_id, txn_id, createdAt, name, amount } = log;

  // allPaymentTypes = [
  //   {
  //     _id: '639a881b1d8a881559c20425',
  //     levels: 'all',
  //     price: '1000',
  //     title: 'Faculty Dues',
  //   },
  //   {
  //     _id: '639a88e21d8a881559c20426',
  //     levels: 'all',
  //     price: '1000',
  //     title: 'Faculty Dues (Maintenance Fees)',
  //   },
  //   {
  //     _id: '639a89421d8a881559c20427',
  //     levels: [Array],
  //     price: '1000',
  //     title: 'Department Dues',
  //   },
  //   {
  //     _id: '639a896b1d8a881559c20428',
  //     levels: [Array],
  //     price: '5000',
  //     title: 'Department Dues (Entry Level)',
  //   },
  //   {
  //     _id: '639a897d1d8a881559c20429',
  //     levels: 'all',
  //     price: '1000',
  //     title: 'Exam Pass Fees',
  //   },
  //   {
  //     _id: '639a89fe1d8a881559c2042a',
  //     level_dues: [Object],
  //     levels: 'all',
  //     multiple_levels: true,
  //     price: '1000',
  //     title: 'Class Dues',
  //   },
  // ];

  // log = {
  //   _id: '639ec76ee634da09c3fbd441',
  //   amount: 1000,
  //   createdAt: '2022-12-18T07:55:26.397Z',
  //   name: 'Noel Uba',
  //   payment_id: '639a881b1d8a881559c20425',
  //   status: true,
  //   txn_id: '4031022',
  //   txn_ref: 'flw_tx_ref_AkH3zFDkF2',
  //   updatedAt: '2022-12-18T07:55:26.397Z',
  // };

  const { data: allPaymentTypes } = useSelector(selectPayment);

  // payment type is the id to the payment made in this log
  const paymentType = allPaymentTypes.find(
    (d) => d._id === payment_id
  );
  console.log({ log, paymentType, allPaymentTypes });
  function handlePress() {
    logPressed();
  }

  // let a = {
  //   _id: '639d030a3bedfbfc432c56cd',
  //   amount: 1000,
  //   createdAt: '2022-12-16T23:45:14.112Z',
  //   name: 'Noel Uba',
  //   payment_id: '639a89fe1d8a881559c2042a',
  //   status: true,
  //   txn_id: '4028792',
  //   txn_ref: 'flw_tx_ref_Yt6gOrO4dX',
  //   updatedAt: '2022-12-16T23:45:14.112Z',
  // };

  return (
    <List.Item
      style={[styles.paymentItem]}
      onPress={handlePress}
      title={(props) => (
        <TitleSection
          {...props}
          paymentType={paymentType?.title || ''}
          date={createdAt}
          name={name}
        />
      )}
      left={() => (
        <List.Icon
          style={styles.glanceLogo}
          icon={require('../assets/images/btc.png')}
        />
      )}
      right={(props) => <GlanceRight price={amount} {...props} />}
      descriptionNumberOfLines={3}
      descriptionStyle={{ fontSize: 11, lineHeight: 15 }}
      description={
        moment(createdAt).fromNow() + '\nTxn: #' + txn_id
        // +
        // '\nSupplier: ' +
        // SupplierName
      }
    />
  );
};

export default PaymentLogItem;

const styles = StyleSheet.create({
  glanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glanceLogo: {
    width: 40,
    height: 40,
    marginTop: 3,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    padding: 0,
  },
  paymentItem: {
    padding: 8,
    // shadowColor: '#171717',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 2,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'archivo-regular600',
    fontSize: 16,
  },
});
