'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry,Alert, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';
import * as productAction from '../store/actions/products';
import {connect} from 'react-redux';

class BarcodeSearchScreen extends PureComponent {
      constructor (props){
        super(props);
        }
      onBarCodeRead = (e) => {
        
        
          this.props.navigation.navigate({
          routeName: 'ChampBarcode',
          params: {
            barcode: e.data,
            headerTitle:this.props.language.searchResult,
          }
        });
          }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          permissionDialogTitle={'Permission to use camera'}

            permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={this.onBarCodeRead}   
        >
            <BarcodeMask showAnimatedLine={false}/>
        </RNCamera>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
mapStateToProps = (state) => ({
  availableProducts:state.product,
  userInfo:state.userDetails,
  language:state.selectdLanguage.selectdLanguage,
  
})
const mapDispatchToProps = (dispatch) => ({
  fetchProducts:(user_id)=>dispatch(productAction.fetchProducts(user_id)),
});
export default connect(mapStateToProps,mapDispatchToProps)(BarcodeSearchScreen);