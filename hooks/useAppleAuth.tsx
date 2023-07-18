  import { useEffect, useState } from "react";
  import * as AppleAuthentication from 'expo-apple-authentication';

const useAppleAuth = () => {

  // state to hold the availlability status of the device
  const [isAvailable, setIsAvailable] = useState(false)

  //check if apple authentication is available
  useEffect(() => {
    const checkAvailability = async () => {
      const isAppleAvailable = await AppleAuthentication.isAvailableAsync()
      setIsAvailable(isAppleAvailable)
    }
    checkAvailability()
  }, [])

  //request for user details
  const onSignIn = async () => {
    try {
        const credential = await AppleAuthentication.signInAsync({
          requestedScopes: [
            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
            AppleAuthentication.AppleAuthenticationScope.EMAIL,
          ],
        });

        //do something here with the credential if successful
      } catch (e:any) {
        if (e.code === 'ERR_REQUEST_CANCELED') {
          // handle that the user canceled the sign-in flow
        } else {
          // handle other errors
        }
      }
  }


  //define button styles according to the expo-apple docs
  const getAppleAuth = () => {
    return <AppleAuthentication.AppleAuthenticationButton
    buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
    cornerRadius={5}
    onPress={onSignIn}
    style={{width:'30%', height:50}}
  />
  }

  return {getAppleAuth, isAvailable}

  } 

  export default useAppleAuth