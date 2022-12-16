import React from 'react';
import { useSelector } from 'react-redux';
import { selectGlobal } from '../slices/globalSlice';

const useUser = () => {
  const { loggedInUser: user } = useSelector(selectGlobal);

  return {
    user,
    full_name: `${user.firstname} ${user.lastname}`,
    token: user.token,
  };
};

export default useUser;
