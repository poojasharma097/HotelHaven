import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

export const UserContext = createContext({});

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function UserContextProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  // useEffect(() => {
  //   if (!user) {
  //     axios.get('/profile').then(({data}) => {
  //       setUser(data);
  //       setReady(true);
  //     });
  //   }
  // },[user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        setReady(true);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setReady(true);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
}
