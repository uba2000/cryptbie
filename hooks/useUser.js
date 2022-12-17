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
    isStudent: user?.roles.c < ROLESNUMBERS[user?.roles.c],
    full_name: `${user.firstname} ${user.lastname}`,
    token: user.token,
  };
};

export default useUser;
