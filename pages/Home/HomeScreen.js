import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image,TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
  clientId: '1023607094536-i7qtl36lptt6pr2o5npd8fc5ne9qcsf4.apps.googleusercontent.com'  
});


import ClientMapsScreen from '../Client/ClientMapsScreen.js';


class HomeScreen extends React.Component {

  /*
  *
  */   
  state = {
    show: false,
    userInfo: false
  }


  /*
  *
  */    
  constructor(props) {
    super(props);
  }

  /*
  *
  */    
  componentDidMount(){
    this.getCurrentUserInfo();
  }

  /*
  *
  */    
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
       this.props.navigation.navigate('ClientMaps');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  goMaps(){
    this.props.navigation.navigate('ClientMaps');
  }  
  
  /*
  *
  */  
  getCurrentUserInfo = async ( ) => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo }); 
      this.props.navigation.navigate('ClientMaps');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };  
  /*
  *
  */
  render(){ 
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/logo.png')}
          />
        </View>

        { !this.state.userInfo && 
        <TouchableOpacity
          title="Login com GOOGLE..."
          onPress={() => this.signIn()}
          style={styles.loginScreenButton}
        >
          <Image
            source={require('../../assets/google.png')}
          />
        </TouchableOpacity> }
      </View>
    );
 }

};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: "30%"
  },
  mapMarker: {
    height: 42,
    width: 42
  },  
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:1,
    paddingBottom:1,
    backgroundColor:'#bbbbbb',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }


});