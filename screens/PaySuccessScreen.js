import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { theme } from "../constants";
import { Column, Row } from "../utilities/components/common";
import { PrimaryButton } from "../shared/components/Button";
import { useNavigation } from "@react-navigation/native";

const PaySuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Column style={{ alignSelf: "center", alignItems: "center" }}>
        <Image
          style={{ width: 320, height: 280, marginBottom: 24 }}
          source={require("../assets/images/success-badge.png")}
        />
        <Text style={styles.transactionText}>Transaction Succesful</Text>
        <Row>
          <PrimaryButton
            onPress={() => navigation.navigate("DashboardLanding")}
          >
            Done
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
    fontSize: 18,
    color: theme.color.neutral700,
    marginBottom: 108,
    fontFamily: "archivo-regular600",
  },
});
