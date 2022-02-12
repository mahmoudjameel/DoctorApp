import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card,CardItem,Left, Body, Right, Thumbnail, Text, Icon, Row, H2, Col, Button } from 'native-base';
import {connect} from 'react-redux';
import * as consultationAction from '../../store/actions/consultation';
import {videoCallOpponentsIds} from '../../store/actions/chat/users'
import ChatService from '../../store/chatServices/chat-service'
import {
	localVideoStreamObtained,
	setMediaDevices,
} from '../../store/actions/chat/videoSession'
class TretmentDetalisScreen extends Component {
  state={
    doctor:this.props.navigation.getParam('doctor'),
    doctorId :this.props.navigation.getParam('doctorId'),
    consult_date:'',
    consult_time:'',
    consult_diseases:'',
    notes:''

  }
  componentDidMount(){
    this.setState({
    consult_date:this.props.navigation.getParam('date'),consult_time:this.props.navigation.getParam('time'),
    consult_diseases:this.props.navigation.getParam('for_diseases'),notes:this.props.navigation.getParam('notes')
  })
  console.log(this.props.navigation.getParam('consultation_id'));
  
    this.props.fetchPrescriptions(this.props.navigation.getParam('consultation_id'))
    this.props.fetchDiagnosisReports(this.props.navigation.getParam('consultation_id'))
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
    return (
      <Container>
        <Content>
          <List style={{marginTop:"5%"}}>
            <ListItem avatar >
              <Left/>
              <Body>
                 {/* <Row style={{alignContent:"center",justifyContent:"space-between"}}> */}
                {/* <Icon style={{color:"#009479      "}}  name="phone-call" type="Feather" onPress={()=>this.startVideoCall()}></Icon> */}
                <Thumbnail circular large source={require('../../assets/doctor-avatar.png')} style={{alignContent:"center",alignSelf:"center"}}/>
                {/* <Icon name="message-square" type="Feather" style={{fontSize:24,color:"#009479      "}} onPress={()=>this.startChat()}></Icon>
              </Row> */}
              <Col style={{alignItems:"center"}}>
                  <H2>{this.state.doctor.name}</H2>
                    <Text>{this.state.doctor.spicality.name}</Text>
                    <Text>{this.state.consult_date}  {this.state.consult_time}</Text>
              </Col>
              </Body>
              <Right/>
            </ListItem>
          </List>
          <Card style={{width:"90%",alignSelf:"center"}}>
            <CardItem header>
              <Text>Notes</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   {this.state.notes}
                </Text>
              </Body>
            </CardItem>
         </Card>
          <Card style={{width:"90%",borderRadius:8,alignSelf:"center"}}>
              <List>
                <ListItem  onPress={()=>this.props.navigation.navigate('PatientMedications')}>
                  <Body>
                    <Row>
                    <Icon name="capsules" type="FontAwesome5"></Icon>
                    <Text>Medications</Text>
                    </Row>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" ></Icon>
                  </Right>
                </ListItem>
              </List>
            </Card>
            <Card style={{width:"90%",borderRadius:8,alignSelf:"center"}}>
              <List>
                <ListItem  onPress={()=>this.props.navigation.navigate('TreatmentReport')}>
                  <Body>
                    <Row>
                    <Icon name="file-document-outline" type="MaterialCommunityIcons"></Icon>
                    <Text>Reports</Text>
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
  userDetails:state.userDetails.userDetails,
  consultations:state.consultations.consultations,
  prescriptions:state.prescriptions.prescriptions,
  dignosisReports:state.dignosisReports.dignosisReports
})
const mapDispatchToProps = (dispatch) => ({
  fetchPrescriptions:(consultaion_id)=>dispatch(consultationAction.fetchPrescriptions(consultaion_id)),
  fetchDiagnosisReports:(consultaion_id)=>dispatch(consultationAction.fetchDiagnosisReports(consultaion_id)),
  videoCallOpponentsIds: opponentsIds => dispatch(videoCallOpponentsIds(opponentsIds)),
  localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(TretmentDetalisScreen)