import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../constants";
import { Column, Row } from "../utilities/components/common";
import { PrimaryButton } from "../shared/components/Button";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../utilities/formatNumber";
import moment from "moment";

const PaySuccessScreen = ({ route }) => {
  const paymentDetails = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Column style={{ alignSelf: "center", alignItems: "center", justifyContent: 'space-between' }}>
        <Image
          style={{ width: 120, height: 80, marginBottom: 24 }}
          source={require("../assets/images/success-badge.png")}
        />

        <Text style={styles.transactionText}>Transaction Succesful!</Text>
        <Text style={styles.transactionSubText}>Below are the details of your transaction</Text>

        <Row style={{ justifyContent: "space-between" }}>
          <View style={{ marginTop: 20, marginBottom: 36, flex: 1 }}>
            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Name:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {paymentDetails.paymentFor}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Method:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {paymentDetails.paymentMethod}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Amount Paid:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  ₦{formatNumber(paymentDetails.amount)}
                </Text>
              </Row>
            </View>

            <View style={styles.detailBox}>
              <Text style={styles.detailTitle}>Payment Date:</Text>
              <Row>
                <Text style={styles.detailValue}>
                  {moment(paymentDetails.date).format('MMM DD, YYYY. hh:mm A')}
                </Text>
              </Row>
            </View>
          </View>
        </Row>

        <Row>
          <PrimaryButton
            onPress={() => navigation.navigate("DashboardLanding")}
          >
            Back to dashboard
          </PrimaryButton>
        </Row>
      </Column>
    </View>
  );
};

export default PaySuccessScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: theme.color.secondary,
  },

  transactionText: {
    marginBottom: 8,
    fontSize: 18,
    color: theme.color.neutral700,
    fontFamily: "archivo-regular600",
  },
  transactionSubText: {
    marginBottom: 16,
    fontFamily: "archivo-regular",
    color: theme.color.neutral500
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
    textTransform: 'capitalize'
  },
  detailSubValue: {
    fontFamily: "archivo-regular",
    color: theme.color.neutral500,
    marginLeft: 4,
  },
});
