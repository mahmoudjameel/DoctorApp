import React, { Component } from 'react';
import {View,Dimensions,Alert,ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header,Button,Text,
     Content, Form, Item, Input, Label } from 'native-base';
import * as passwordUpdateAction from '../../store/actions/UpdatePassword';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
class UpdatePassword extends ValidationComponent {
    state={
        email:this.props.userInfo.userDetails.email,
        current_password:'',
        new_password:''
    }
    constructor (props){
        super(props)
    }
    onSubmit=()=>{
        this.validate({
          current_password: {required:true},
          new_password:{required:true},
          
        });
        if(this.isFormValid()){
          this.props.updatePassword(
            this.state.email,
            this.state.current_password,
            this.state.new_password
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
        Alert.alert('Alert!',this.props.authInfo.errors,[{text:this.props.language.ok}]);
      }
      if (this.props.authInfo.isSuccess===true) {
        Alert.alert('Alert!',this.props.language.passwordUpdated,[{text:this.props.language.ok}]);
      }
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>{this.props.language.currentPassword}</Label>
              <Input ref='curent_password'  secureTextEntry={true} onChangeText={current_password=>this.setState({current_password})} />
            </Item>
            <Item stackedLabel last>
              <Label>{this.props.language.newPassword}</Label>
              <Input Input ref='new_password' secureTextEntry={true} onChangeText={new_password=>this.setState({new_password})} />
            </Item>
          </Form>
          <View style={{marginTop:"5%"}}>
        <Button rounded style={{width:"75%",
        alignItems:"center",
        alignSelf:"center",
        }} onPress={this.onSubmit}>
            <Text style={{fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
        </Button>
      </View>
        </Content>
      </Container>
    );
  }
}
mapStateToProps = (state) => ({
    authInfo:state.auth,
    userInfo:state.userDetails,
    language:state.selectdLanguage.selectdLanguage,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    updatePassword:(email,current_password,new_password)=>dispatch(passwordUpdateAction.updatePassword(email,current_password,new_password))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(UpdatePassword);