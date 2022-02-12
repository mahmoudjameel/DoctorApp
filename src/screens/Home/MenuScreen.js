import React, { Component } from 'react';
import {StyleSheet,Image,Platform ,ImageBackground,View,ScrollView,Dimensions,ActivityIndicator,Alert,DeviceEventEmitter,Linking} from 'react-native';
import { Container, Header, Title, Content, Tab, Tabs, ScrollableTab, Footer, FooterTab, 
  Button, Left, Right, Body, Icon, Text, Col,Row, Card,List,ListItem } from 'native-base';
import HealthyFood from './HealthyFood'
import ComingSoon from '../ComingSoon';
import {connect} from 'react-redux';
import DrTreatment from './DrTreatment';
import MedicationScreen from './MedicationScreen'
import PesticidesScreen from './PesticidesScreen';
import CosmeticsScreen from './CosmeticsScreen';
import * as productCategoryAction from '../../store/actions/productCategory';
import * as periodsAction from '../../store/actions/periods';
import * as diseaseAction from '../../store/actions/diseases'
import * as productsActions from '../../store/actions/products';
import * as choicesAction from '../../store/actions/choices';
import * as specialistListAction from '../../store/actions/listSpecialist';
// import ConnectyCube from 'react-native-connectycube';
// import IncomingCall from 'react-native-incoming-call';
import * as authAction from '../../store/actions/auth'

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
// } from '../../store/actions/chat/videoSession';
// import CallingService from '../../store/videoChatServices/call-service';


class MenuScreen extends Component {
  state={
    deviceWidth: Dimensions.get("window").width,
    supportedURL:"market://details?id=com.techfielde.androidapp",
    unsupportedURL:"https://play.google.com/store/apps/details?id=com.techfielde.androidapp",
    supportedAppStoreUrl:"itms-apps://itunes.apple.com/app//id1557624832",
    appStoreUrl:"https://apps.apple.com/jo/app/hec-pharmacy/id1557624832#?platform=iphone",
    is_loading : true
  }
  constructor (props){
    super(props);  
  }
  
  _onSearch=()=>{
        
    this.props.navigation.navigate({
      routeName: 'SearchResult',
      params:{
        searchData:this.state.searchData,
        productCatId:this.state.productCatId,
        diseaseCatId:this.state.diseaseCatId,
        periodId:this.state.periodId,
        title:'Search Result'
      }
    })
  
  }
  async componentDidMount() {
    
    this.props.fetchProducts(user_id=this.props.userInfo.userDetails.user_id)
    this.props.fetchDiseases()
    this.props.fetchPeriods()
    this.props.fetchProductsCategories()
    this.props.fetchChoices()
    this.props.fetchSpecialistList()
    // const chatUserData = {login:this.props.userInfo.userDetails.id,password:this.props.userInfo.userDetails.token,name:this.props.userInfo.userDetails.name}
    // await this.props.chatLogin(chatUserData);
    // await this.setupListeners();  
    this.setState({is_loading:false})
  }
  // setupListeners() {
  //   ConnectyCube.videochat.onCallListener = this.onCallListener.bind(this);
  //   DeviceEventEmitter.addListener('endCall', payload => {
  //     CallingService.rejectCall(this.state.session);
  //   });

  //   DeviceEventEmitter.addListener('answerCall', payload => {
  //     const {
  //       videoSessionObtained,
  //       setMediaDevices,
  //       localVideoStreamObtained,
  //       callInProgress,
  //     } = this.props;

  //     videoSessionObtained(this.state.session);

  //     CallingService.getVideoDevices().then(setMediaDevices);

  //     CallingService.getUserMedia(this.state.session).then(stream => {
  //       localVideoStreamObtained(stream);
  //       CallingService.acceptCall(this.state.session);
  //       callInProgress(true);
  //     });
  //     if (payload.isHeadless) {
  //       // Called from killed state
  //       IncomingCall.openAppFromHeadlessMode(payload.uuid);
  //     } else {
  //       // Called from background state
  //       IncomingCall.backToForeground();
  //     }
  //     this.props.navigation.push('VideoCall', {
  //       navigation: this.props.navigation,
  //     });
  //   });
  // }

  // onCallListener(session, extension) {
  //   if (session.initiatorID === session.currentUserID) {
  //     return;
  //   }
  //   this.setState({session});

  //   ConnectyCube.users.get(2495311).then(res => {
  //     console.log(res);
  //     IncomingCall.display(
  //       'callUUIDv4', // Call UUID v4
  //       'Quocs', // Username
  //       'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png', // Avatar URL
  //       `Incomming Call from ${res.user.full_name}`, // Info text
  //       50000, // Timeout for end call after 20s
  //     );
  //   });
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
  //   this.props.navigation.pop();
  // }

  // onSessionConnectionStateChangedListener(session, userID, connectionState) {
  //   console.log(
  //     'onSessionConnectionStateChangedListener',
  //     userID,
  //     connectionState,
  //   );
  // }

