import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Container, Row, SafeArea } from "../utilities/components/common";
import { theme } from "../constants";
import { PrimaryButton } from "../shared/components/Button";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeArea>
      <KeyboardAwareScrollView
        extraHeight={220}
        extraScrollHeight={Platform.OS === "ios" ? 0 : 62}
        enableOnAndroid={true}
      >
        <Container>
          <Row style={{ marginVertical: 24 }}>
            <Image source={require("../assets/images/logo-name.png")} />
          </Row>

          <Row>
            <Text style={styles.subTitle}>Login</Text>
          </Row>

          <Row style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>Email Address</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email Address"
              // onChangeText={numberInputHandler}
              // value={enteredNumber}
            />
          </Row>

          <Row style={{ alignSelf: "flex-start" }}>
            <Text style={styles.label}>Password</Text>
          </Row>
          <Row>
            <TextInput
              style={[styles.inputs, { marginBottom: 16 }]}
              keyboardType="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Create password"
              // onChangeText={numberInputHandler}
              // value={enteredNumber}
            />
          </Row>
          <Row style={{ alignSelf: "flex-end", marginBottom: 72 }}>
            <Text style={styles.label}>Forgot Password?</Text>
          </Row>

          <Row>
            <PrimaryButton
              onPress={() => navigation.navigate("DashboardLanding")}
            >
              Login
            </PrimaryButton>
          </Row>
        </Container>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: theme.fontSize.subTitle,
    color: theme.color.neutral700,
    marginBottom: theme.spacing.large,
    fontFamily: "archivo-regular700",
    alignSelf: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    alignSelf: "flex-start",
    fontFamily: "archivo-regular",
  },
  inputs: {
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: "transparent",
    flex: 1,
    height: 48,
    width: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: theme.color.primary400,
    borderWidth: 1,
    color: theme.color.neutral700,
    fontFamily: "archivo-regular",
  },
});
