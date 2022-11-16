import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../constants";
import { Column, CommonText, Row } from "../utilities/components/common";

const ProfileScene = () => {
  return (
    <View
      style={{ padding: 20, flex: 1, backgroundColor: theme.color.secondary }}
    >
      <Column style={{ alignSelf: "center", alignItems: "center" }}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 4 }}
          source={require("../assets/images/user-1.jpg")}
        />
        <CommonText style={styles.userNameText}>Jammy Peters</CommonText>
        <CommonText style={styles.userEmailText}>
          jammycrypto@gmail.com
        </CommonText>
      </Column>
    </View>
  );
};

export default ProfileScene;

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 24,
    fontFamily: "archivo-regular500",
    color: theme.color.neutral700,
  },
  userEmailText: {
    fontSize: 18,
    fontFamily: "archivo-regular",
    textAlign: "center",
  },
});
