import React from 'react';
import {   Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar
 } from 'react-native';
import * as firebase from 'firebase'
import Slave from './src/Slave'
import Master from './src/Master'
import { WebBrowser,Constants, Permissions} from 'expo';
export default class Component extends React.Component {
  constructor(props){
    super(props)
    var config = {
      apiKey: "AIzaSyDxqDaTcAUR3R6fZwI7PSz5H1yGhVnHHH4",
      authDomain: "location-72fca.firebaseapp.com",
      databaseURL: "https://location-72fca.firebaseio.com",
      projectId: "location-72fca",
      storageBucket: "location-72fca.appspot.com",
      messagingSenderId: "440309375391"
    };

    firebase.initializeApp(config);
  }
  state={
    competition:"belarus 228",
    team:null,
    player:null,
    team_is_register:false,
    is_connected_to_firebase: false,
  }
    componentWillMount(){
  try{
    firebase.database().ref('users/' + this.state.competition).once('value', (snapshot) => {
      if(snapshot && snapshot.val()){
        this.setState({
          team_is_register:true,
          is_connected_to_firebase:true
        });

      } else {
        this.setState({
          team_is_register:false,
          is_connected_to_firebase:true
        });
      }
    })
  } catch(e){
    //  alert("123s")
  }
}

  render() {
    if (this.state.is_connected_to_firebase){
      if (this.state.team_is_register){
        return (
          <Slave/>
        )
      } else {
        return(
          <Master/>
        )
      }
    } else {
      return (
        <Text>Loading ...</Text>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
