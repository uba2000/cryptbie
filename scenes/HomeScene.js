import { FlatList, StyleSheet, View, Image } from 'react-native';
import {
  Badge,
  IconButton,
  List,
  Searchbar,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import React, { useEffect, useState, useLayoutEffect } from 'react';

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
  lecturerFetchPaymentTypes,
  paymentStates,
  selectPayment,
} from '../slices/paymentSlice';
import {
  selectGlobal,
  toggleFullIsLoading,
} from '../slices/globalSlice';
import {
  fetchPaymentLogs,
  logStates,
  resetLogsStatus,
  saveSearchedQuery,
  selectLogs,
} from '../slices/logsSlice';

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
  const { user, full_name, token, role, isStudent } = useUser();
  const { isLoggedIn, loggedInUser } = useSelector(selectGlobal);
  const { status, data } = useSelector(selectPayment);
  const [paymentListLoading, setPaymentListLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  if (!isLoggedIn) return null;

  const renderPaymentItem = ({ item }) => {
    const paymentType = data.find((d) => d._id === item._id);

    function handlePress() {
      const data = { paymentId: item._id };
      if (item.paid) {
        // go to view payment status...
        navigation.navigate('PaymentReceipt', {
          name: full_name, // pass in user name after login...
          paymentType,
          txn_id: item.txn_id,
          txn_ref: item.txn_ref,
          date: item.createdAt || '',
          paidWith: 'Card',
          amount: paymentType.multiple_levels
            ? paymentType.level_dues[user.currentLevel]
            : paymentType.price,
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
    if (isStudent) {
      dispatch(fetchPayments(token));
    } else {
      dispatch(lecturerFetchPaymentTypes());
    }
  }

  useLayoutEffect(() => {
    getPayments();
  }, []);

  const studentPressed = () => {
    dispatch(fetchPaymentLogs());
    dispatch(toggleFullIsLoading());
  };

  const { status: logsStatus, logs } = useSelector(selectLogs);

  useEffect(() => {
    if (logsStatus === logStates.FETCHED) {
      dispatch(resetLogsStatus());
      dispatch(toggleFullIsLoading());
      jumpTo('logs');
    }
  }, [logsStatus]);

  useEffect(() => {
    if (status === paymentStates.FETCHED) {
      setPaymentListLoading(false);
    }
  }, [status]);

  const onSearchIconPressed = () => {
    dispatch(saveSearchedQuery(searchQuery));
    // dispatch();
    jumpTo('logs');
  };

  const showFilterDlg = () => setShowFilters(true);

  return (
    <View style={{ padding: 0, flex: 1 }}>
      {isStudent ? (
        <View
          style={{
            padding: 0,
            flex: 1,
            backgroundColor: 'transparent',
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
              <Text style={styles.sectionTitle}>
                Available Payments
              </Text>
              {paymentListLoading && <Text>Loading...</Text>}
              {!paymentListLoading && (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item._id}
                  renderItem={renderPaymentItem}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: 20,
              width: '100%',
              backgroundColor: theme.color.secondary,
            }}
          ></View>
          <View
            style={{
              padding: 20,
              paddingTop: 30,
              flex: 1,
              backgroundColor: isStudent
                ? theme.color.secondary
                : 'transparent',
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  marginTop: 16,
                  marginBottom: theme.spacing.medium,
                  fontSize: 16,
                }}
              >
                Track Payment
              </Text>
              <View style={styles.surfaceContainer}>
                <TouchableRipple
                  style={[styles.rippleButton, styles.shadow]}
                  onPress={() => studentPressed()}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      style={styles.rippleImage}
                      source={require('../assets/images/btc.png')}
                    />
                    <Text style={{ fontFamily: 'archivo-regular' }}>
                      Student Payment
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
            {/* <Portal>
            <OrderFilterDialog
              open={showFilters}
              setOpen={setShowFilters}
              // onApplyOrderFilters={(args: ORDERFILTER) => setFilter(args)}
            />
          </Portal> */}
          </View>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 20,
              right: 0,
              paddingRight: 25,
            }}
          >
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Searchbar
                onIconPress={onSearchIconPressed}
                style={{ flex: 1, maxHeight: 40 }}
                inputStyle={{
                  fontSize: 14,
                  lineHeight: 18,
                  fontFamily: 'archivo-regular',
                }}
                placeholder="Search by Student Name"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {/* <ImageButton
              onPress={showFilterDlg}
              style={[
                styles.shadow,
                { backgroundColor: 'white', marginLeft: 20, width: 40, height: 40, borderRadius: 8 }
              ]}
            /> */}
            </View>
          </View>
        </>
      )}
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
    elevation: 4,
  },
  rippleButton: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 93,
    width: 93,
    maxWidth: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  rippleImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  surfaceContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
});
