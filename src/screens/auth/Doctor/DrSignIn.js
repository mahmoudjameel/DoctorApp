import React, { Component } from 'react';
import {View,Dimensions,Alert,ActivityIndicator,ScrollView} from 'react-native';
import { Container, Header, Title, Button,
     Icon, Left, Right,Form,Item,Label,Text, Input } from "native-base";
import styles from '../../styles/auth/SignIn';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import * as signInAction from '../../../store/actions/auth'


class DrSignIn extends ValidationComponent {
  state = {
    device : Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    username:'',
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
      username: {required:true},
      password:{required:true},
      
    });
    if(this.isFormValid()){
      this.props.postSignIn(
        this.state.username,
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
      this.props.navigation.navigate('DrHome');
    }
    return (
      <View style={{marginTop:"5%"}}>
          {/* <View style={{flex: 1,alignItems: 'center',marginTop:"2%",}}>
            <View style={{backgroundColor:"#fff",borderColor:"#ddd",borderWidth:1,borderRadius:8,marginTop:"3%",shadowColor:"#ddd",shadowOffset:{ width: 0, height: 2 },shadowOpacity: 1.8, shadowRadius: 4,}}>
                        <Icon name="user-md" type="FontAwesome" style={{fontSize:60, color:"#009479",padding:15}} onPress={()=>this.props.navigation.navigate('BarcodeSearch')}></Icon>
            </View>
        </View> */}

        <View style={styles.phoneSignInForm}>
            <Item error={this.isFieldInError('username')?true:false} rounded style={styles.phoneInput}>
              <Icon active name='user-o' type="FontAwesome"/>
              <Input ref='username' placeholder="username" onChangeText={username=>this.setState({username})} value={this.state.username}/>
            </Item>
            <Item error={this.isFieldInError('password')?true:false} rounded last style={styles.phoneInput}>
              <Icon active name='form-textbox-password' type='MaterialCommunityIcons'/>
              <Input ref='password' placeholder={this.props.language.password} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
            </Item>
        </View>
        <View style={{marginTop:"8%"}}>
          <Button rounded style={{flex:1,alignContent:"center",marginLeft:"20%",width:"60%",height:50,backgroundColor:"#009479"}} onPress={this.onSubmit}>
            <Text style={{fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
          </Button>
        </View>
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",marginTop:"5%",marginBottom:"5%"}}>
            <Text style={{fontSize:14,textDecorationLine:"underline"}} onPress={()=>this.props.navigation.navigate('DrForgetPassword')}>{this.props.language.forgetpassword}</Text>
        {/* <View >
            <Text style={{fontSize:14,}} onPress={()=>this.props.navigation.navigate('DrSignUp')}>NewUser? <Text style={{fontSize:14,textDecorationLine:"underline"}} onPress={()=>this.props.navigation.navigate('DrSignUp')}>SignUp</Text></Text>
        </View> */}
        </View>
      </View>
    );
  }
}

mapStateToProps = (state) => ({
  authInfo:state.drauth,
  language:state.selectdLanguage.selectdLanguage,
})

const mapDispatchToProps = (dispatch) => ({
  postSignIn:(username,password)=>dispatch(signInAction.doctorSignin(username,password)),
});
export default connect(mapStateToProps,mapDispatchToProps)(DrSignIn);