import { Image, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import {
  Column,
  Container,
  Row,
  SafeArea,
} from '../utilities/components/common';
import { theme } from '../constants';
import {
  OutlineButton,
  PrimaryButton,
} from '../shared/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullIsLoading } from '../slices/globalSlice';
import { ServiceFactory } from '../services/ServiceFactory';
import { Text } from 'react-native-paper';

const LecturerLoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPwdShowing, setIsPwdShowing] = React.useState(false);
  const [isUserError, setIsUserError] = React.useState(false);
  const [isPwdError, setIsPwdError] = React.useState(false);

  const [details, setDetails] = useState({
    loginId: '',
    password: '',
  });

  const onChangeHandler = (e, value) => {
    const data = { ...details, [e]: value };
    setDetails(data);
  };

  const canLogin =
    email.trim().length > 0 && password.trim().length > 0;

  const { loginError } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    await login(details.loginId, details.password);
  };

  const togglePwdIsShowing = () => setIsPwdShowing(!isPwdShowing);

  const login = async (loginId, password) => {
    dispatch(toggleFullIsLoading());

    try {
      const userService = ServiceFactory.use('user');
      const success = await userService.lecturerLogin(
        loginId,
        password
      );

      if (success) {
        navigation.navigate('DashboardLanding');
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleFullIsLoading());
    }

    return Promise.resolve();
  };
  return (
    <SafeArea>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={220}
        extraScrollHeight={Platform.OS === 'ios' ? 0 : 62}
        enableOnAndroid={true}
      >
        <Column
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 48,
          }}
        >
          {/* <Row style={{ marginVertical: 24 }}>
            <Image
              source={require('../assets/images/logo-name.png')}
            />
          </Row> */}

          <Row>
            <Text style={styles.title}>Welcome Back sir/ma</Text>
          </Row>

          <Row>
            <Text style={styles.subTitle}>
              Login to view all student payment logs
            </Text>
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Login ID</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Login ID"
              onChangeText={(e) => onChangeHandler('loginId', e)}
              value={details.loginId}
            />
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Password</Text>
          </Row>
          <Row>
            <TextInput
              label="Password"
              style={[styles.inputs, { marginBottom: 16 }]}
              keyboardType="password"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Enter password"
              secureTextEntry={!isPwdShowing}
              error={isPwdError}
              onBlur={() => setIsPwdError(!password.trim())}
              onChangeText={(text) =>
                onChangeHandler('password', text)
              }
              value={details.password}
            />
          </Row>
          <Row style={{ alignSelf: 'flex-end', marginBottom: 66 }}>
            <Text style={[styles.label, { fontSize: 14 }]}>
              Forgot Password?
            </Text>
          </Row>

          {loginError?.displayMessage && (
            <Text
              style={{ color: 'red', marginBottom: 16 }}
              variant="titleMedium"
            >
              {loginError.displayMessage}
            </Text>
          )}

          <Row>
            <PrimaryButton onPress={() => handleLogin()}>
              Login
            </PrimaryButton>
          </Row>
        </Column>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

export default LecturerLoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.title,
    color: theme.color.neutral700,
    marginBottom: theme.spacing.small,
    marginTop: 24,
    fontFamily: 'archivo-regular700',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: theme.color.neutral700,
    marginBottom: 24,
    fontFamily: 'archivo-regular',
    alignSelf: 'center',
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    alignSelf: 'flex-start',
    fontFamily: 'archivo-regular',
  },
  inputs: {
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: 'transparent',
    flex: 1,
    height: 48,
    width: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: theme.color.primary400,
    borderWidth: 1,
    color: theme.color.neutral700,
    fontFamily: 'archivo-regular',
  },
});
