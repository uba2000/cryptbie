import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, IconButton, Menu, Text } from "react-native-paper";
import { theme } from "../../constants";

const CustomNavigationBar = (props) => {
  const title = props.options.headerTitle || "";
  const index = props.options.tabIndex || 0;
  const { backgroundColor } = props.options.headerStyle;

  const navigator = useNavigation();
  const [visible, setVisible] = React.useState(false);

  if (index === 0) {
    return (
      <>
        <View style={{ padding: 20, backgroundColor: backgroundColor }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={require("../../assets/images/user-1.jpg")}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Image
                style={{ width: 134, height: 40 }}
                source={require("../../assets/images/logo-name.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Appbar.Action
                icon={require("../../assets/images/bell-notification.png")}
                onPress={() => {}}
                color={theme.color.primary400}
              />
            </View>
          </View>
        </View>
      </>
    );
  }

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.color.secondary,
      }}
    >
      <Appbar.Content
        title={title}
        titleStyle={{ fontSize: 24, fontFamily: "archivo-regular600" }}
      />
      <Appbar.Action
        icon={require("../../assets/images/bell-notification.png")}
        onPress={() => {}}
        color={theme.color.primary400}
      />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 30,
  },
});
