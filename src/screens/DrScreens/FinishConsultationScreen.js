import React, { Component } from "react";
import {Modal,ScrollView,View,FlatList,ActivityIndicator} from 'react-native';
import { Container,Header,Text, Accordion,Content,Fab,Thumbnail,Textarea,Item,Input, Form,Label,Right,Title,Picker,Icon,Button, H3, Left,Body,Footer, List,ListItem, Row, Col, Badge } from "native-base";
import {connect} from 'react-redux';
import {BASE_URL} from '../../store/constants'
import * as ConsultationAction from '../../store/actions/consultation'
import * as appointmentsAction from '../../store/actions/appointments';

class FinishConsultationScreen extends Component{
    state={
        patient_id:'',
        doctor_id:'',
        appointment_id:'',
        weight:'',
        height:'',
        temprature:'',
        notes:'',
        consultingType:'',
        prescribedMedications:[],
        diagnosticReports:[],
        forDiseases:[],
        bloodPressureSystolic:'',
        bloodPressureDystolic:''
    }
    componentDidMount(){
        this.setState({
        doctor_id:this.props.doctorDetails.id,
        patient_id:this.props.patientDetails.id,
        weight:this.props.navigation.getParam('weight'),
        temprature:this.props.navigation.getParam('temprature'),
        bloodPressureSystolic:this.props.navigation.getParam('bloodPressureSystolic'),
        bloodPressureDystolic:this.props.navigation.getParam('bloodPressureDystolic'),
        notes:this.props.navigation.getParam('notes'),
        consultingType:this.props.navigation.getParam('consultingType'),
        prescribedMedications:this.props.navigation.getParam('prescribedMedications'),
        diagnosticReports:this.props.navigation.getParam('diagnosticReports'),
        forDiseases:this.props.navigation.getParam('forDiseases'),
        appointment_id:this.props.navigation.getParam('appointment_id'),
        height:this.props.navigation.getParam('height'),
        })
    }
    
    _onSubmit = ()=>{
        this.props.addConsultationReport(this.state.appointment_id,this.state.doctor_id,this.state.patient_id,this.state.consultingType,this.state.bloodPressureSystolic,this.state.bloodPressureDystolic,
            this.state.temprature,this.state.height,this.state.weight,this.state.notes,this.state.forDiseases,this.state.prescribedMedications,this.state.diagnosticReports)
        this.props.fetchUpcomingAppointments(this.props.userDetails.id)
    }
    render(){
      if(this.props.loadingInfo.isLoading===true){
        return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
        )
      }
      if (this.props.loadingInfo.isSuccess===true) {
        this.props.navigation.navigate('DrHome');
      }
      if(this.props.loadingInfo.isError === true){
        return(
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "10%"}}>
                    <Text style={{ fontSize: 18, margin: 10,fontWeight:"bold"}}> Faild </Text>
                    <Text style={{ fontSize: 16, margin: 10}}> faild to save details , try after some time </Text>
                    <View style={{width: '100%',
                alignItems: 'center',
                alignSelf: 'center',marginTop:"25%"}}>
                  <Thumbnail large source={require('../../assets/payment/faild.png')}/>
                </View>
                    <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>{this.props.navigation.navigate('DrHome'); this.props.dispatchHomeScreen()}}><Text style={{width:"100%",textAlign:"center"}}>Done</Text></Button>
                    </View>
                </View>
        )
      }
        return(
            <Container>
            <Content padder>
                <ListItem noIndent>
              <Body>
                <Text style={{fontWeight:"bold"}}>Drug</Text>
                <Text note>{this.state.prescribedMedications.length} Items added</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent>
              <Body>
                <Text style={{fontWeight:"bold"}}>Reports</Text>
                <Text note>{this.state.diagnosticReports.length} Items added</Text>
            </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <Button rounded style={{width:"60%",alignItems:"center",backgroundColor:"#009479",height:50,marginTop:"15%",alignSelf:"center"}} onPress={()=>this._onSubmit()}>
            <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%",justifyContent:"center"}}>Done</Text>
          </Button>
            </Content>
           
           
           
            </Container>
        )
    }
}
mapStateToProps =(state)=>({
    userDetails: state.userDetails.userDetails,
    patientDetails:state.patientDetails.patientDetails,
    doctorDetails:state.userDetails.userDetails,
    loadingInfo:state.auth,
  })
  const mapDispatchToProps = (dispatch)=>({
    addConsultationReport:(appointment_id,doctor_id,patient_id,consultation_name,blood_pressur_systolic,blood_pressur_diastolic,body_temprature,height,weight,notes,for_diseases,prescriptions,test_reports)=>dispatch(ConsultationAction.addConsultationReports(appointment_id=appointment_id,doctor_id=doctor_id,patient_id=patient_id,consultation_name=consultation_name,blood_pressur_systolic=blood_pressur_systolic,blood_pressur_diastolic=blood_pressur_diastolic,body_temprature=body_temprature,height=height,weight=weight,notes=notes,for_diseases=for_diseases,prescriptions=prescriptions,test_reports=test_reports)),
    dispatchHomeScreen : () => dispatch(ConsultationAction.homeScreen()),
    fetchUpcomingAppointments: doctorId =>
    dispatch(appointmentsAction.fetchUpcomingAppointments(doctorId)),
  })
export default connect(mapStateToProps,mapDispatchToProps)(FinishConsultationScreen)