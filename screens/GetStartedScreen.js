import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, { Fragment } from 'react';

import {
  Container,
  Row,
  SafeArea,
} from '../utilities/components/common';
import { theme } from '../constants';
import {
  OutlineButton,
  PrimaryButton,
} from '../shared/components/Button';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GetStartedScreen = () => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <SafeArea>
        <Container>
          <Row style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../assets/images/getstarted.png')}
            />
          </Row>
          <Text style={styles.title}>
            <Text style={styles.primaryText}>StudentPay</Text>, your
            faculty due's payment platform
          </Text>

          <Row style={{ marginBottom: 24 }}>
            <PrimaryButton
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </PrimaryButton>
          </Row>

          <Row>
            <OutlineButton
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </OutlineButton>
          </Row>
        </Container>
      </SafeArea>
    </Fragment>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    width: '90%',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'archivo-regular600',
    fontSize: 24,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xxlarge,
    lineHeight: 28,
    paddingHorizontal: 10,
  },
  primaryText: {
    color: theme.color.primary400,
  },
});
