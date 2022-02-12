import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,View,ScrollView} from 'react-native';
export default class ComingSoon  extends Component{
    constructor (props){
        super(props);
      }
      render(){
          return(
            <ImageBackground source={require('../assets/comingsoon.jpg')} style={{flex:1,width:"100%", height: '100%'}} resizeMode={'stretch'}/>
          );
      }
}