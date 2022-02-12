import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  Footer,
  Fab,
  FooterTab,
  ListItem,
  Card,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
  Row,
  H2,
  Col,
  Button,
  H3,
  H1,
} from 'native-base';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import * as doctorAuthAction from '../../store/actions/auth';
import * as signOutAction from '../../store/actions/auth';
import * as appointmentsAction from '../../store/actions/appointments';
import * as doctorDetailsAction from '../../store/actions/doctorDetails';
// import ConnectyCube from 'react-native-connectycube';
import moment from 'moment';
// import IncomingCall from 'react-native-incoming-call';

import {
  videoSessionObtained,
  userIsCalling,
  callInProgress,
  remoteVideoStreamObtained,
  localVideoStreamObtained,
  clearVideoSession,
  clearVideoStreams,
  setMediaDevices,
  setActiveVideoDevice,
} from '../../store/actions/chat/videoSession';
import CallingService from '../../store/videoChatServices/call-service';
class DrHomeScreen extends Component {
  state = {
    session: null,
    upcomingAppointments:null,
  };
componentWillMount(){
  this.setState({upcomingAppointments:null})
}
  async componentDidMount() {
    
    await this.props.fetchDoctorAvailablity(this.props.userDetails.id);
    await this.props.fetchUpcomingAppointments(this.props.userDetails.id);
    await this.props.fetchDoctorDetails(this.props.userDetails.id);
    this.setState({upcomingAppointments:this.props.upcomingAppointments})
    // this.setupListeners();
  }
  componentDidUpdate() {
    if (
      this.props.doctorAvailablity != null &&
      this.props.doctorAvailablity.length == 0
    ) {
      Alert.alert(
        'You have not selected the avilablity slot',
        'press OK to select',
        [
          {
            text: this.props.language.ok,
            onPress: () => this.props.navigation.navigate('Availability'),
          },
        ],
        {cancelable: false},
      );
    }
  }
  onPressSignOut = () => {
    this.props.signOut((props = this.props));
  };

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

  render() {
    const renderAppointmentsList = data => {
      let age = moment().diff(
        moment(data.item.patient.dob, 'YYYY-MM-DD'),
        'years',
      );
      return (
        <List style={{width: '90%'}}>
          <ListItem
            thumbnail
            onPress={() =>
              this.props.navigation.navigate({
                routeName: 'PatientInfo',
                params: {
                  patientId: data.item.patient.id,
                  appointment_id: data.item.id,
                },
              })
            }>
            <Left>
              <Thumbnail source={require('../../assets/patient.png')} />
            </Left>
            <Body>
              <Text>{data.item.patient.name}</Text>
              {data.item.patient.gender == 'M' ? (
                <Text note style={{fontWeight: 'bold'}}>
                  Male . {age}yrs
                </Text>
              ) : (
                <Text note style={{fontWeight: 'bold'}}>
                  Female . {age}yrs
                </Text>
              )}
            </Body>
            <Right>
              <Text>{data.item.time_slot}</Text>
            </Right>
          </ListItem>
        </List>
      );
    };
    if (
      this.props.doctorAvailablity == null ||
      this.state.upcomingAppointments == null ||
      this.props.doctorDetails == null
    ) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      );
    }
    return (
      <Container>
        <Content>
          <Card
            style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <ListItem avatar>
              <Left />
              <Body>
                <Row>
                  <Thumbnail
                    circular
                    large
                    source={require('../../assets/doctor-avatar.png')}
                  />
                  <Col style={{alignSelf: 'center'}}>
                    <H2
                      onPress={() =>
                        this.props.navigation.navigate('DrProfile')
                      }>
                      Welcome Doctor
                    </H2>
                    <H3
                      onPress={() =>
                        this.props.navigation.navigate('DrProfile')
                      }>
                      {this.props.doctorDetails.name}
                    </H3>
                  </Col>
                </Row>
              </Body>
              <Right />
            </ListItem>
          </Card>
          <H3 style={{margin: '5%', textAlign: 'center'}}>
            Appointments for today
          </H3>
          {this.props.upcomingAppointments.length > 0 ? (
            <Card
              style={{
                height: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <FlatList
                data={this.state.upcomingAppointments}
                keyExtractor={item => item.id.toString()}
                renderItem={renderAppointmentsList}
                extraData={this.state}
              />
            </Card>
          ) : (
            <Card style={{height: '100%', borderRadius: 20}}>
              <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                No appointments!
              </Text>
            </Card>
          )}
        </Content>
        <Footer style={{backgroundColor: 'transperent'}}>
          {/* <Fab
            style={{backgroundColor: '#BF2032'}}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('DrChatDialogs')}>
            <Icon name="message-square" type="Feather" />
          </Fab> */}
        </Footer>
      </Container>
    );
  }
}
mapStateToProps = state => ({
  userDetails: state.userDetails.userDetails,
  language: state.selectdLanguage.selectdLanguage,
  doctorAvailablity: state.doctorAvailablity.doctorAvailablity,
  upcomingAppointments: state.upcomingAppointments.upcomingAppointments,
  doctorDetails: state.doctorDetails.doctorDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchDoctorAvailablity: doctorId =>
    dispatch(doctorAuthAction.fetchDoctorAvailablity(doctorId)),
  fetchUpcomingAppointments: doctorId =>
    dispatch(appointmentsAction.fetchUpcomingAppointments(doctorId)),
  fetchDoctorDetails: doctorId =>
    dispatch(doctorDetailsAction.fetchDoctorDetails(doctorId)),
  signOut: props => dispatch(signOutAction.signOut(props)),
  // videoSessionObtained: videoSession =>
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrHomeScreen);
