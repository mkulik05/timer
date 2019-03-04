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
import Referee from './src/Referee'
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
    if_slave:false,
    is_choose: false,
  }
    componentWillMount(){
}
press(type){
  if (type === "main"){
    this.setState({
       if_slave: false,
       is_choose: true
      });
  } else {
          this.setState({
             if_slave: true,
             is_choose: true
            });
  }
}
  render() {
    if (this.state.is_choose){
      if (this.state.if_slave){
        return (
          <Referee/>
        )
      } else {
        return(
          <Master/>
        )
      }
    } else {
      return (
          <View style={styles.container}>
          <Button
          onPress={() => {this.press("main")}}
          title="start tournament"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
          <Button
          onPress={() => {this.press()}}
          title="join tournament"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
          </View>
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
