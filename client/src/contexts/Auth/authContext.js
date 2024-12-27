import { createContext, useContext, useEffect, useState } from "react";
import { modalContext } from "../Modal/modalContext";
export const authContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const { closeModal } = useContext(modalContext);

  // Persistent login
  useEffect(() => {
    const checkPersistentLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/auth/checkAuth",
          {
            method: "GET",
            credentials: "include", // Include cookies
          }
        );

        const data = await response.json();
        if (response.ok) {
          setUser(data.data.user); // Update user state
        } else {
          setUser(null); // Clear user state
          // console.error(data.message);
        }
      } catch (error) {
        console.error("Error during persistent login check:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkPersistentLogin();
  }, []);

  // Login
  async function login(email, password) {
    setLoginError(null); //Reset any existing errors
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
      // console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message);
      }
      const { user } = resData.data;
      setUser(user);
      closeModal();
    } catch (error) {
      // console.log(error);
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Signup
  async function signup(email, username, password, confirmPassword) {
    setSignupError(null);
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
        credentials: "include", //include cookies
        body: JSON.stringify(userData),
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
      setSignupError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      // Send a request to the server to clear the JWT cookie
      const response = await fetch("http://localhost:4000/api/v1/auth/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      // Clear client-side authentication state
      setUser(null);
      // console.log("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  }
  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        loginError,
        signupError,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
