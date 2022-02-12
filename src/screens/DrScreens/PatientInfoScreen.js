import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card,Left, Body, Right, Thumbnail, Text, Icon, Row, H2, Col, Button } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,Alert,ScrollView,Modal} from 'react-native';
import {connect} from 'react-redux';
import * as patientAction from '../../store/actions/patients';
import * as diseaseAction from '../../store/actions/diseases';
import {videoCallOpponentsIds} from '../../store/actions/chat/users'
import ChatService from '../../store/chatServices/chat-service'
import {
	localVideoStreamObtained,
	setMediaDevices,
} from '../../store/actions/chat/videoSession'
class PatientInfoScreen extends Component {
  state={
    appointment_id:this.props.navigation.getParam('appointment_id')
  }
  componentDidMount(){
    console.log(this.state.appointment_id);
    
    this.props.fetchPatientDetails(this.props.navigation.getParam('patientId'));
    this.props.fetchDiseases();
  }
  startChat = () =>{
    
    ChatService.createPrivateDialog(this.props.patientDetails.chat_id.chat_id)
        .then((newDialog) => {
          this.props.navigation.push('DrChat', { dialog: newDialog })
        })
  }
  startVideoCall = () =>{
    this.props.videoCallOpponentsIds([this.props.patientDetails.chat_id.chat_id]);
    this.props.navigation.push('VideoCall')
 }
  render() {
    if(this.props.patientDetails == null){    
      return(    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View> 
        )
  }
    return (
      <Container>
        <Content>
          <List style={{marginTop:"5%"}}>
            <ListItem avatar >
              <Left/>
              <Body>
                {/* <Row style={{alignContent:"center",justifyContent:"space-between"}}>
                <Icon style={{color:"#009479"}} name="phone-call" type="Feather" onPress={()=>this.startVideoCall()}></Icon> */}
                <Thumbnail circular large source={require('../../assets/patient.png')} style={{alignContent:"center",alignSelf:"center"}}/>
                {/* <Icon name="message-square" type="Feather" style={{fontSize:24,color:"#009479"}} onPress={()=>this.startChat()}></Icon>
              </Row> */}
              <Col style={{alignItems:"center"}}>
                  <H2 >{this.props.patientDetails.name}</H2>
                  <Button rounded style={{marginTop:"5%",backgroundColor:"#009479",textAlign:"center",alignSelf:"center"}} onPress={()=>this.props.navigation.navigate({routeName:'Consult',params:{
                    appointment_id:this.state.appointment_id
                  }})}><Text style={{textAlign:"center",marginBottom:"4%"}}>Start Consult</Text></Button>
              </Col>
              </Body>
              <Right/>
            </ListItem>
          </List>
          <Card style={{width:"90%",borderRadius:8,alignSelf:"center",backgroundColor:"#dddddd"}}>
              <List>
                <ListItem onPress={()=>this.props.navigation.navigate('Patients')}>
                  <Body>
                    <Row>
                    <Icon style={{color:"#000"}} name="user" type="Feather"></Icon>
                      <Text style={{color:"#000"}}>Personal Information</Text>
                    </Row>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward"></Icon>
                  </Right>
                </ListItem>
              </List>
            </Card>
        </Content>
      </Container>
    );
  }
}
mapStateToProps =(state)=>({
  patientDetails:state.patientDetails.patientDetails

})
const mapDispatchToProps = (dispatch)=>({
  fetchPatientDetails:(patientId)=>dispatch(patientAction.fetchPatientDetails(patientId)),
  fetchDiseases:()=>dispatch(diseaseAction.fetchDiseaseCategories()),
  videoCallOpponentsIds: opponentsIds => dispatch(videoCallOpponentsIds(opponentsIds)),
  setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
  localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
})
export default connect(mapStateToProps,mapDispatchToProps)(PatientInfoScreen);