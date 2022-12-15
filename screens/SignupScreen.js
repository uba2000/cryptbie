import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Row,
  SafeArea,
} from '../utilities/components/common';
import { theme } from '../constants';
import { PrimaryButton } from '../shared/components/Button';
import { toggleFullIsLoading } from '../slices/globalSlice';
import { ServiceFactory } from '../services/ServiceFactory';
import { useDispatch, useSelector } from 'react-redux';

const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(true);

  const [details, setDetails] = useState({
    matNo: '',
    firstname: '',
    lastname: '',
    password: '',
    phoneNumber: '',
  });

  const onChangeHandler = (e, value) => {
    const data = { ...details, [e]: value };
    setDetails(data);
  };

  const { loginError } = useSelector((state) => state.global);

  const register = async () => {
    dispatch(toggleFullIsLoading());

    try {
      const userService = ServiceFactory.use('user');
      const success = await userService.register(details);

      if (success) {
        navigation.navigate('Login');
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
        extraHeight={220}
        extraScrollHeight={Platform.OS === 'ios' ? 0 : 62}
        enableOnAndroid={true}
      >
        <Container>
          <Row style={{ marginVertical: 24 }}>
            <Image
              source={require('../assets/images/logo-name.png')}
            />
          </Row>

          <Row>
            <Text style={styles.subTitle}>Create Account</Text>
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Matric Number</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Matric Number"
              name="MatNo"
              onChangeText={(e) => onChangeHandler('matNo', e)}
              value={details.matNo}
            />
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>First Name</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="First Name"
              onChangeText={(e) => onChangeHandler('firstname', e)}
              value={details.firstname}
            />
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Last Name</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Last Name"
              onChangeText={(e) => onChangeHandler('lastname', e)}
              value={details.lastname}
            />
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Phone Number</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Phone Number"
              onChangeText={(e) => onChangeHandler('phoneNumber', e)}
              value={details.phoneNumber}
            />
          </Row>

          <Row style={{ alignSelf: 'flex-start' }}>
            <Text style={styles.label}>Password</Text>
          </Row>
          <Row>
            <TextInput
              style={styles.inputs}
              // keyboardType="password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Create password"
              onChangeText={(e) => onChangeHandler('password', e)}
              value={details.password}
            />
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
            <PrimaryButton onPress={() => register()}>
              Sign Up
            </PrimaryButton>
          </Row>
        </Container>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: theme.fontSize.subTitle,
    color: theme.color.neutral700,
    marginBottom: theme.spacing.large,
    fontFamily: 'archivo-regular700',
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
