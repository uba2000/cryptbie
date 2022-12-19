import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  RefreshControl,
} from 'react-native';
import {
  IconButton,
  Divider,
  Portal,
  Searchbar,
  List,
} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { theme } from '../constants';
import { Column, Row } from '../utilities/components/common';
import { formatNumber } from '../utilities/formatNumber';
import { LECTURERLOGS, PAYMENTTYPES } from '../data/dummy-data';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import PaymentLogItem from '../components/PaymentLogItem';
import { selectPayment } from '../slices/paymentSlice';
import {
  fetchPaymentLogs,
  resetLogsStatus,
  logStates,
} from '../slices/logsSlice';
import { toggleFullIsLoading } from '../slices/globalSlice';

const PaymentLogsScene = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { searchedQuery, logs, status } = useSelector(
    (state) => state.logs
  );
  const { data: allPaymentTypes } = useSelector(selectPayment);

  useFocusEffect(
    React.useCallback(() => {
      setSearchQuery(searchedQuery); // prefill search value in case a user searched something from the home screen
    }, [searchedQuery])
  );

  useEffect(() => {
    groupOrders(searchQuery);
  }, [searchQuery]);

  const searchOrder = (query) => {
    setSearchQuery(query);
  };

  const [sections, setSections] = React.useState([]);

  const groupOrders = (searchQuery) => {
    const sections = [];

    let allLogs = [...logs];
    // let allLogs = [...LECTURERLOGS];
    if (searchQuery) {
      searchQuery = searchQuery.toLowerCase();
      allLogs = allLogs?.filter((log) => {
        return (
          log.name?.toLowerCase().includes(searchQuery) ||
          // log.Patient?.toLowerCase().includes(searchQuery) ||
          log.txn_id?.toString().toLowerCase().includes(searchQuery)
        );
      });
    }
    // take the orders and group them by date
    const grouped = _.groupBy(allLogs, (log) => {
      return log.createdAt.substring(0, 10);
    });

    const groupKeys = _.keys(grouped).sort();
    _.forEach(groupKeys, (key) => {
      const section = { data: grouped[key], key };
      sections.push(section);
    });
    setSections(sections.reverse());
  };

  const gotoLogDetails = (item) => {
    const paymentType = allPaymentTypes.find(
      (d) => d._id === item.payment_id
    );

    navigation.navigate('PaymentReceipt', {
      name: item.name,
      paymentType: paymentType,
      date: item.createdAt,
      paidWith: 'Card',
      txn_id: item.txn_id,
      txn_ref: item.txn_ref,
      amount: item.amount,
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  function refreshPage() {
    dispatch(fetchPaymentLogs());
    setRefreshing(true);
    // dispatch(toggleFullIsLoading());
  }

  useEffect(() => {
    if (status === logStates.FETCHED) {
      setRefreshing(false);
      groupOrders(searchQuery);
      dispatch(toggleFullIsLoading());
      // dispatch(resetLogsStatus());
    }
  }, [status]);

  return (
    <View style={styles.content}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginRight: 10,
        }}
      >
        <Searchbar
          style={{ flex: 1, maxHeight: 40 }}
          inputStyle={{ fontSize: 16, lineHeight: 21 }}
          placeholder="Search by name or keyword"
          value={searchQuery}
          onChangeText={(query) => searchOrder(query)}
        />
      </View>

      <View
        style={{
          width: '100%',
          flex: 1,
          marginBottom: 0,
          marginTop: 15,
          marginLeft: -8,
        }}
      >
        <SectionList
          ItemSeparatorComponent={Divider}
          sections={sections}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshPage}
            />
          }
          renderSectionHeader={({ section }) => (
            <List.Subheader
              style={{
                backgroundColor: theme.color.primary400,
                color: '#fff',
              }}
            >
              {section.key}
            </List.Subheader>
          )}
          renderItem={({ item }) => (
            <PaymentLogItem
              log={item}
              // selectable={selectable}
              // selected={selected}
              dispatch={dispatch}
              logPressed={() => gotoLogDetails(item)}
            />
          )}
        />
        {/* <FlatList
          data={LECTURERLOGS}
          keyExtractor={(item) => item.id}
          renderItem={PaymentLogItem}
        /> */}
      </View>
    </View>
  );
};

export default PaymentLogsScene;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'archivo-regular600',
    fontSize: 16,
  },
  paymentItem: {
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  glanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
