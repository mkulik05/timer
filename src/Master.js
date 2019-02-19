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
  constructor(props){
    super(props)

  }
  state={
    competition:"belarus 228",
    team:null,
    player:null,
    key:"belarus 228"
  }
  componentWillMount(){
  firebase.database().ref('users/' + this.state.competition).set({
    is_connected: true
  });
}

  render() {
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
export{Master}
