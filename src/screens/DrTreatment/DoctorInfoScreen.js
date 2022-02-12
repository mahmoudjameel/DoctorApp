import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card,Left, Body, Right, Thumbnail, Text, Icon, Row, H2, Col, Button } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as fetchAppointmentsActions from '../../store/actions/appointments';
import * as doctorAvailablityAction from '../../store/actions/auth';
import * as doctorDetailsAction from '../../store/actions/doctorDetails';
import {videoCallOpponentsIds} from '../../store/actions/chat/users'
import ChatService from '../../store/chatServices/chat-service'
import {
	localVideoStreamObtained,
	setMediaDevices,
} from '../../store/actions/chat/videoSession'
class DoctorInfoScreen extends Component {
  state={
    doctorId :this.props.navigation.getParam('doctorId'),
    price:this.props.navigation.getParam('price'),
    currency_code:this.props.navigation.getParam('currency_code'),
    doctor:null
  }
  async componentDidMount(){
    const doctor = this.props.doctors.filter(doc=>doc.id === this.state.doctorId)
    await  this.props.fetchDoctorAvailablity(this.state.doctorId)
    await this.props.fetchAppointments(this.state.doctorId)
    await  doctor.map(doctorData=>(
      this.setState({
        doctor:doctorData,

      })
    ))
    await this.props.fetchDoctorDetails(this.state.doctorId)
    
  }
   startChat = () =>{
    
    ChatService.createPrivateDialog(this.props.doctorDetails.chat_id.chat_id)
        .then((newDialog) => {
          this.props.navigation.push('Chat', { dialog: newDialog })
        })
  }
   startVideoCall = () =>{
     this.props.videoCallOpponentsIds([this.props.doctorDetails.chat_id.chat_id]);
     this.props.navigation.push('VideoCall')
  }
  render() {
    if (this.state.doctor ==null ){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
      );
    }
    return (
      <Container>
        <Content>
          <List style={{marginTop:"5%"}}>
            <ListItem avatar>
              <Left/>
              <Body>
   {/* <Row style={{alignContent:"center",justifyContent:"space-between"}}> */}
                {/* <Icon style={{color:"#009479"}}  name="phone-call" type="Feather" onPress={()=>this.startVideoCall()}></Icon> */}
                <Thumbnail circular large source={require('../../assets/doctor-avatar.png')} style={{alignContent:"center",alignSelf:"center"}}/>
                {/* <Icon name="message-square" type="Feather" style={{fontSize:24,color:"#009479"}} onPress={()=>this.startChat()}></Icon> */}
              {/* </Row> */}
              <Col style={{alignItems:"center"}}>
                  <H2 >{this.state.doctor.name}</H2>
                  <Text>{this.state.doctor.spicality.name}</Text>
                      
              </Col>
              <Col style={{alignItems:"center"}}>
              <Button  style={{borderRadius:30,backgroundColor:"#009479",alignItems:"center",alignSelf:"center"}} onPress={()=>this.props.navigation.navigate({
                     routeName: 'DrBooking',   
                     params: {
                       doctorId: this.state.doctorId,
                       price:this.state.price,
                       currency_code:this.state.currency_code,
                     }
                   })}><Text stye={{textAlign:"center"}}>Book Appointment</Text>
                   
                   </Button>
                   </Col>
              </Body>
              <Right/>
            </ListItem>
          </List>
          <Card style={{width:"90%",borderRadius:30,alignSelf:"center",backgroundColor:"#009479"}}>
              <List>
                <ListItem  onPress={()=>this.props.navigation.navigate({
                     routeName: 'DrPersonalInfo',   
                     params: {
                       doctorId: this.state.doctor.id,
                     }
                   })}>
                  <Body>
                    <Row style={{}}>
                    <Icon name="user" type="Feather"></Icon>
                    <Text style={{ color:"white"}}>Personal Information</Text>
                    </Row>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" ></Icon>
                  </Right>
                </ListItem>
              </List>
            </Card>
            <Card style={{width:"90%",borderRadius:30,alignSelf:"center",backgroundColor:"#dddddd"}}>
              <List>
                <ListItem  onPress={()=>this.props.navigation.navigate({
                     routeName: 'DrWorkDetails',   
                     params: {
                       doctorId: this.state.doctor.id,
                     }
                   })}>
                  <Body>
                    <Row>
                    <Icon name="hospital-o" type="FontAwesome"></Icon>
                    <Text style={{ color:"#000"}}>Working Details</Text>
                    </Row>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" ></Icon>
                  </Right>
                </ListItem>
              </List>
              </Card>
        </Content>
      </Container>
    );
  }
}
mapStateToProps = (state)=>({
  doctors:state.doctors.doctors,
  doctorDetails:state.doctorDetails.doctorDetails,
})
const mapDispatchToProps = (dispatch) => ({
  fetchDoctorAvailablity:(doctorId)=>dispatch(doctorAvailablityAction.fetchDoctorAvailablity(doctorId)),
  fetchAppointments:(doctorId)=>dispatch(fetchAppointmentsActions.fetchDoctorAppointments(doctorId)),
  fetchDoctorDetails:(doctorId)=>dispatch(doctorDetailsAction.fetchDoctorDetails(doctorId)),
  videoCallOpponentsIds: opponentsIds => dispatch(videoCallOpponentsIds(opponentsIds)),
  setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
  localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
});
export default connect(mapStateToProps,mapDispatchToProps)(DoctorInfoScreen);
