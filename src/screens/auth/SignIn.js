import React, { Component } from 'react';
import {View,Dimensions,Alert,ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header, Title, Button,
     Icon, Left, Right,Form,Item,Label,Text, Input } from "native-base";
import styles from '../styles/auth/SignIn';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import * as signInAction from '../../store/actions/auth'


class SignIn extends ValidationComponent {
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
      this.props.postSignIn(
        this.state.email,
        this.state.password,
        ) 
    }
  }

  render() {
    if(this.props.authInfo.isLoading===true){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#009479" />
      </View>
      )
    }
    if(this.props.authInfo.isError===true){
      Alert.alert('Alert!',this.props.authInfo.errors,[{text:'Ok'}]);
    }
    if (this.props.authInfo.isSuccess===true) {
      this.props.navigation.navigate('Home');
    }
    return (
      <View style={{marginTop:"5%"}}>
          {/* <View style={{flex: 1,alignItems: 'center',marginTop:"2%"}}>
            <View style={{backgroundColor:"#fff",borderColor:"#ddd",shadowColor:"#ddd",shadowOffset:{ width: 0, height: 2 },shadowOpacity: 1.8, shadowRadius: 4, borderWidth:1,borderRadius:8,marginTop:"2%"}}>
                <Icon name="user" type="FontAwesome" style={{fontSize:50, color:"#009479",padding:15}}></Icon>
            </View>
          </View> */}
        <View style={styles.phoneSignInForm}>
            <Item error={this.isFieldInError('email')?true:false} rounded style={styles.phoneInput}>
              <Icon active name='ios-mail'/>
              <Input ref='email' placeholder={this.props.language.email} onChangeText={email=>this.setState({email})} value={this.state.email}/>
            </Item>
            <Item error={this.isFieldInError('password')?true:false} rounded last style={styles.phoneInput}>
              <Icon active name='form-textbox-password' type='MaterialCommunityIcons'/>
              <Input ref='password' placeholder={this.props.language.password} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
            </Item>
        </View>
        <View>
            <Text style={{fontSize:14,textDecorationLine:"underline",textAlign:"right",marginRight:"10%"}} onPress={()=>this.props.navigation.navigate('ForgetPassword')}>{this.props.language.forgetpassword}</Text>
        </View>
        <View style={{marginTop:"8%"}}>
          <Button rounded style={{width:"60%",backgroundColor:"#009479",
              alignItems:"center",
              alignSelf:"center",
            }} onPress={this.onSubmit}> 
            <Text style={{ fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
      </Button>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",marginTop:"7%",marginBottom:"7%"}}>
            <Text style={{fontSize:14,}} onPress={()=>this.props.navigation.navigate('SignUp')}>NewUser? <Text style={{fontSize:14,textDecorationLine:"underline"}} onPress={()=>this.props.navigation.navigate('SignUp')}>SignUp</Text></Text>
        </View>
      </View>
    );
  }
}

mapStateToProps = (state) => ({
  authInfo:state.auth,
  language:state.selectdLanguage.selectdLanguage,
})

const mapDispatchToProps = (dispatch) => ({
  postSignIn:(email,password)=>dispatch(signInAction.signin(email,password))
});
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);