import { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants';
import BottomDrawer from '../shared/components/ShareDrawer';
import { PrimaryButton } from '../shared/components/Button';
import { Row } from '../utilities/components/common';
import ShareDrawer from '../shared/components/ShareDrawer';
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { toggleSharedReceiptDrawer } from '../slices/globalSlice';
import { formatNumber } from '../utilities/formatNumber';
import moment from 'moment';

function PaymentReceiptScreen({ route }) {
  console.log(route.params);
  const {
    name,
    paymentType,
    paidWith,
    txn_id,
    txn_ref,
    amount,
    date,
  } = route.params;

  console.log({ params: route.params });
  return (
    <>
      <View style={styles.screen}>
        <Text style={styles.transactionText}>Due Paid</Text>
        <Text style={styles.transactionSubText}>
          Below are the details of your transaction
        </Text>

        <Row
          style={[
            { justifyContent: 'space-between' },
            styles.paymentBox,
          ]}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Student Name:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {/* {paymentDetails.paymentFor} */}
                  {name}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Paid For:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {/* {paymentDetails.paymentFor} */}
                  {paymentType?.title}
                </Text>
              </Row>
            </View>

            {/* <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Method:</Text>
              <Row>
                <Text style={[styles.detailValue, {textTransform: 'capitalize'}]}>
                  {paidWith}
                </Text>
              </Row>
            </View> */}

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Amount Paid:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  ₦{formatNumber(amount)}
                  {/* ₦1000 */}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Transaction ID:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {txn_id}
                  {/* ₦1000 */}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Transaction Ref:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {txn_ref}
                  {/* ₦1000 */}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Date:</Text>
              <Row>
                <Text style={[styles.detailValue, styles.date]}>
                  {moment(date).format('MMM DD, YYYY. hh:mm A')}
                </Text>
              </Row>
            </View>
          </View>
        </Row>
        <Row>
          <PrimaryButton onPress={() => {}}>
            Download receipt
          </PrimaryButton>
        </Row>
      </View>
    </>
  );
}

export default PaymentReceiptScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: theme.color.secondary,
  },
  transactionText: {
    marginBottom: 4,
    fontSize: 24,
    color: theme.color.neutral700,
    fontFamily: 'archivo-regular600',
  },
  transactionSubText: {
    marginBottom: 16,
    fontFamily: 'archivo-regular',
    color: theme.color.neutral500,
  },
  detailBox: {
    borderColor: '#D4DBDE',
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: 23,
    paddingHorizontal: 16,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailTitle: {
    fontFamily: 'archivo-regular',
    fontSize: 16,
    color: theme.color.neutral500,
  },
  detailValue: {
    fontFamily: 'archivo-regular',
    fontSize: 14,
    color: theme.color.neutral700,
    maxWidth: 200,
    flexWrap: 'wrap',
    // textTransform: 'capitalize'
  },
  detailSubValue: {
    fontFamily: 'archivo-regular',
    color: theme.color.neutral500,
    marginLeft: 4,
  },
  paymentBox: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // paddingVertical: 8,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 36,
  },
});
