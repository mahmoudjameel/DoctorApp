import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body, Row, Col, Icon } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {connect} from 'react-redux';
class DrWorkingDetailsScreen extends Component {
  state={
    doctorId :this.props.navigation.getParam('doctorId'),
    doctor:null
  }
  componentDidMount(){
    const doctor = this.props.doctors.filter(doc=>doc.id === this.state.doctorId)
    doctor.map(doctorData=>(
      this.setState({
        doctor:doctorData
      })
    ))
    
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
        <Content style={{marginTop:"5%"}}>
        <Card style={{width:"90%", height:120,justifyContent:"center",backgroundColor:"#009479", borderRadius:30,alignSelf:"center"}}>
           <Row style={{alignItems:"center",marginLeft:"10%"}}>
               <Col >
               <Icon active name='hospital-o' type='FontAwesome' style={{color:"#000",fontSize:40,marginLeft:"10%"}}/>
             
                    <Text style={{color:"white",textAlign:"left"}}>Hospital</Text>
             
               </Col>
              
              
              <Body style={{marginRight:"30%"}}>
                <Text style={{color:"white"}}>
                {this.state.doctor.hospital.name}
                </Text>
                <Text style={{color:"white"}}>
                {this.state.doctor.work_address}
                </Text>
                 </Body>
           
         
            </Row>
         </Card>
         <Card style={{width:"90%", height:120,justifyContent:"center",backgroundColor:"#009479", borderRadius:30,alignSelf:"center"}}>
           <Row style={{alignItems:"center",marginLeft:"10%"}}>
               <Col >
               <Icon active name='address-card' type='FontAwesome' style={{color:"#000",fontSize:35,marginLeft:"10%"}}/>
             
                    <Text style={{color:"white",textAlign:"center",marginRight:"45%"}}>Clinic</Text>
             
               </Col>
              
              
              <Body style={{marginRight:"30%"}}>
                <Text style={{color:"white"}}>
                {this.state.doctor.clinic.name}
                </Text>
                <Text style={{color:"white"}}>
                {this.state.doctor.work_address}
                </Text>
                 </Body>
            </Row>
         </Card>
          </Content>
      </Container>
    );
  }
}
mapStateToProps = (state)=>({
  doctors:state.doctors.doctors
})

export default connect(mapStateToProps)(DrWorkingDetailsScreen);