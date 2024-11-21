import { createContext, useContext, useState } from "react";
import { modalContext } from "../Modal/modalContext";

export const authContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { closeModal } = useContext(modalContext);

  // Login
  async function login(email, password) {
    setError(null); //Reset any existing errors
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //Include cookies
        body: JSON.stringify({ email, password }),
      });

      // console.log(response);

      const resData = await response.json();
      console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message);
      }
      const { user } = resData.data;
      setUser(user);
      closeModal();
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Signup
  async function signup(email, username, password, confirmPassword) {
    setError(null);
    setIsLoading(true);
    const userData = {
      email,
      username,
      password,
      confirmPassword,
    };
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", //include cookies
      });
      // console.log(response);

      const resData = await response.json();
      // console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message);
      }
      const { user } = resData.data;
      setUser(user);
      closeModal();
    } catch (error) {
      // console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
  }
  return (
    <authContext.Provider
      value={{ user, isLoading, error, login, signup, logout }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
