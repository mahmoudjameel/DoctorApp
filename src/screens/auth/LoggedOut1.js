import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableHighlight,ImageBackground,
    ScrollView,
    Dimensions,
    StyleSheet,
    I18nManager,
    Platform
    
  } from 'react-native';
import {
    Container, Header, Button, Text,
    Content, Form, Item, Input, Label, Icon, List, ListItem, Left, Body, Right,Title
} from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from '../styles/auth/LoggedOut';
import {connect} from 'react-redux';
import UserSignIn from './SignIn';
import DrSignIn from './Doctor/DrSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoggedOut extends Component{
  state = {
    device: Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    selectdLanguage:'',
    user_type:'patient',
  }
  constructor (props){
    super(props);
    Dimensions.addEventListener("change",dims =>{
      this.setState({
        tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
        phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
      })
    })
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
      
    const value = await AsyncStorage.getItem('authData')
    this.props.navigation.navigate(value !==null?'App':'Auth');
    
}
  
  onLogin(){
    alert("onLogin");
  }
  onSignUp(){
    alert(Dimensions.get("window").height);
  }
  
  render() {
    const { width } = Dimensions.get('window');
  return(
    
    <Container>

      <Content>
        <ImageBackground source={require('../../assets/top.jpg')} style={inStyles.image}>
        </ImageBackground>
          <View>
              {/* <Image source={require('../../assets/BACKGRROYAL.png')}  style={{ width: width * 0.8, height: width * 0.2 * 2.16,alignItems:"center",alignSelf:"center", }} resizeMode={'contain'} ></Image> */}
              <Text style={ this.state.phoneMode == "landscape" ? styles.phoneWelcomeTextLview:styles.phoneWelcomeText}> Choose Account Type </Text>
          </View>
          <View>
            <Grid style={{ marginTop: "5%" }}>
                <Col style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ user_type: "patient" })}>
                    
                    <Icon name='user' type="FontAwesome" onPress={() => this.setState({ user_type: "patient" })} style={this.state.user_type == "patient" ? {fontSize:60,color:"#009479"} : {fontSize:40,color:"grey"}}/>
                    <Text onPress={() => this.setState({ user_type: "patient" })} style={this.state.user_type=="patient" ? { marginTop: "2%",color:"#4eb9cb" }:{ marginTop: "2%",color:"grey" }}>Patient</Text>
                </Col>
                <Col style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ user_type: "doctor" })}>
                    <Icon name='user-md' type="FontAwesome" onPress={() => this.setState({ user_type: "doctor" })} style={this.state.user_type == "doctor" ? {fontSize:60,color:"#009479"}:{fontSize:40,color:"grey"}}/>
                    <Text onPress={() => this.setState({ user_type: "doctor" })} style={this.state.user_type=="doctor" ? { marginTop: "2%",color:"#4eb9cb" }:{ marginTop: "2%",color:"grey" }}>Doctor</Text>
                </Col>
            </Grid>
        </View>
        {this.state.user_type == "patient" ? <UserSignIn {...this.props}/> : <DrSignIn {...this.props} />}
        </Content>
      </Container>
  );
  }
}
const inStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:300,
    width:"100%",
  }
});
mapStateToProps = (state) => ({
  language:state.selectdLanguage.selectdLanguage,
})

export default connect(mapStateToProps)(LoggedOut);