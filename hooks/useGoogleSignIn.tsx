  import { useEffect} from "react";
  import {signInWithCredential, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
  import * as Google from 'expo-auth-session/providers/google'
  import { useRouter } from "expo-router";
  import auth from "../firebaseConfig";

  const useGoogleSignIn = () => {

  const router = useRouter()

  //connect to google
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:'636314185870-4hg7qbjhsoov3vpd4n3029n1qvpu8lqm.apps.googleusercontent.com',
    androidClientId:'636314185870-ai2t8aqqfl0a3f4918d0sdbbgol67ldr.apps.googleusercontent.com'
  })


  //Google sign in authentication
  useEffect(() => {
    //on successful connection, get user details
    if(response?.type === 'success'){
      const {id_token} = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }

    //check the auth status of user and do something
    const sub = onAuthStateChanged(auth, async (user) =>{
      if(user){
      console.log('user from google', user)
      }else{
        console.log('user not authenticated')
      }
    })
  
    //cleanup
    return () => sub()
  }, [response])

  //trigger google auth and navigate to profile page on success
  const handleGoogleAuth = async () => {
    const result = await promptAsync()
    if(result.type === 'success'){
      router.push('/auth/ConfirmAuth')
    }
  }

  return {handleGoogleAuth}
  }

  export default useGoogleSignIn