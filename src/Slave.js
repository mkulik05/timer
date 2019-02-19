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
import { WebBrowser,Constants, Permissions,BarCodeScanner} from 'expo';
export default class Slave extends Component{
  constructor(props){
    super(props)
this._requestCameraPermission()
}
state={
  competition:null,
  team:null,
  player:null,
  hasCameraPermission: null,
  Scanned_QR: null,
}
  _requestCameraPermission = async () => {


    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
    alert("You should scan QR code from child's telephone")
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.Scanned_QR) {
      LayoutAnimation.spring();
      this.setState({ Scanned_QR: result.data });
    }
  };
  render() {
    if (this.state.Scanned_QR){
      return (
      <Text>{this.state.Scanned_QR}</Text>
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
          onBarCodeRead={this._handleBarCodeRead}
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
export {Slave}
