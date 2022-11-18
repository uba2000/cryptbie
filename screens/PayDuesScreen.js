import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { theme } from "../constants";
import { PAYMENTTYPES } from "../data/dummy-data";
import { TextInput } from "react-native-paper";
import { Row } from "../utilities/components/common";
import { PrimaryButton } from "../shared/components/Button";
import { formatNumber } from "../utilities/formatNumber";

const PayDuesScreen = ({ route, navigation }) => {
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

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 20, marginBottom: 36 }}>
        <Text style={styles.sectionTitle}>Amount</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.paymentPrice}>
            ₦{formatNumber(paymentDetails.price)}
          </Text>
        </View>
      </View>

      <View style={{ marginBottom: 36 }}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Row>
          <TextInput
            style={[styles.inputs]}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Name on Card"
            underlineColor="transparent"
            // onChangeText={numberInputHandler}
            // value={enteredNumber}
          />
        </Row>
        <Row>
          <TextInput
            style={[styles.inputs]}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Card Number"
            underlineColor="transparent"
            // onChangeText={numberInputHandler}
            // value={enteredNumber}
          />
        </Row>
        <Row>
          <TextInput
            style={[styles.inputs, { marginRight: 16 }]}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Expiry Date"
            underlineColor="transparent"
            // onChangeText={numberInputHandler}
            // value={enteredNumber}
          />
          <TextInput
            style={[styles.inputs, {}]}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="CVV"
            underlineColor="transparent"
            // onChangeText={numberInputHandler}
            // value={enteredNumber}
          />
        </Row>
      </View>
      <Row>
        <PrimaryButton
          onPress={() =>
            navigation.navigate("PayDueConfirm", {
              cardName: "Charis Bank",
              paymentFor: paymentDetails.title,
              cardNumber: "XXXXXX3097",
              amount: paymentDetails.price,
            })
          }
        >
          Continue
        </PrimaryButton>
      </Row>
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
