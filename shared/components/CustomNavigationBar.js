import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Menu, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { theme } from '../../constants';
import useUser from '../../hooks/useUser';
import { logoutAction } from '../../slices/globalSlice';
import { Column, Row } from '../../utilities/components/common';

const CustomNavigationBar = (props) => {
  const title = props.options.headerTitle || '';
  const index = props.options.tabIndex || 0;
  const dispatch = useDispatch()
  const { backgroundColor } = props.options.headerStyle;

  const navigator = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { user, role, full_name, isStudent } = useUser();

  const handleLogout = async ()=> {
    dispatch(logoutAction());
    navigator.navigate('GetStarted');
  };

  if (index === 0) {
    // Student
    if (isStudent) {
      return (
        <>
          <View
            style={{ padding: 20, backgroundColor: backgroundColor }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 40,
              }}
            >
              <Row style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 12,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/images/user-1.jpg')}
                  // source={{
                  //   uri: 'https://waeup.uniben.edu/students/B1089810/passport.jpg',
                  // }}
                />
                <Column>
                  <Text style={styles.boldText}>
                    {full_name} (
                    <Text style={[styles.matNo, styles.boldText]}>
                      {user.matNo}
                    </Text>
                    )
                  </Text>
                  <Text style={styles.role}>
                    {role.n}
                  </Text>
                </Column>
              </Row>
              {/* <View style={{ flex: 1 }}>
                <Image
                  style={{ width: 134, height: 40 }}
                  source={require("../../assets/images/logo-name.png")}
                />
              </View> */}
              {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Appbar.Action
                  icon={require('../../assets/images/bell-notification.png')}
                  onPress={() => {}}
                  color={theme.color.primary400}
                />
              </View> */}
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Menu
                  style={{ marginTop: 40 }}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<IconButton onPress={openMenu} style={{ margin: 0 }} size={25} icon="dots-vertical" />}
                >
                  <Menu.Item
                    icon={() => <IconButton style={{ margin: 0 }} icon="logout" />}
                    onPress={() => handleLogout()}
                    title="Logout"
                  />
                </Menu>
              </View>
            </View>
          </View>
        </>
      );
    } else { // Lecturer
      return (
        <>
          <View
            style={{ padding: 20, backgroundColor: backgroundColor }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 40,
              }}
            >
              <Row style={{ flex: 1, alignItems: 'center' }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 12,
                    borderRadius: 20,
                  }}
                  source={require('../../assets/images/user-1.jpg')}
                  // source={{
                  //   uri: 'https://waeup.uniben.edu/students/B1089810/passport.jpg',
                  // }}
                />
                <Column>
                  <Text style={styles.boldText}>
                    {full_name}
                  </Text>
                  <Text style={styles.role}>
                    {role.n}
                  </Text>
                </Column>
              </Row>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Menu
                  style={{ marginTop: 40 }}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={<IconButton onPress={openMenu} style={{ margin: 0 }} size={25} icon="dots-vertical" />}
                >
                  <Menu.Item
                    icon={() => <IconButton style={{ margin: 0 }} icon="logout" />}
                    onPress={() => handleLogout()}
                    title="Logout"
                  />
                </Menu>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.boldText}>Easy & Realiable</Text>
              <Text style={styles.boldText}>Online Payment Portal</Text>
            </View>
          </View>
        </>
      );
    }
  }

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.color.secondary,
      }}
    >
      <Appbar.Content
        title={title}
        titleStyle={{
          fontSize: 24,
          fontFamily: 'archivo-regular600',
        }}
      />
    </Appbar.Header>
  );
};

export default CustomNavigationBar;

const styles = StyleSheet.create({
  boldText: {
    fontFamily: 'archivo-regular600',
    fontSize: theme.fontSize.subTitle,
    lineHeight: 24,
  },
  matNo: {
    textTransform: 'uppercase',
  },
  role: {
    fontFamily: 'archivo-regular',
    fontSize: theme.fontSize.button,
  },
});