  open_hecpharmacy = async () => {
    const supported = await Linking.canOpenURL(this.state.unsupportedURL);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(this.state.unsupportedURL);
    } else {
      await Linking.openURL(this.state.supportedURL);
    }
   
  }
  open_hecpharmacy_appstore = async () => {
    const supported = await Linking.canOpenURL(this.state.appStoreUrl);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(this.state.appStoreUrl);
    } else {
      await Linking.openURL(this.state.supportedAppStoreUrl);
    }
   
  }
  render() {
    if(this.state.is_loading == true){    
      return(    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View> 
        )
  }
    return (
      <Container>

          


        <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
          <Row >
     
              <Col >
              <Image source={require('../../assets/newlogo.png')} style={{height:80,width:"80%",marginTop:"10%"}}></Image>
        
              </Col>
              <Left/>
              <Col>
                <Icon name="person" type="MaterialIcons" style={{fontSize:50,color:"white",textAlign:"right",marginTop:"15%"}} 
                onPress={()=>this.props.navigation.navigate('Profile')}>
                </Icon>
              </Col>
             
          </Row>
        
        </Header>
        {/* <ImageBackground source={require('../../assets/top-1.png')} style={{width:"100%", height:45}} resizeMode={'stretch'}>
        </ImageBackground>
     */}
        <Content>
  

                    <View style={{flex: 1,alignItems: 'center',marginTop:"5%",}}>
                       <Text style={{fontSize:23,fontWeight:"bold"}}>{this.props.language.searchByBarcode}</Text>
                        <View style={{backgroundColor:"#fff",borderColor:"#009479",borderWidth:1,borderRadius:8,marginTop:"5%"}}>
                        <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{fontSize:40, color:"#009479",padding:15}} onPress={()=>this.props.navigation.navigate('BarcodeSearch')}></Icon>
                        </View>
                        <Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem  onPress={()=>this.props.navigation.navigate('HealthyFood')} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                      <Icon active name='food' type='MaterialCommunityIcons'style={{fontSize:50,color:"#000"}} />
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.healthyfood}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>

<Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem  onPress={()=>this.props.navigation.navigate('DrTreatment')} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                       <Icon active name='user-md' type='FontAwesome' style={{fontSize:50,color:"#000"}}/>
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.DrTreatment}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>
      
<Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem  onPress={Platform.OS === 'ios' ? this.open_hecpharmacy_appstore : this.open_hecpharmacy} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                       <Icon active name='cart-plus' type='FontAwesome' style={{fontSize:50,color:"#000"}}/>
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.hecmedicalstore}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>

<Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem   onPress={()=>this.props.navigation.navigate('Medications')} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                       <Icon active name='moon-o' type='FontAwesome' style={{fontSize:50,color:"#000"}}/>
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.medications}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>
<Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem  onPress={()=>this.props.navigation.navigate('Pesticides')} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                       <Icon active name='sprout' type='MaterialCommunityIcons'style={{fontSize:50,color:"#000"}}/>
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.pesticides}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>
<Card style={{width:"90%",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>
  <List>
    <ListItem   onPress={()=>this.props.navigation.navigate('Cosmetics')} noBorder>
                  <Body>
                    <Row style={{alignItems:"center",justifyContent:'center'}}>
                      <Col style={{width:"30%"}}>
                       <Icon active name='brush' type='MaterialCommunityIcons'style={{fontSize:50,color:"#000"}}/>
                      </Col>
                    <Col style={{width:"70%"}}>
                    <Text style={{fontSize:23,color:"#000",textAlign:"left"}} >{this.props.language.cosmetics}</Text>
                    </Col>
                    
                    </Row>
                  </Body>
                 
                </ListItem>
              </List>

</Card>
    
          </View>
         
          </Content>
      
       
           
      </Container>
    );
  }
}

mapStateToProps=(state)=>({
  availableProducts: state.product,
  userInfo:state.userDetails,
  periods:state.periods.periods,
  diseasesCategories:state.selectDiseases.diseasesCategories,
  productCategories:state.product_categories.availableProductCategories,
  language:state.selectdLanguage.selectdLanguage,
})
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    // chatLogin:(param)=>dispatch(authAction.chatsignIn(param)),
    fetchProductsCategories:()=>dispatch(productCategoryAction.fetchProductCategory()),
  fetchProducts:(user_id)=>dispatch(productsActions.fetchProducts(user_id)),
  fetchPeriods:()=>dispatch(periodsAction.fetchPeriods()),
  fetchDiseases:()=>dispatch(diseaseAction.fetchDiseaseCategories()),
  fetchChoices:()=>dispatch(choicesAction.fetchChoices()),
  fetchSpecialistList:()=>dispatch(specialistListAction.fetchDoctorSpicalists()),
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
export default connect(mapStateToProps,mapDispatchToProps)(MenuScreen);