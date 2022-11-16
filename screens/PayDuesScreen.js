import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { theme } from "../constants";
import { PAYMENTTYPES } from "../data/dummy-data";

const PayDuesScreen = ({ route, navigation }) => {
  const payId = route.params.paymentId;

  useLayoutEffect(() => {
    const paymentTitle = PAYMENTTYPES.find((d) => d.id == payId).title;

    navigation.setOptions({
      title: paymentTitle,
    });
  }, [payId, navigation]);

  return (
    <View style={styles.screen}>
      <Text>PayDuesScreen</Text>
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
});
