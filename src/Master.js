import React,{Component} from 'react';
import {
  Image,
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
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase'
import QRCode from 'react-native-qrcode';
import { WebBrowser,Constants, Permissions} from 'expo';
import randomstringPromise from 'randomstring-promise'
export default class Master extends Component {
  state={
    competition:null,
    team:null,
    player:null,
    key:null,
    referee_1:null,
    referee_2: null,
    referee_3:null
  }
  constructor(props){
    super(props)
    this.setState({
      key:this.randomString(5)
    })
    if (this.state.key){
      this.get_results()
    }
  }
  randomString  (length) {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for(var i = 0; i < length; i++) {
         text += possible.charAt(Math.floor(Math.random() * possible.length));
     }
     return "M"+text;
 }
  get_results(){

    firebase.database().ref('users/' + this.state.key).on('value', (snapshot) => {
      if(snapshot && snapshot.val()){
        //snaphost.val().all_slaves[slave_1]
        const referee_1 = snapshot.val().all_referees.referee_1;
        const referee_2 = snapshot.val().all_referees.referee_2;
        const referee_3 = snapshot.val().all_referees.referee_3;
        this.setState({
          referee_1:referee_1,
          referee_2:referee_2,
          referee_3:referee_1
        })
      }
    })
}

  render() {

    if (this.state.key){
      firebase.database().ref('users/' + this.state.key).set({
        all_referees: {
          referee_1: "null",
          referee_2: "null",
          referee_3: "null"
        }
      });
    }
      return (
        <View style={styles.container}>
        <QRCode
        value={this.state.key}
        size={300}
        bgColor='black'
        fgColor='white'/>
        <Button
        onPress={() => {this.press()}}
        title="I have already scan QR code"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
        </View>

      )

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
