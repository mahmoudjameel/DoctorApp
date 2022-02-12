import React from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,ImageBackground ,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
// import ConnectyCube from 'react-native-connectycube'
// import appConfig from '../../app.json'
import AsyncStorage from '@react-native-async-storage/async-storage';


// import * as authAction from '../store/actions/auth';
// import CallingService from '../store/videoChatServices/call-service'
// import ChatService from '../store/chatServices/chat-service'
// import {
//   videoSessionObtained,
//   userIsCalling,
//   callInProgress,
//   remoteVideoStreamObtained,
//   localVideoStreamObtained,
//   clearVideoSession,
//   clearVideoStreams,
//   setMediaDevices,
//   setActiveVideoDevice,
// } from '../store/actions/chat/videoSession'




 class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      // ConnectyCube.init(...appConfig.connectyCubeConfig)
      this._bootstrapAsync();
      // this.setupListeners()
    }
    
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        
        const user = await AsyncStorage.getItem('authData')
        const doctor = await AsyncStorage.getItem('authDoctor')
        const languageValue = await AsyncStorage.getItem('selectedLanguage')
      
        await this.props.selectedLanguage(language=JSON.parse(languageValue))
        if (languageValue !=null){
          if(user !==null && doctor == null){
            this.props.addAuthData(authData = JSON.parse(user) )
            this.props.adduserType(user_type="Patient")
            this.props.navigation.navigate('App');
            // this.autologinchat(user);
          }
          else if(user ==null && doctor !== null){
            this.props.addAuthData(authData = JSON.parse(doctor) )
            this.props.adduserType(user_type="Doctor")
            // await this.autologinchat(doctor)
            this.props.navigation.navigate('Doctor',{navigation:this.props.navigation});

          }
          else if(user ==null && doctor == null){
            this.props.navigation.navigate('Auth');
          }
        }
        else{
          this.props.navigation.navigate('SelectLanguage')
        }
        
    }
    // async autologinchat() {
    //   const checkUserSessionFromStore = await AsyncStorage.getItem("CURRENT_CHAT_USER_SESSION_KEY")
      
    //   if (checkUserSessionFromStore) {
    //     const data = JSON.parse(checkUserSessionFromStore)
    //     await this.props.chatLogin({ login: data.login_id, password: data.password }).then(()=>
    //     {
          
    //       ChatService.setUpListeners()
    //     }).catch(error=>{
    //       console.log({error})
    //       console.log('errorrr *******************');
    //     })
    //   } else { 
    //     console.log("error");
    //   }
    // }

    // setupListeners(){
    //   ConnectyCube.videochat.onUserNotAnswerListener = this.onUserNotAnswerListener.bind(
    //     this,
    //   );
    //   ConnectyCube.videochat.onAcceptCallListener = this.onAcceptCallListener.bind(
    //     this,
    //   );
    //   ConnectyCube.videochat.onRemoteStreamListener = this.onRemoteStreamListener.bind(
    //     this,
    //   );
    //   ConnectyCube.videochat.onRejectCallListener = this.onRejectCallListener.bind(
    //     this,
    //   );
    //   ConnectyCube.videochat.onStopCallListener = this.onStopCallListener.bind(
    //     this,
    //   );
    //   ConnectyCube.videochat.onSessionConnectionStateChangedListener = this.onSessionConnectionStateChangedListener.bind(
    //     this,
    //   );
    // }

    // onUserNotAnswerListener(session, userId) {
    //   CallingService.processOnUserNotAnswer(session, userId);
    //   this.props.userIsCalling(false);
    // }
  
    // onAcceptCallListener(session, userId, extension) {
    //   CallingService.processOnAcceptCallListener(session, extension);
    //   this.props.callInProgress(true);
    // }
  
    // onRemoteStreamListener(session, userID, remoteStream) {
    //   this.props.remoteVideoStreamObtained(remoteStream, userID);
    //   this.props.userIsCalling(false);
    // }
  
    // onRejectCallListener(session, userId, extension) {
    //   CallingService.processOnRejectCallListener(session, extension);
    //   this.props.userIsCalling(false);
    //   this.props.clearVideoSession();
    //   this.props.clearVideoStreams();
    // }
  
    // onStopCallListener(session, userId, extension) {
    //   this.props.userIsCalling(false);
    //   this.props.callInProgress(false);
    //   this.props.clearVideoSession();
    //   this.props.clearVideoStreams();
    //   CallingService.processOnStopCallListener(session, extension);

    // }
  
    // onSessionConnectionStateChangedListener(session, userID, connectionState) {
    //   console.log(
    //     'onSessionConnectionStateChangedListener',
    //     userID,
    //     connectionState,
    //   );
    // }
  

    
  
    // Render any loading content that you like here
    render() {
      return (
        <ImageBackground source={require('../assets/f1.jpg')}  style={styles.image}  >
          <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View> 
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      flex: 1,
     
     resizeMode:"cover",
    }
  });

  const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      addAuthData: (authData) => dispatch({ type: 'GET_USER', user:authData }),
      adduserType: (user_type) => dispatch({ type: 'USER_TYPE', userType:user_type }),
      selectedLanguage: (language) => dispatch({ type: 'SELECT_LANGUAGE', language:language }),
    //   chatLogin:(param)=>dispatch(authAction.chatsignIn(param)),
    //   videoSessionObtained: videoSession =>
    //   dispatch(videoSessionObtained(videoSession)),
    // userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
    // callInProgress: inProgress => dispatch(callInProgress(inProgress)),
    // remoteVideoStreamObtained: remoteStream =>
    //   dispatch(remoteVideoStreamObtained(remoteStream)),
    // localVideoStreamObtained: localStream =>
    //   dispatch(localVideoStreamObtained(localStream)),
    // clearVideoSession: () => dispatch(clearVideoSession()),
    // clearVideoStreams: () => dispatch(clearVideoStreams()),
    // setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
    // setActiveVideoDevice: videoDevice =>
    //   dispatch(setActiveVideoDevice(videoDevice)),

    }
  }
  export default  connect(null,mapDispatchToProps)(AuthLoadingScreen)