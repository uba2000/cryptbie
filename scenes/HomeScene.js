import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { theme } from "../constants";
import { CommonText, Row } from "../utilities/components/common";

const HomeScene = ({ jumpTo }) => {
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
              $7,800
            </CommonText>
          </View>
        </Row>
        <Text>HomeScene</Text>
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
});
