'use client'
import { useContext, createContext, useState, useEffect } from "react";
export let GlobalContext = createContext(); //is k zaryaa maa sari jagaa access kroo ga.
import API from "@/services/api";
import { useRef } from "react";
import { setAccessToken } from "@/services/api";
function RootContext({ children }) {
    const [user, setuser] = useState(null);
    const isMounted = useRef(false);//{ismount} yaa iss use kiaa ha k react useEffect ko 2 time chalataa haa.
    // which means that 2 request are send to the backend at the same time using same cookie
    // which can cause triggring the condition when user try to use already isused cookie.
    //useRef value dont change when rerender

    let globalObj = { user, setuser };
    useEffect(() => {
        if (isMounted.current) {
            console.log('⏭️ Session check already ran, skipping...');
            return;
        }
        isMounted.current = true;

        API.get('/auth/check-session')
            .then((res) => {
                if (res.data.success === true) {
                    setuser(res.data.user);
                     setAccessToken(res.data.accessToken);
                } else {
                    console.log(res.data.message);
                }
            })
            .catch((error) => {
                // No session yet — expected on first load, not an error to alarm about
                console.log('No active session:', error.response?.status);
            });
    }, []);
    return (
        <GlobalContext.Provider value={globalObj}>
            {children}
        </GlobalContext.Provider>

    )
}

export default RootContext