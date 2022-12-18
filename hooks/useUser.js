import React from 'react';
import { useSelector } from 'react-redux';
import { ROLESNUMBERS } from '../constants/roles';
import { selectGlobal } from '../slices/globalSlice';
import getRole from '../utilities/getRole';

const useUser = () => {
  const { loggedInUser: user } = useSelector(selectGlobal);

  return {
    user,
    role: getRole(user?.roles),
    isStudent: user
      ? getRole(user?.roles).c < ROLESNUMBERS['Lecturer']
      : null,
    full_name: `${user?.firstname} ${user?.lastname}`,
    token: user ? user?.token : '',
  };
};

export default useUser;
