import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../constants';
import {
  Column,
  CommonText,
  Row,
} from '../utilities/components/common';
import useUser from '../hooks/useUser';

const ProfileScene = () => {
  const { full_name, user, isStudent, role } = useUser();
  console.log({ user });
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: theme.color.secondary,
      }}
    >
      <Column style={{ alignSelf: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginBottom: 4,
          }}
          source={require('../assets/images/user-1.jpg')}
        />
        <CommonText style={styles.userNameText}>
          {full_name}
        </CommonText>
        {isStudent && (
          <>
            <CommonText style={styles.userEmailText}>
              {user.email}
            </CommonText>
            <CommonText style={styles.matNo}>
              ({user.matNo.toUpperCase()})
            </CommonText>
          </>
        )}
        {!isStudent && (
          <>
            <CommonText style={styles.userEmailText}>
              {role.n}
            </CommonText>
            {/* <CommonText style={styles.matNo}>
              ({user.matNo.toUpperCase()})
            </CommonText> */}
          </>
        )}
      </Column>
    </View>
  );
};

export default ProfileScene;

const styles = StyleSheet.create({
  userNameText: {
    fontSize: 24,
    fontFamily: 'archivo-regular500',
    color: theme.color.neutral700,
  },
  userEmailText: {
    fontSize: 18,
    fontFamily: 'archivo-regular',
    textAlign: 'center',
    marginBottom: 4,
  },
  matNo: {
    fontSize: 16,
    fontFamily: 'archivo-regular',
    textAlign: 'center',
  },
});
