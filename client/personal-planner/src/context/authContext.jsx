import axios from "axios";
import { createContext, useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  // setting the state of the current user from  localstorage as when the user log in i will update the local storage based on the data i got from  the response in the api
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  // im using the logIn here to get the data and store it as current user
  const logIn = async (inputs) => {
    const res = await axios.post(`${baseUrl}/auth/login`, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };
  // same for the logout as i want to clear context data as its the same of local storage
  const logOut = async () => {
    await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true });
    setCurrentUser(null);
  };
  // every time a new user details update i set the local storage to that value
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
