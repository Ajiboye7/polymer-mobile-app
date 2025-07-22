
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { refreshToken, signOut } from "@/redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { showToast } from "@/components/toastConfig";
import { useRouter } from "expo-router";
import { AppState, AppStateStatus } from "react-native";
import { AppDispatch } from "@/redux/store";

const useCheckTokenExpiration = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const appState = useRef(AppState.currentState);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const lastActiveTime = useRef<number>(Date.now());
  const appWasClosed = useRef(false);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
   
    // When app is going from background to closed
    if (appState.current.match(/inactive|background/) && nextAppState === "unknown") {
      appWasClosed.current = true;
    }

    // When app is being reopened
    if (appWasClosed.current && nextAppState === "active") {
      appWasClosed.current = false;
      dispatch(signOut());
      showToast("info", "Session ended", "Please sign in again");
      router.replace("/(auth)/welcome");
      return;
    }

    // Handle background/foreground transitions
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      const timeSinceLastActive = (Date.now() - lastActiveTime.current) / 1000;
      if (timeSinceLastActive > 60) {
        dispatch(signOut());
        showToast("info", "Session expired", "Please sign in again");
        router.replace("/(auth)/welcome");
        return;
      }
    }

    // Update last active time when going to background
    if (nextAppState.match(/inactive|background/)) {
      lastActiveTime.current = Date.now();
    }

    appState.current = nextAppState;
  };

  const refreshTokenIfNeeded = async (expiresIn: number) => {
    if (expiresIn <= 30 && appState.current === "active") {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (error) {
        console.log("Token refresh failed", error);
        dispatch(signOut());
        showToast("error", "Session expired", "Please sign in again");
        router.replace("/(auth)/welcome");
      }
    }
  };

  /*useEffect(()=>{
    console.log('Current App State:', appState.current);
    
    
  }, [appState.current])*/

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
      
    );

    // Additional check when the hook first mounts (in case app was closed and reopened)
    if (appState.current === "active") {
      const timeSinceLastActive = (Date.now() - lastActiveTime.current) / 1000;
      if (timeSinceLastActive > 60) {
        dispatch(signOut());
        showToast("info", "Session expired", "Please sign in again");
        router.replace("/(auth)/welcome");
      }
    }

    return () => {
      subscription.remove();
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    if (!user?.token) return;

    const checkTokenExpiration = () => {
        try {
          const decodedToken: any = jwtDecode(user.token);
          const currentTime = Date.now() / 1000;
          const expiresIn = decodedToken.exp - currentTime;
  
          if(expiresIn <=0){
              if (appState.current === "active") {
                  refreshTokenIfNeeded(expiresIn);
                }
                else{
                  dispatch(signOut());
              console.log("user signed out");
              showToast("error", "Session expired", "Please sign in again");
              router.replace("/(auth)/welcome");
                }
                return
          }
  
          if (timeoutId.current) clearTimeout(timeoutId.current);
          timeoutId.current = setTimeout(() => {
            checkTokenExpiration();
          }, Math.max(expiresIn * 1000, 1000));
        } catch (error) {
          console.log("Error decoding token", error);
        }
      };

    checkTokenExpiration();

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [dispatch, user?.token]);

  return null;
};

export default useCheckTokenExpiration;





