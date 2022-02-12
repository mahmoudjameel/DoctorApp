import React, { Component } from 'react';
import {View,Dimensions,Alert,ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header, Title, Button,
     Icon, Left, Right,Form,Item,Body,Label,Text, Input } from "native-base";
import styles from '../../styles/auth/SignIn';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import * as passwordUpdateAction from '../../../store/actions/UpdatePassword'


class ForgetPassword extends ValidationComponent {
  state = {
    device : Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    email:'',
    password:''
  }
  constructor (props){
    super(props);
    Dimensions.addEventListener("change",dims =>{
      this.setState({
        tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
        phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
      })
    })
  }

  onSubmit=()=>{
    this.validate({
      email: {email: true,required:true},
      password:{required:true},
      
    });
    if(this.isFormValid()){
      this.props.updatePassword(
        this.state.email,
        this.state.password,
        ) 
    }
  }

  render() {
    if(this.props.authInfo.isLoading===true){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
      )
    }
    if(this.props.authInfo.isError===true){
      Alert.alert('Alert!',this.props.authInfo.errors,[{text:'Ok'}]);
    }
    if (this.props.authInfo.isSuccess===true) {
      this.props.navigation.navigate('SignIn');
    }
    return (
      <ScrollView style={styles.wrapper}>
  <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" type="MaterialIcons" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.language.forgetpassword}</Title>
          </Body>
          <Right/>
        </Header>
        <View style={styles.phoneSignInForm}>
            <Item error={this.isFieldInError('email')?true:false} rounded style={styles.phoneInput}>
              <Icon active name='ios-mail'/>
              <Input ref='email' placeholder={this.props.language.email} onChangeText={email=>this.setState({email})} value={this.state.email}/>
            </Item>
            <Item error={this.isFieldInError('password')?true:false} rounded last style={styles.phoneInput}>
              <Icon active name='form-textbox-password' type='MaterialCommunityIcons'/>
              <Input ref='password' placeholder={this.props.language.newPassword} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
            </Item>
        </View>
        <View style={{marginTop:"5%"}}>
          <Button rounded style={{width:"60%",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        backgroundColor:"#009479",
        }} onPress={this.onSubmit}> 
            <Text style={{fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = (state) => ({
  authInfo:state.auth,
  language:state.selectdLanguage.selectdLanguage,
})

const mapDispatchToProps = (dispatch) => ({
  updatePassword:(email,new_password)=>dispatch(passwordUpdateAction.forgetPassword(email,new_password))
});
export default connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);