import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button,Text} from 'react-native-elements'
import { getGlobal, useState,useEffect} from 'reactn';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '212482763761-mruajr7ubsvc6s4kbr0et4g8vi97shmi.apps.googleusercontent.com',
});
const Profile = ({ route,navigation }) => {
    const [name,setname] = useState('')
    const [loadinga,setloada] = useState(false)
    const [loadingg, setloadg] = useState(false)
    const [loadingout, setloadout] = useState(false)
    //const userDocument = firestore()
     // .collection('users')
     // .doc('8mFfPV208OjFiRM6hP7x')
      //.onSnapshot(doc=>{
       //   setname(doc.data().name)
     // })
      //;
  async function onGoogleButtonPress() {
    setloadg(true)
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    setloadg(false)
    return auth().signInWithCredential(googleCredential);
  }
    const addDeck=async()=>{
        console.log('running')
        firestore()
          .collection('users')
          .add({
            name: 'New Deck',
            contents: [
              {hey: 'bruh', nice: 'good'},
              {hey: 'bruh', nice: 'good'},
              {hey: 'bruh', nice: 'good'},
            ],
          });
    }
    console.log('herer',getGlobal().Decks)
    //console.log(userDocument,'ugoi')
      const [initializing, setInitializing] = useState(true);
      const [user, setUser] = useState();

      // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }
      
      const anonymousSignIn=()=>{
        setloada(true)
        auth()
          .signInAnonymously()
          .then(() => {
            console.log('User signed in anonymously');
          })
          .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }

            console.error(error);
          });
          setloadg(false)
      }
      const logOut=()=>{
        setloadout(true)
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
        setloadout(false)
      }
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return null;

      if (!user) {
        return (
          <View style={styles.screen}>
            <Text h1 style={{position:"absolute",left:10,top:30}}>Sign in</Text>
            <Text style={{ position: "absolute", left: 10, top: 90 }}>
              Allows you to Upload and Download Decks
              </Text>
            <Button
              icon={
                <Icon
                style={{marginRight:10}}
                  name="google"
                  size={15}
                  color="black"
                />
              }
              buttonStyle={{ backgroundColor: '#FFF',borderRadius:10}}
              title={<Text style={{color:'black'}}>
                Sign In With Google
              </Text>}
              onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              loading={loadingg}
            />
            <Button
              icon={
                <Icon
                  style={{ marginRight: 10 }}
                  name="user"
                  size={15}
                  color="black"
                />
              }
              buttonStyle={{ borderRadius: 10,margin:30, }}
              title={<Text style={{ color: 'black' }}>
                Use Anonymously
              </Text>}
              type="clear"
              onPress={()=>anonymousSignIn()}
              loading={loadinga}

            />
          </View>
        );
      }else{
      return (
        <View style={styles.screen}>
          <Text h3 style={{ position: "absolute", left: 10, top: 30}}>Welcome {user.displayName}</Text>
          <Button
            icon={
              <Icon
                style={{ marginRight: 10 }}
                name="user"
                size={15}
                color="black"
              />
            }
            buttonStyle={{ borderRadius: 10, margin: 30,  }}
            title={<Text style={{ color: 'black' }}>
              Log Out
              </Text>}
            type="clear"
            onPress={() => logOut()}
            loading={loadingout}

          />
        </View>
      );
          }
}
const styles = StyleSheet.create({
    buttono: {
        marginVertical: 50,
        borderRadius: 18,
        backgroundColor: '#ADAD66',
        padding: 20,
        paddingHorizontal: 50,
        opacity: 0.5

    },
    button: {
        marginVertical: 30,
        borderRadius: 18,
        backgroundColor: '#ADAD66',
        padding: 20,
        paddingHorizontal: 50,
    },
    moji: {
        color: '#FFF',
        fontSize: 20,


    },
    icons: {
        position: 'absolute',
        left: 0,
        marginTop: 23,
        marginLeft: 20
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E0E0DA',
        justifyContent:"center"

    }

})


export default Profile;