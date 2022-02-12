'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry,Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';
import {connect} from 'react-redux';

class BarcodeSearchScreen extends PureComponent {
      constructor (props){
        super(props);
        }
        
      onBarCodeRead = (e) => {
        const products = this.props.medications
    
        let searchProduct = null
         searchProduct = products.find(prod=>prod.barcode==e.data)
         console.log(searchProduct);
        if(searchProduct== null){
          this.props.navigation.navigate({
            routeName: 'ProductNotFound',
            params: {
              barCode: e.data,
              headerTitle:this.props.language.searchResult,
              type:'Medications'
            }
          });
        }
        else{
          this.props.navigation.navigate({
          routeName: 'BarcodeSearchDetails',
          params: {
            medicationId: searchProduct.id,
          headerTitle:this.props.language.searchResult,
          type:"medication"
        }
        });
      }
          }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          permissionDialogTitle={'Permission to use camera'}
           permissionDialogMessage={'We need your permission to use your camera phone'}
          onBarCodeRead={this.onBarCodeRead}   
        >
            <BarcodeMask showAnimatedLine={false}/>
        </RNCamera>
      </View>
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
    medications:state.medications.medications,
  userInfo:state.userDetails,
  language:state.selectdLanguage.selectdLanguage,
  
})

export default connect(mapStateToProps)(BarcodeSearchScreen);