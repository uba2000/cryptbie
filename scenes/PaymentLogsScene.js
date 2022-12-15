import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import moment from "moment";

import { theme } from "../constants";
import { Column, Row } from "../utilities/components/common";
import { IconButton, List } from "react-native-paper";
import { formatNumber } from "../utilities/formatNumber";
import { LECTURERLOGS, PAYMENTTYPES } from "../data/dummy-data";
import { useNavigation } from "@react-navigation/native";

const GlanceRight = (props) => {
  return (
    <View style={styles.glanceRight}>
      <Text style={{ fontFamily: "archivo-regular600", fontSize: 16 }}>
        ₦{formatNumber(props.price)}
      </Text>
      <IconButton icon="chevron-right" />
    </View>
  );
};

const TitleSection = (props) => {

  return (
    <Column style={{ justifyContent: "center" }}>
      <Text style={{ fontFamily: "archivo-regular600", fontSize: 16 }}>
        {props.name}{" "}
        <Text style={{ color: theme.color.neutral500 }}>({props.paymentType})</Text>
      </Text>
      <Text
        style={{
          fontFamily: "archivo-regular",
          color: theme.color.neutral500,
          fontSize: theme.fontSize.button,
        }}
      >
        {moment(props.date).fromNow()}
      </Text>
    </Column>
  );
};


const PaymentLogsScene = () => {
  const navigation = useNavigation();
  const PaymentItem = ({ item }) => {
    const paymentType = PAYMENTTYPES.find(d => d.id === item.paymentType);

    function handlePress() {
      navigation.navigate("PaymentReceipt", {
        name: item.name,
        paymentType,
        date: item.date,
        paidWith: item.paidWith,
      });
    }

    return (
      <List.Item
        style={[styles.paymentItem]}
        onPress={handlePress}
        title={(props) => (
          <TitleSection
            {...props}
            paymentType={paymentType.title}
            date={item.date}
            name={item.name}
          />
        )}
        left={() => (
          <List.Icon
            style={styles.glanceLogo}
            icon={require("../assets/images/btc.png")}
          />
        )}
        right={(props) => <GlanceRight price={paymentType.price} {...props} />}
      />
    );
  };
  return (
    <View
      style={{ padding: 20, flex: 1, backgroundColor: theme.color.secondary }}
    >
      <Row style={{ marginBottom: 12 }}>
        <Text style={styles.title}>All Payments</Text>
        
      </Row>

      <FlatList
        data={LECTURERLOGS}
        keyExtractor={(item) => item.id}
        renderItem={PaymentItem}
      />
    </View>
  );
};

export default PaymentLogsScene;

const styles = StyleSheet.create({
  title: {
    fontFamily: "archivo-regular600",
    fontSize: 16,
  },
  paymentItem: {
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "white",
    marginBottom: 12,
  },
  glanceRight: {
    flexDirection: "row",
    alignItems: "center",
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
});
