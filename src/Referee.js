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
  TextInput,
} from 'react-native';
import * as firebase from 'firebase'
import { WebBrowser,Constants, Permissions,BarCodeScanner} from 'expo';
export default class Referee extends Component{
  constructor(props){
    super(props)
    this._requestCameraPermission()
  }
  state={
    text:"",
    competition:null,
    team:null,
    player:null,
    hasCameraPermission: null,
    Scanned_QR: null,
    name:null
  }
  randomString  (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return "R"+text;
  }
  give_name=(adress)=>{
  //  alert(this.state.Scanned_QR)

    firebase.database().ref('users/' + adress).once('value', (snapshot) => {
      if(snapshot && snapshot.val()){
        //snaphost.val().all_slaves[slave_1]
        const referee_1 = snapshot.val().all_referees.referee_1;
        const referee_2 = snapshot.val().all_referees.referee_2;
        const referee_3 = snapshot.val().all_referees.referee_3;
        var name = this.randomString(6)
        //  alert(adress)
        if (referee_1 === "null" ){
          firebase.database().ref('users/'+adress+'/all_referees').update({
            referee_1: name
          });
        } else {
          if (referee_2 === "null"){
            firebase.database().ref('users/'+adress+'/all_referees').update({
              referee_2: name
            });
          } else {
            if (referee_3 === "null"){
              firebase.database().ref('users/'+adress+'/all_referees').update({
                referee_3: name
              });
            } else{
              alert("There are only 3 referees")
            }
          }
        }
        this.setState({
          name:name
        });
        alert(this.state.name)
      } else {
        //alert(snapshot.val())
      }
    })
  }

  _requestCameraPermission = async () => {


    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
    alert("You should scan QR")
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.Scanned_QR) {
      LayoutAnimation.spring();
      this.setState({ Scanned_QR: result.data });
      this.give_name(result.data)
    }
  };
  send (){
    firebase.database().ref('users/' + this.state.Scanned_QR+"/all_referees"+"/"+this.state.name).update({
      info:this.state.text
    })
  }

  render() {
    if (this.state.Scanned_QR){
      return (
        <View style={{padding: 10}}>
        <TextInput
        style={{height: 40}}
        placeholder="Write something"
        onChangeText={(text) => this.setState({text})}
        />
        <Button
        onPress={() => {this.send()}}
        title="send to firebase"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
        </View>
      )

    }else {
      return (
        <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Loading ..</Text>
          : this.state.hasCameraPermission === false
          ? <Text style={{ color: '#fff' }}>
          Camera permission is not granted
          </Text>
          : <BarCodeScanner
          onBarCodeRead={(result) => {this._handleBarCodeRead(result)}}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          />}



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
  export {Referee}
