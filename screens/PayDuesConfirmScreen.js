import { View, Text, StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { theme } from "../constants";
import { Column, Row } from "../utilities/components/common";
import { PrimaryButton } from "../shared/components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { toggleFullIsLoading } from "../slices/globalSlice";

const PayDuesConfirmScreen = ({ route }) => {
  const dispatch = useDispatch();
  const paymentDetails = route.params;

  const navigation = useNavigation();

  function proceedPay() {
    dispatch(toggleFullIsLoading());
    setTimeout(() => {
      navigation.navigate("PaySuccess");
      dispatch(toggleFullIsLoading());
    }, 2000);
  }

  return (
    <Fragment>
      <View style={styles.screen}>
        <Column style={{ justifyContent: "space-between", flex: 1 }}>
          <View style={{ marginTop: 20, marginBottom: 36 }}>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Name</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {paymentDetails.paymentFor}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Method</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {paymentDetails.cardName}
                </Text>
                <Text style={[styles.detailSubValue, { marginLeft: 4 }]}>
                  {paymentDetails.cardNumber}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Amount</Text>
              <Row>
                <Text style={styles.detailValue}>₦{paymentDetails.amount}</Text>
              </Row>
            </View>
          </View>
          <Row>
            <PrimaryButton onPress={proceedPay}>Proceed to Pay</PrimaryButton>
          </Row>
        </Column>
      </View>
    </Fragment>
  );
};

export default PayDuesConfirmScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 121,
    paddingHorizontal: 20,
    backgroundColor: theme.color.secondary,
  },
  detailBox: {
    borderColor: "#D4DBDE",
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: 23,
    paddingTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailTitle: {
    fontFamily: "archivo-regular",
    fontSize: 16,
    color: theme.color.neutral500,
  },
  detailValue: {
    fontFamily: "archivo-regular",
    fontSize: 14,
    color: theme.color.neutral700,
  },
  detailSubValue: {
    fontFamily: "archivo-regular",
    color: theme.color.neutral500,
  },
});
