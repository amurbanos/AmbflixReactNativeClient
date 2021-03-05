import 'react-native-gesture-handler';
import React from 'react';
import { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import '../../global.js'



class SellerMapsScreen extends React.Component {


    state = {
      coords: {
        latitude:  -9.63586324, 
        longitude: -35.69968075
      },
      closerLocations: [],
      show: false
    }

    /*
    *
    *
    */    
    componentDidMount(){
      Geolocation.getCurrentPosition( 
        info => {
          // this.setState( { coords: info.coords } );
        },  
        null, 
        { timeout: (30*1000) }
      );
      //
      fetch( global.base_API + '/api1/locations/get_all_closer_to_user.json' )
        .then((response) => response.json())
        .then((json) => {
          this.setState({closerLocations: json});
          this.setState({show: true});
        })
        .catch((error) => {
          console.error(error);
        }
      );      
    }
    
    /*
    *
    *
    */
    render(){
      if (this.state.show){
        return (
          <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude:  this.state.coords.latitude,
                longitude: this.state.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
            >
              <MapView.Marker
                  coordinate={
                    {
                      latitude: this.state.coords.latitude,
                      longitude: this.state.coords.longitude
                    }
                  }  
                  title={"Minha localização"}
                  description={"Voce está aqui"}                 
              >
                <Image
                  source={require('../assets/home.png')}
                  style={styles.mapMarker}
                />
              </MapView.Marker>


              {this.state.closerLocations.locations.map((closerLocation, index) => (
                <MapView.Marker
                  key={index}
                  image={require('../assets/car-gas.png')}
                  coordinate={
                    {
                      latitude: parseFloat(closerLocation.latitude),  
                      longitude: parseFloat(closerLocation.longitude)
                    }
                  }
                  title={closerLocation.name}
                  description={closerLocation.name}  
                >
                </MapView.Marker>
              ))}

            </MapView>
          </View>
        );
      }
      else
      {
        return(
          <Text>Carregando...</Text>
        )
      }
    }


    renderIfLoaded(){

    }

    
};

export default SellerMapsScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapMarker: {
    height: 42,
    width: 42
  },  
});