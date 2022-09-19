import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    token: "",
    loggedIn: false,
    authenticate: (token) => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    useEffect(() => {
        async function getToken() {
            const tokenStore = await AsyncStorage.getItem("token");
            if (tokenStore) {
                setAuthToken(tokenStore);
                console.log("Auth token stored");
            }
        }
        getToken();
    }, []);

    function authenticate(token) {
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    }

    function logout() {
        AsyncStorage.removeItem("token");
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        loggedIn: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;