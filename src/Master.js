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
export default class Master extends Component {
  state={
    competition:null,
    team:null,
    player:null,
    key:null,
    info_referee_1:null,
    info_referee_2:null,
    info_referee_3:null,
    referee_1:null,
    referee_2: null,
    referee_3:null,
    QR_has_scanned: null,
    state_had_already_send:null,
  }
  constructor(props){
    super(props)
  }
  componentWillMount(){
    this.setState({
      key:this.randomString(5)
    })
    this.get_results()
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

    firebase.database().ref('users/' + this.state.key).once('value', (snapshot) => {
      //  alert("get get_results")
      if(snapshot && snapshot.val()){
        //snaphost.val().all_slaves[slave_1]
        const referee_1 = snapshot.val().all_referees.referee_1;
        const referee_2 = snapshot.val().all_referees.referee_2;
        const referee_3 = snapshot.val().all_referees.referee_3;
        this.setState({
          referee_1:referee_1,
          referee_2:referee_2,
          referee_3:referee_3
        })
        //  alert("info")
      }
    })
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.get_results()
    }, 1000)
  }
  press (){
    //  alert(this.state.referee_1)

    firebase.database().ref('users/' + this.state.key).on('value', (snapshot) => {
      if(snapshot && snapshot.val()){
        //snaphost.val().all_slaves[slave_1]
        try{
          if (this.state.referee_1 !="null"){
            const info_referee_1 = snapshot.val().all_referees[this.state.referee_1].info;
            this.setState({
              info_referee_1:info_referee_1,
            })
          }
          if (this.state.referee_2 != "null"){
            const info_referee_1 = snapshot.val().all_referees[this.state.referee_1].info;
            const info_referee_2 = snapshot.val().all_referees[this.state.referee_2].info;
            this.setState({
              info_referee_1:info_referee_1,
              info_referee_2:info_referee_2,
            })
          }
          if (this.state.referee_3!="null"){
            const info_referee_1 = snapshot.val().all_referees[this.state.referee_1].info;
            const info_referee_2 = snapshot.val().all_referees[this.state.referee_2].info;
            const info_referee_3 = snapshot.val().all_referees[this.state.referee_3].info;
            this.setState({
              info_referee_1:info_referee_1,
              info_referee_2:info_referee_2,
              info_referee_3:info_referee_3
            })
          }
        } catch(error){
          alert("Error")
        }

      }
    })

    this.setState({
      QR_has_scanned: true
    })

    //alert(this.state.QR_has_scanned)
    this.interval = setInterval(() => {
      this.press()
    }, 1000)

  }
  render() {
    if (this.state.key&& !this.state.state_had_already_send){
      this.setState({
        state_had_already_send: true
      })
      firebase.database().ref('users/' + this.state.key).set({
        all_referees: {
          referee_1: "null",
          referee_2: "null",
          referee_3: "null",
          all_info: {
            referee_1: "null",
            referee_2: "null",
            referee_3: "null",
          }
        }

      });
    }

    if (this.state.key){
      if (!this.state.QR_has_scanned){
        return (

          <View style={styles.container}>
          <QRCode
          value={this.state.key}
          size={300}
          bgColor='black'
          fgColor='white'/>
          <Button
          onPress={this.press.bind(this)}
          title="I have already scan QR code"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
          </View>

        )
      } else {
        return(
          <View style={styles.container}>
          <Text>referee 1: {this.state.info_referee_1}|||
          referee 2: {this.state.info_referee_2}|||
          referee 3: {this.state.info_referee_3}

          </Text>
          </View>
        )
      }
    } else {
      return (<Text>dfdfd</Text>)
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
