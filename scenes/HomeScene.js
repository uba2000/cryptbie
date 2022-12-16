import { FlatList, StyleSheet, View } from 'react-native';
import { Badge, IconButton, List, Text } from 'react-native-paper';
import React, { useEffect } from 'react';

import { PAYMENTTYPES } from '../data/dummy-data';
import { theme } from '../constants';
import {
  Column,
  CommonText,
  Row,
} from '../utilities/components/common';
import { useNavigation } from '@react-navigation/native';
import { formatNumber } from '../utilities/formatNumber';
import useUser from '../hooks/useUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPayments,
  paymentStates,
  selectPayment,
} from '../slices/paymentSlice';
import useThunkEffectCalls from '../hooks/useThunkEffectCalls';

const GlanceRight = (props) => {
  return (
    <View style={styles.glanceRight}>
      <Column style={{ alignItems: 'center' }}>
        <Text
          style={{ fontFamily: 'archivo-regular600', fontSize: 18 }}
        >
          ₦{props.price ? formatNumber(props.price) : 0}
        </Text>
        <Text
          style={{
            fontFamily: 'archivo-regular500',
            color: `${
              props.paid ? theme.color.green300 : theme.color.red500
            }`,
          }}
        >
          {!props.paid && 'Not '}Paid
        </Text>
      </Column>
      <IconButton icon="chevron-right" />
    </View>
  );
};

const HomeScene = ({ jumpTo }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, full_name, token } = useUser();
  const { status, data } = useSelector(selectPayment);

  const renderPaymentItem = ({ item }) => {
    console.log({ item });
    const paymentType = data.find((d) => d._id === item._id);

    function handlePress() {
      const data = { paymentId: item._id };
      if (item.paid) {
        // go to view payment status...
        navigation.navigate('PaymentReceipt', {
          name: full_name, // pass in user name after login...
          paymentType,
          date: item.createdAt || '',
          paidWith: item.paidWith || '',
        });
        return;
      }

      // go to payment...
      navigation.navigate('PayDue', data);
    }

    return (
      <List.Item
        style={[styles.paymentItems]}
        onPress={handlePress}
        left={() => (
          <List.Icon
            style={styles.glanceLogo}
            icon={require('../assets/images/btc.png')}
          />
        )}
        right={(props) => (
          <GlanceRight
            {...props}
            paid={item.paid}
            price={
              item?.multiple_levels
                ? item?.level_dues[user.currentLevel]
                : item.price
            }
          />
        )}
        title={
          <Text style={{ fontFamily: 'archivo-regular600' }}>
            {item.title}
          </Text>
        }
      />
    );
  };

  function getPayments() {
    console.log('in getPayments...');
    dispatch(fetchPayments(token));
  }

  useEffect(() => {
    getPayments();
  }, []);

  console.log(data);

  return (
    <View
      style={{
        padding: 0,
        flex: 1,
        backgroundColor: theme.color.secondary,
      }}
    >
      <View style={{ padding: 20 }}>
        <Row style={{ alignSelf: 'center' }}>
          <View style={styles.balanceCircle}>
            <CommonText
              style={{
                fontSize: 20,
                fontFamily: 'archivo-regular600',
              }}
            >
              2018 / 2019
            </CommonText>
            <CommonText
              style={{
                fontFamily: 'raleway-regular700',
                fontSize: 28,
              }}
            >
              {user.currentLevel} Level
            </CommonText>
          </View>
        </Row>

        <View style={{ marginTop: 20 }}>
          {/* TODO: if lecturer, list payments lecturer can see */}
          {/* TODO: else list all fees for current student... */}
          <Text style={styles.sectionTitle}>Available Payments</Text>
          {status === paymentStates.FETCHING && (
            <Text>Loading...</Text>
          )}
          {status === paymentStates.FETCHED && (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={renderPaymentItem}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeScene;

const styles = StyleSheet.create({
  balanceCircle: {
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 8,
    borderColor: theme.color.primary400,
    justifyContent: 'flex-start',
    paddingTop: 37,
    alignItems: 'center',
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    fontSize: 16,
    color: theme.color.neutral700,
    fontFamily: 'archivo-regular600',
  },
  paymentItems: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 8,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  glanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  glanceBadge: {
    alignSelf: 'auto',
    fontWeight: '600',
    fontSize: 12,
    color: '#414b52',
    backgroundColor: 'white',
  },
  glanceItem: {
    padding: 0,
    backgroundColor: 'white',
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
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
