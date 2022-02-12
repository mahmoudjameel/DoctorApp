import React,{Component} from 'react';
import { Container, Header, Content, List, ListItem, Card,Left, Body,H1, Right, Thumbnail, Text, Icon, Row, H2, Col, Button, Footer, Grid, H3, CardItem, CheckBox } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as fetchAppointmentsActions from '../../store/actions/appointments';
import * as doctorAvailablityAction from '../../store/actions/auth'
import * as insuranceAction from '../../store/actions/insurance'
import AwesomeAlert from 'react-native-awesome-alerts';
import * as DoctorAppointmentsAction from '../../store/actions/appointments'
class SummaryScreen extends Component{
    state={
        isLoading:true,
        doctor_id:this.props.navigation.getParam('doctor_id'),
        staticPrice:this.props.navigation.getParam('price'),
        price:this.props.navigation.getParam('price'),
        currency_code:this.props.navigation.getParam('currency_code'),
        time:this.props.navigation.getParam('time_slot'),
        date:this.props.navigation.getParam('date'),
        month:'',
        doctor:null,
        climbedAmount:'',
        insuranceType:'',
        isInsured:false,
        insuranceDetails:'',
        checkEmployeeInsurance:false,
        checkPersonallInsurance:false,
        discount_by:'',
        showalert:false,
    }
    _showAlert = ()=>{
          
        this.setState({showalert:true})
      
    }
    _deleteAppointment =()=>{
        this.props.deleteDoctorAppointment(this.props.appointmentResponse.doctorAppointmentResponse.appointment_id,this.state.doctor_id)
        this.props.fetchAppointments(this.state.doctor_id)
        this.setState({showalert:false})
      }
      _cancel = ()=>{
            this.setState({showalert:false})
      }
    async componentDidMount(){
        const months =[
            'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
        ]
        const appointment_date = new Date(this.props.navigation.getParam('date'))
        const appointment_month = appointment_date.getMonth()
        const month_string = months[appointment_month]
        this.setState({date:appointment_date.getDate(),month:month_string})
        const doctor = await this.props.doctors.filter(doc=>doc.id === this.state.doctor_id)
        await doctor.map(doctorData=>(
            this.setState({
              doctor:doctorData
            })
          ))
        this.props.fetchMyEmployeerInsurance(this.props.userInfo.userDetails.user_id);
        this.props.fetchMyPersonalInsurance(this.props.userInfo.userDetails.user_id)
        this.setState({isLoading:false})
    }
    _pay = ()=>{
        this.props.navigation.navigate(
            {routeName:'PaymentMethods',
            params:{
            price:this.state.price,
            currency_code:this.state.currency_code,
            appointmentDetails:this.props.appointmentResponse.doctorAppointmentResponse,
            user_id:this.props.userInfo.userDetails.user_id,
            climbedAmount:this.state.climbedAmount,
            insuranceType:this.state.insuranceType,
            isInsured:this.state.isInsured,
            insuranceDetails:this.state.insuranceDetails,
            discount_by:this.state.discount_by
        }
    })
    }
    _climbEmployeeInsurance = ()=>{
        if (this.state.checkEmployeeInsurance==true) {
            this.setState({checkEmployeeInsurance:false,climbedAmount:'',insuranceType:'',insuranceDetails:'',isInsured:false,discount_by:''})
            if (this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount_by == 'P'){
                const discountPercentage = this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount;
                let discountCost = this.state.staticPrice
                const totalCost = this.state.staticPrice
                this.setState({price:totalCost})
            }
            else{
                const totalCost = this.state.staticPrice
                this.setState({price:totalCost})
            }
            
        }
        else{
            this.setState({checkEmployeeInsurance:true,checkPersonallInsurance:false,insuranceType:'Employee',insuranceDetails:this.props.myEmployeerInsurance.myEmployeerInsurance,isInsured:true})
            if (this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount_by == 'P'){
                const discountPercentage = this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount;
                let discountCost = this.state.staticPrice / 100 * discountPercentage;
                let totalCost = this.state.staticPrice - discountCost
                if(totalCost<0){
                    totalCost = 0
                    discountCost = this.state.staticPrice
                }

                this.setState({price:totalCost,climbedAmount:discountCost,discount_by:'P'})
            }
            else{
                let totalCost = this.state.staticPrice - this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount
                let discountCost =this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.amount
                if(totalCost<0){
                    totalCost = 0
                    discountCost = this.state.staticPrice
                }
                this.setState({price:totalCost,climbedAmount:discountCost,discount_by:'A'})
            }
        }
        
    }
    _climbePersonallInsurance = ()=>{
        if(this.state.checkPersonallInsurance==true){
            this.setState({checkPersonallInsurance:false,climbedAmount:'',insuranceType:'',insuranceDetails:'',isInsured:false,discount_by:''})
            if (this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount_by == 'P'){
                const discountPercentage = this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount;
                let discountCost = this.state.staticPrice;
                const totalCost = this.state.staticPrice;
                this.setState({price:totalCost})
            }
            else{
                const totalCost = this.state.staticPrice;
                this.setState({price:totalCost})
            }
        }
        else{
            this.setState({checkPersonallInsurance:true,checkEmployeeInsurance:false,insuranceDetails:this.props.myPersonallInsurance.myPersonallInsurance,isInsured:true,insuranceType:"Personall"})
            if (this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount_by == 'P'){
                const discountPercentage = this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount;
                let discountCost = this.state.staticPrice / 100 * discountPercentage;
                let totalCost = this.state.staticPrice - discountCost
                if(totalCost<0){
                    totalCost = 0
                    discountCost = this.state.staticPrice
                }
                this.setState({price:totalCost,climbedAmount:discountCost,discount_by:'P'})

            }
            else{
                let totalCost = this.state.staticPrice - this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount
                let discountCost = this.props.myPersonallInsurance.myPersonallInsurance.insure_company.amount
                if(totalCost<0){
                    totalCost = 0
                    discountCost = this.state.staticPrice
                }
                this.setState({price:totalCost,climbedAmount:discountCost,discount_by:'A'})
            }
        }
    }
    render(){
        const showAlert = this.state.showalert
        if (this.props.authInfo.isSuccess===true) {
            this.props.navigation.navigate('DrTreatment',{
                params: {
                  doctorId: this.state.doctor_id,
                  price:this.state.price,
                  currency_code:this.state.currency_code,
                },
              })
        }
        if (this.state.isLoading === true){
            return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
            </View>
            )
        }
        if (this.props.authInfo.isLoading === true){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
              </View>
            )
        }
        return(
            <Container>
                <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >

<Row>
  <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
  <Icon name="arrow-back" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={() =>this._showAlert()}></Icon>
  </Col>
  <Col style={{width:"70%",justifyContent:"center",alignContent:"center"}}>
  <Text style={{fontWeight:"bold",fontSize:18,color:"white",textAlign:"center",}}>
  Summary
</Text>
  </Col>
  <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
  </Col>
</Row>

</Header>
                <Content padder>
                    <Grid>
                        <Row style={{marginTop:"5%",alignItems:"center",justifyContent:"center"}}>
                            <Thumbnail circular large source={require('../../assets/doctor-avatar.png')} />
                        </Row>
                        <Row style={{alignItems:"center",justifyContent:"center"}}>
                            <H2 >Dr.{this.state.doctor.name}</H2>
                        </Row>
                        <Row style={{alignItems:"center",justifyContent:"center"}}>
                            <Text note>{this.state.doctor.spicality.name}</Text>
                        </Row>
                        <Row style={{marginTop:"5%"}}>
                        <Col style={{width:"80%"}}>
                            <Text style={{fontSize:18,fontWeight:"bold"}}>{this.state.doctor.spicality.name} Consultation at {this.state.time}</Text>
                            <Text note>For {this.props.userInfo.userDetails.name}</Text>
                        </Col>
                        <Col style={{width:"20%"}}>
                            <Card style={{backgroundColor:"#009479",borderRadius:8,height:60}}>
                                    <Text style={{alignSelf:"center",fontSize:27,color:"white"}}>{this.state.date}</Text>
                                    <Text style={{alignSelf:"center",fontSize:15,color:"white"}}>{this.state.month}</Text>
                            </Card>
                        </Col>
                        </Row>
                        <Row style={{marginTop:"5%"}}>
                        <Text style={{fontSize:14,fontWeight:"bold"}}>Climb Insurance</Text>
                        </Row>
                        {this.props.myPersonallInsurance.myPersonallInsurance != null && this.props.myPersonallInsurance.myPersonallInsurance.approved==1?
                        <Row style={{marginTop:"5%",width:"80%",alignItems:"center",justifyContent:"center"}}>
                            <Col style={{width:"30%",alignItems:"flex-start",justifyContent:"center"}}>
                                <CheckBox checked={this.state.checkPersonallInsurance} onPress={()=>this._climbePersonallInsurance()}/>
                            </Col>
                            <Col style={{width:"70%",alignItems:"flex-start",justifyContent:"center"}}>
                                <Text>{this.props.myPersonallInsurance.myPersonallInsurance.insure_company.company_name}</Text>
                            </Col>
                        </Row>:<Row></Row>
                        }
                        {this.props.myEmployeerInsurance.myEmployeerInsurance != null && this.props.myEmployeerInsurance.myEmployeerInsurance.approved == 1 ?
                        <Row style={{marginTop:"5%",width:"80%",alignItems:"center",justifyContent:"center"}}>
                            <Col style={{width:"30%",alignItems:"flex-start",justifyContent:"center"}}>
                                <CheckBox checked={this.state.checkEmployeeInsurance} onPress={()=>this._climbEmployeeInsurance()}/>
                            </Col>
                            <Col style={{width:"70%",alignItems:"flex-start",justifyContent:"center"}}>
                                <Text>{this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.company_name}</Text>
                            </Col>
                        </Row>:<Row></Row>
                        }
                    </Grid>
                    <View style={{marginTop:"15%"}}>
                    <ListItem>
                                
                        <Body><Text>Price</Text></Body>
                            <Right>
                                <Text>{this.state.staticPrice} {this.state.currency_code}</Text>
                            </Right>
                    </ListItem>
                    { this.state.isInsured == true ?     <ListItem>
                                
                                <Body><Text>Insurance Climed</Text></Body>
                                    <Right>
                                        <Text>{this.state.climbedAmount} {this.state.currency_code}</Text>
                                    </Right>
                            </ListItem>:    <ListItem>
                                
                                <Body><Text>Insurance Climed</Text></Body>
                                    <Right>
                                        <Text>0 {this.state.currency_code}</Text>
                                    </Right>
                            </ListItem>}
                    <ListItem>
                        <Body><Text>Total Payable</Text></Body>
                            <Right>
                                <Text>{this.state.price} {this.state.currency_code}</Text>
                            </Right>
                    </ListItem>
                    </View>
                    <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>this._pay()} style={{backgroundColor:"#009479",width:"60%",height:50,alignSelf:"center"}}><Text style={{width:"100%",textAlign:"center"}}>Proceed to Pay</Text></Button>
                    </View>
                </Content>
                <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Cancel Appointment"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="cancel"
                        confirmText="confirm"
                        confirmButtonColor="#009479"
                        onCancelPressed={() => {
                            this._cancel();
                        }}
                        onConfirmPressed={() => {
                            this._deleteAppointment();
                        }}
                        />
            </Container>
        );
    }
}
mapStateToProps = (state)=>({
    doctors:state.doctors.doctors,
    appointmentResponse:state.doctorAppointmentResponse,
    userInfo: state.userDetails,
    myPersonallInsurance:state.myPersonallInsurance,
    myEmployeerInsurance:state.myEmployeerInsurance,
    authInfo:state.auth,
  })
  const mapDispatchToProps = (dispatch) => ({
    fetchDoctorAvailablity:(doctorId)=>dispatch(doctorAvailablityAction.fetchDoctorAvailablity(doctorId)),
    fetchAppointments:(doctor_id)=>dispatch(fetchAppointmentsActions.fetchDoctorAppointmentsAfterDelete(doctor_id)),
    fetchMyPersonalInsurance : (user_id) =>dispatch(insuranceAction.fetchUserPersonalInsurance(user_id)),
    fetchMyEmployeerInsurance : (user_id) => dispatch(insuranceAction.fetchUserEmployeerInsurance(user_id)),
    deleteDoctorAppointment:(appointment_id,doctor_id)=>dispatch(DoctorAppointmentsAction.deleteAppointmentSlot(appointment_id,doctor_id))
  });
export default connect(mapStateToProps,mapDispatchToProps)(SummaryScreen);