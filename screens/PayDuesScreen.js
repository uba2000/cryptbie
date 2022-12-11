import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {PayWithFlutterwave} from 'flutterwave-react-native';
import { theme } from "../constants";
import { PAYMENTTYPES } from "../data/dummy-data";
import { TextInput } from "react-native-paper";
import { Row } from "../utilities/components/common";
import { PrimaryButton } from "../shared/components/Button";
import { formatNumber } from "../utilities/formatNumber";
import { useDispatch } from "react-redux";
import { toggleFullIsLoading } from "../slices/globalSlice";

const PayDuesScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const payId = route.params.paymentId;
  const [paymentDetails, setPaymentDetails] = useState(
    PAYMENTTYPES.find((d) => d.id == payId)
  );

  useLayoutEffect(() => {
    const paymentTitle = paymentDetails.title;

    navigation.setOptions({
      title: paymentTitle,
    });
  }, [payId, navigation]);

  const handleOnRedirect = (data) => {
    // {"status": "successful", "transaction_id": "4014843", "tx_ref": "flw_tx_ref_uRh1wIsnpt"}
    console.log(data);
    if (data.status === "successful") {
      // register payment in backend
      navigation.navigate("PaySuccess", {
        cardName: "Charis Bank",
        paymentFor: paymentDetails.title,
        paymentMethod: 'card',
        amount: paymentDetails.price,
        date: new Date()
      });
    }
  };
  
  const generateTransactionRef = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Title</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.paymentPrice}>
            {paymentDetails.title}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 20, marginBottom: 36 }}>
        <Text style={styles.sectionTitle}>Amount</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.paymentPrice}>
            ₦{formatNumber(paymentDetails.price)}
          </Text>
        </View>
      </View>

      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: generateTransactionRef(10),
          authorization: 'FLWPUBK_TEST-ec94e2d5babcb235f2b1bf4ee68a8c00-X',
          customer: {
            email: 'customer-email@example.com'
          },
          amount: paymentDetails.price,
          currency: 'NGN',
          payment_options: 'card'
        }}
        onDidInitialize={() => {
          console.log('did init');
          dispatch(toggleFullIsLoading());
        }}
        onWillInitialize={() => {
          console.log('will init');
          dispatch(toggleFullIsLoading());
        }}
        customButton={(props) => (
      <Row>
        <PrimaryButton onPress={props.onPress}>Proceed to Pay</PrimaryButton>
      </Row>
        )}
      />
    </View>
  );
};

export default PayDuesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    backgroundColor: theme.color.secondary,
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    fontSize: 16,
    color: theme.color.neutral700,
    fontFamily: "archivo-regular600",
  },
  priceContainer: {
    backgroundColor: theme.color.formFill,
    padding: 16,
    borderRadius: 8,
  },
  paymentPrice: {
    fontSize: 14,
    fontFamily: "archivo-regular",
  },
  inputs: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: theme.color.primary400,
    borderWidth: 1,
    color: theme.color.neutral700,
    fontFamily: "archivo-regular",
  },
});
