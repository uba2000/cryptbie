import { FlatList, StyleSheet, View } from "react-native";
import { Badge, IconButton, List, Text } from "react-native-paper";
import React from "react";

import { PAYMENTTYPES } from "../data/dummy-data";
import { theme } from "../constants";
import { Column, CommonText, Row } from "../utilities/components/common";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../utilities/formatNumber";

const GlanceRight = (props) => {
  return (
    <View style={styles.glanceRight}>
      <Column style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: "archivo-regular600", fontSize: 18 }}>
          ₦{props.price ? formatNumber(props.price) : 0}
        </Text>
        <Text
          style={{
            fontFamily: "archivo-regular500",
            color: `${props.paid ? theme.color.green300 : theme.color.red500}`,
          }}
        >
          {!props.paid && "Not "}Paid
        </Text>
      </Column>
      <IconButton icon="chevron-right" />
    </View>
  );
};

const HomeScene = ({ jumpTo }) => {
  const navigation = useNavigation();
  const renderPaymentItem = ({ item }) => {
    function handlePress() {
      if (item.paid) {
        // go to view payment status...
        return;
      }

      // go to payment...
      navigation.navigate("PayDue", { paymentId: item.id });
    }

    return (
      <List.Item
        style={[styles.paymentItems]}
        onPress={handlePress}
        left={() => (
          <List.Icon
            style={styles.glanceLogo}
            icon={require("../assets/images/btc.png")}
          />
        )}
        right={(props) => (
          <GlanceRight {...props} paid={item.paid} price={item.price} />
        )}
        title={
          <Text style={{ fontFamily: "archivo-regular600" }}>{item.title}</Text>
        }
      />
    );
  };
  return (
    <View
      style={{ padding: 0, flex: 1, backgroundColor: theme.color.secondary }}
    >
      <View style={{ padding: 20 }}>
        <Row style={{ alignSelf: "center" }}>
          <View style={styles.balanceCircle}>
            <CommonText
              style={{
                fontSize: 16,
                fontFamily: "archivo-regular600",
              }}
            >
              Wallet Balance
            </CommonText>
            <CommonText
              style={{ fontFamily: "raleway-regular700", fontSize: 28 }}
            >
              ₦{formatNumber(7800)}
            </CommonText>
          </View>
        </Row>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Available Payments</Text>
          <FlatList
            data={PAYMENTTYPES}
            keyExtractor={(item) => item.id}
            renderItem={renderPaymentItem}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScene;

const styles = StyleSheet.create({
  balanceCircle: {
    width: 158,
    height: 158,
    borderRadius: 79,
    borderWidth: 8,
    borderColor: theme.color.primary400,
    justifyContent: "flex-start",
    paddingTop: 37,
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    fontSize: 16,
    color: theme.color.neutral700,
    fontFamily: "archivo-regular600",
  },
  paymentItems: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 8,
    elevation: 2,
    backgroundColor: "white",
    marginBottom: 12,
  },
  glanceRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  glanceBadge: {
    alignSelf: "auto",
    fontWeight: "600",
    fontSize: 12,
    color: "#414b52",
    backgroundColor: "white",
  },
  glanceItem: {
    padding: 0,
    backgroundColor: "white",
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
  roundTops: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  roundBottoms: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
