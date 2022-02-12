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

import * as appointmentsAction from '../../store/actions/appointments';

// import ConnectyCube from 'react-native-connectycube';
// import moment from 'moment';

class AppointmentsHistory extends Component {
  state = {
    session: null,
    appointments:null,
  };
componentWillMount(){
  this.setState({appointments:null})
}
  async componentDidMount() {
    console.log(this.props.userDetails);
    await this.props.fetchAppointmentsHistory(this.props.userDetails.id);
    console.log(this.props.appointments);
    this.setState({appointments:this.props.appointments})
    this.setupListeners();
  }

 

  render() {
    const renderAppointmentsList = data => {
     
      return (
        <List style={{width: '90%'}}>
          <ListItem
            thumbnail
            >
            <Left>
              <Thumbnail source={require('../../assets/patient.png')} />
            </Left>
            <Body>
                <Text>{data.item.patient.name}</Text>
                <Text note style={{fontWeight: 'bold'}}>
                  {data.item.appointment_date}
                </Text>
                <Text note style={{fontWeight: 'bold'}}>
                ({data.item.time_slot})
                </Text>
            </Body>
            <Right>
            {data.item.is_attended == true ? (<Text>Attended</Text>):(<Text> Not Attended</Text>)}
              
            </Right>
          </ListItem>
        </List>
      );
    };
    if (
      
      this.state.appointments == null
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
         
          {this.props.appointments.length > 0 ? (
            <Card
              style={{
                height: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <FlatList
                data={this.state.appointments}
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
      </Container>
    );
  }
}
mapStateToProps = state => ({ 
  language: state.selectdLanguage.selectdLanguage,
  appointments:state.doctorAppointmentsHistory.doctorAppointmentsHistory,
  userDetails: state.userDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
fetchAppointmentsHistory : doctor_id => dispatch(appointmentsAction.fetchDoctorAppointmentsHistory(doctor_id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentsHistory);
