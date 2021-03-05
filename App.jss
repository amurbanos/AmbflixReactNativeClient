import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientMapsScreen from './pages/Client/ClientMapsScreen.js';
import HomeScreen from './pages/Home/HomeScreen.js';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image,TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  clientId: '1023607094536-i7qtl36lptt6pr2o5npd8fc5ne9qcsf4.apps.googleusercontent.com'  
});

const Stack = createStackNavigator();


class App extends React.Component {

  
  state = {
    userInfo: null
  }


  
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    this.getCurrentUserInfo();
  }
   
  getCurrentUserInfo = async ( ) => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo }); 
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };  

  render(){ 
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          { !this.state.userInfo && <Stack.Screen name="Home" component={HomeScreen} /> }
          { this.state.userInfo && <Stack.Screen name="ClientMapsScreen" component={ClientMapsScreen} /> }
        </Stack.Navigator>
      </NavigationContainer>
    );
 }

};

export default App;

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}