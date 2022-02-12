import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Card,CardItem,Left, Body, Right, Thumbnail, Text, Icon, Row, H2, Col, Button, Grid } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import * as DoctorAppointmentsAction from '../../store/actions/appointments'
import {connect} from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from "moment";
 
class BookingScreen extends Component{
    state={
        doctorId :this.props.navigation.getParam('doctorId'),
        price:this.props.navigation.getParam('price'),
        currency_code:this.props.navigation.getParam('currency_code'),
        selectedDate :moment (new Date()).format("YYYY-MM-DD"),
        selectedDay:moment(new Date()).format('dddd'),
        availableTimeSlots:'',
        selected_timeSlot:'',
        selectedTimeSlotId:'',
        showalert:false
      }
      
      componentDidMount(){
          this.setState({availableTimeSlots:this.props.doctorAvailablity.filter(availablity=>availablity.day === this.state.selectedDay)})
        console.log(this.props.doctorAppointments);
          
      }
      onBack = () => {
          console.log("hello")
        this.setState({availableTimeSlots:this.props.doctorAvailablity.filter(availablity=>availablity.day === this.state.selectedDay)})
      };
      dateChange = (date)=>{
          
          let selected_date = date.format("YYYY-MM-DD")
          let selected_day = date.format('dddd')
          let available_timeslot = this.props.doctorAvailablity.filter(availablity=>availablity.day === selected_day)
          this.setState({selectedDate:selected_date,selectedDay:selected_day,availableTimeSlots:available_timeslot})
      }
      _showAlert = (time_slot,id)=>{
          
        this.setState({selected_timeSlot:time_slot,selectedTimeSlotId:id,showalert:true})
        
      }
      _addAppointment =()=>{
        this.props.addDoctorAppointment(this.state.doctorId,this.props.userDetails.user_id,this.state.selectedDate,this.state.selected_timeSlot,this.state.selectedTimeSlotId).then(
            this.props.navigation.navigate({
                routeName:'PaymentSummary',
                params:{
                    doctor_id:this.state.doctorId,
                    time_slot:this.state.selected_timeSlot,
                    date:this.state.selectedDate,
                    day:this.state.selectedDay,
                    price:this.state.price,
                    currency_code:this.state.currency_code,
                }
            })
        )
        this.setState({showalert:false})
      }
      _cancel = ()=>{
            this.setState({showalert:false})
      }
      render(){
          
          const showAlert = this.state.showalert
          if (this.props.doctorAppointments === null){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
              </View>
            )
        }
          const renderTimeSlot = data=>{
              
            const today_appointments =this.props.doctorAppointments.filter(appointments=>appointments.time_slot === data.item.mode && appointments.appointment_date === this.state.selectedDate)
            const is_blocked = today_appointments.some(appointments=>appointments.time_slot === data.item.mode)
            if (is_blocked){
                return(
                    <Card style={{width:"33.3%"}}>
                        <CardItem header disabled button style={{height:50,alignItems:"center",backgroundColor:"#009479"}}>
                            <Text style={{textAlign:"center",width:"100%",color:"grey"}}>{data.item.time}</Text>
                        </CardItem>
                    </Card>
                )  
            }
              return(
                        <Card style={{width:"33.3%"}}>
                            <CardItem header button style={{height:50,alignItems:"center" }} onPress={() =>this._showAlert(time_slot=data.item.mode,id=data.item.id)}>
                                <Text style={{textAlign:"center",width:"100%"}}>{data.item.time}</Text>
                            </CardItem>
                        </Card>
              )
          }
            const renderHourSlots = data =>{

                if (data.item.time_slot === "12-01AM"){
                    const time_slots =[{id:data.item.id,mode:'12:00AM',time:'12:00'},{id:data.item.id,mode:'12:15AM',time:'12:15'},{id:data.item.id,mode:'12:30AM',time:'12:30'},{id:data.item.id,mode:'12:45AM',time:'12:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>12-01AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "01-02AM"){
                    const time_slots =[{id:data.item.id,mode:'01:00AM',time:'01:00'},{id:data.item.id,mode:'01:15AM',time:'01:15'},{id:data.item.id,mode:'01:30AM',time:'01:30'},{id:data.item.id,mode:'01:45AM',time:'01:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>01-02AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "02-03AM"){
                    const time_slots =[{id:data.item.id,mode:'02:00AM',time:'02:00'},{id:data.item.id,mode:'02:15AM',time:'02:15'},{id:data.item.id,mode:'02:30AM',time:'02:30'},{id:data.item.id,mode:'02:45AM',time:'02:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>02-03AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "03-04AM"){
                    const time_slots = [{id:data.item.id,mode:'03:00AM',time:'03:00'},{id:data.item.id,mode:'03:15AM',time:'03:15'},{id:data.item.id,mode:'03:30AM',time:'03:30'},{id:data.item.id,mode:'03:45AM',time:'03:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>03-04AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "04-05AM"){
                    const time_slots =[{id:data.item.id,mode:'04:00AM',time:'04:00'},{id:data.item.id,mode:'04:15AM',time:'04:15'},{id:data.item.id,mode:'04:30AM',time:'04:30'},{id:data.item.id,mode:'04:45AM',time:'04:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>04-05AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "05-06AM"){
                    const time_slots=[{id:data.item.id,mode:'05:00AM',time:'05:00'},{id:data.item.id,mode:'05:15AM',time:'05:15'},{id:data.item.id,mode:'05:30AM',time:'05:30'},{id:data.item.id,mode:'05:45AM',time:'05:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>05-06AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "06-07AM"){
                    const time_slots =[{id:data.item.id,mode:'06:00AM',time:'06:00'},{id:data.item.id,mode:'06:15AM',time:'06:15'},{id:data.item.id,mode:'06:30AM',time:'06:30'},{id:data.item.id,mode:'06:45AM',time:'06:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>06-07AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "07-08AM"){
                    const time_slots =[{id:data.item.id,mode:'07:00AM',time:'07:00'},{id:data.item.id,mode:'07:15AM',time:'07:15'},{id:data.item.id,mode:'07:30AM',time:'07:30'},{id:data.item.id,mode:'07:45AM',time:'07:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>07-08AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "08-09AM"){
                    const time_slots =[{id:data.item.id,mode:'08:00AM',time:'08:00'},{id:data.item.id,mode:'08:15AM',time:'08:15'},{id:data.item.id,mode:'08:30AM',time:'08:30'},{id:data.item.id,mode:'08:45AM',time:'08:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>08-09AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "09-10AM"){
                    const time_slots =[{id:data.item.id,mode:'09:00AM',time:'09:00'},{id:data.item.id,mode:'09:15AM',time:'09:15'},{id:data.item.id,mode:'09:30AM',time:'09:30'},{id:data.item.id,mode:'09:45AM',time:'09:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>09-10AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "10-11AM"){
                    const time_slots =[{id:data.item.id,mode:'10:00AM',time:'10:00'},{id:data.item.id,mode:'10:15AM',time:'10:15'},{id:data.item.id,mode:'10:30AM',time:'10:30'},{id:data.item.id,mode:'10:45AM',time:'10:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>10-11AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "11-12PM"){
                    const time_slots =[{id:data.item.id,mode:'11:00AM',time:'11:00'},{id:data.item.id,mode:'11:15AM',time:'11:15'},{id:data.item.id,mode:'11:30AM',time:'11:30'},{id:data.item.id,mode:'11:45AM',time:'11:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>11-12PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "12-01PM"){
                    const time_slots =[{id:data.item.id,mode:'12:00PM',time:'12:00'},{id:data.item.id,mode:'12:15PM',time:'12:15'},{id:data.item.id,mode:'12:30PM',time:'12:30'},{id:data.item.id,mode:'12:45PM',time:'12:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>12-01PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "01-02PM"){
                    const time_slots =[{id:data.item.id,mode:'01:00PM',time:'01:00'},{id:data.item.id,mode:'01:15PM',time:'01:15'},{id:data.item.id,mode:'01:30PM',time:'01:30'},{id:data.item.id,mode:'01:45PM',time:'01:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>01-02PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "02-03PM"){
                    const time_slots =[{id:data.item.id,mode:'02:00PM',time:'02:00'},{id:data.item.id,mode:'02:15PM',time:'02:15'},{id:data.item.id,mode:'02:30PM',time:'02:30'},{id:data.item.id,mode:'02:45PM',time:'02:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>02-03PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "03-04PM"){
                    const time_slots = [{id:data.item.id,mode:'03:00PM',time:'03:00'},{id:data.item.id,mode:'03:15PM',time:'03:15'},{id:data.item.id,mode:'03:30PM',time:'03:30'},{id:data.item.id,mode:'03:45PM',time:'03:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>03-04PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "04-05PM"){
                    const time_slots =[{id:data.item.id,mode:'04:00PM',time:'04:00'},{id:data.item.id,mode:'04:15PM',time:'04:15'},{id:data.item.id,mode:'04:30PM',time:'04:30'},{id:data.item.id,mode:'04:45PM',time:'04:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>04-05PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "05-06PM"){
                    const time_slots=[{id:data.item.id,mode:'05:00PM',time:'05:00'},{id:data.item.id,mode:'05:15PM',time:'05:15'},{id:data.item.id,mode:'05:30PM',time:'05:30'},{id:data.item.id,mode:'05:45PM',time:'05:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>05-06PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "06-07PM"){
                    const time_slots =[{id:data.item.id,mode:'06:00PM',time:'06:00'},{id:data.item.id,mode:'06:15PM',time:'06:15'},{id:data.item.id,mode:'06:30PM',time:'06:30'},{id:data.item.id,mode:'06:45PM',time:'06:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>06-07AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "07-08PM"){
                    const time_slots =[{id:data.item.id,mode:'07:00PM',time:'07:00'},{id:data.item.id,mode:'07:15PM',time:'07:15'},{id:data.item.id,mode:'07:30PM',time:'07:30'},{id:data.item.id,mode:'07:45PM',time:'07:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>07-08PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "08-09PM"){
                    const time_slots = [{id:data.item.id,mode:'08:00PM',time:'08:00'},{id:data.item.id,mode:'08:15PM',time:'08:15'},{id:data.item.id,mode:'08:30PM',time:'08:30'},{id:data.item.id,mode:'08:45PM',time:'08:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>08-09PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "09-10PM"){
                    const time_slots = [{id:data.item.id,mode:'09:00PM',time:'09:00'},{id:data.item.id,mode:'09:15PM',time:'09:15'},{id:data.item.id,mode:'09:30PM',time:'09:30'},{id:data.item.id,mode:'09:45PM',time:'09:45'}]
                                        
                    return(
                        
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>09-10PM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                             <Row>
                                <FlatList
                                style={{width:"90%"}}
                                numColumns={3}
                                data = {time_slots}
                                renderItem={renderTimeSlot}
                                extraData={this.props}
                                />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
                if (data.item.time_slot === "11-12AM"){
                    const time_slots =[{id:data.item.id,mode:'11:00PM',time:'11:00'},{id:data.item.id,mode:'11:15PM',time:'11:15'},{id:data.item.id,mode:'11:30PM',time:'11:30'},{id:data.item.id,mode:'11:45PM',time:'11:45'}]
                    return(
                        <Grid style={{width:"95%",alignSelf:"center",marginBottom:"10%"}}>
                            <Col style={{width:"25%"}}><Row><Col><Button transparent disabled style={{width:"100%"}}><Text style={{fontSize:12,color:"grey",textAlign:"center",width:"100%"}}>11-12AM</Text></Button></Col></Row></Col>
                            <Col style={{width:"75%"}}>
                            <Row>
                            <FlatList
                            style={{width:"90%"}}
                            numColumns={3}
                            data = {time_slots}
                            renderItem={renderTimeSlot}
                            extraData={this.props}
                            />
                            </Row>
                            </Col>
                        </Grid>
                    )
                }
            }
          return(
              <Container>
                  <Content>
                      <Card>
                          <ScrollView>
                        <CalendarStrip
                            calendarAnimation={{type: 'sequence', duration: 30}}
                            daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: '#4eb9cb'}}
                            style={{height: 100, paddingTop: 20, paddingBottom: 10,}}
                            calendarHeaderStyle={{color: '#4eb9cb'}}
                            calendarColor={'#fff'}
                            dateNumberStyle={{color: 'black',}}
                            dateNameStyle={{color: 'black'}}
                            highlightDateNumberStyle={{color: '#4eb9cb'}}
                            highlightDateNameStyle={{color: '#4eb9cb'}}
                            disabledDateNameStyle={{color: 'grey'}}
                            disabledDateNumberStyle={{color: 'grey'}}
                            iconContainer={false}
                            minDate={new Date()}
                            maxDate={moment(new Date()).add(3,'months')}
                            useIsoWeekday={false}
                            startingDate={new Date()}
                            onDateSelected={(date)=>this.dateChange(date)}
                            selectedDate={this.state.selectedDate}
                            iconContainer={{flex: 0.1}}
                        />
                        </ScrollView>
                    </Card>
                    
                        
                        {this.props.doctorAvailablity.some(availablity=>availablity.day === this.state.selectedDay) ? 
                        
                            <FlatList
                                data = {this.state.availableTimeSlots}
                                keyExtractor={(item ) => item.id.toString()}
                                extraData={this.props}
                                renderItem={renderHourSlots}
                            />
                        
                        
                        :<Card><Text>{this.state.selectedDay}</Text></Card>}
                        
                    
                  </Content>
                  <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Confirm Appointment"
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
                            this._addAppointment();
                        }}
                        />
                </Container>
              
          )
      }
}
mapStateToProps = (state)=>({
    doctorAvailablity:state.doctorAvailablity.doctorAvailablity,
    doctorAppointments:state.doctorAppointments.doctorAppointments,
    userDetails:state.userDetails.userDetails
  })
const mapDispatchToProps = (dispatch) => ({
    addDoctorAppointment:(doctor_id,user_id,selected_date,time_slot,slot_id)=>dispatch(DoctorAppointmentsAction.addDoctorAppointment(doctor_id,user_id,selected_date,time_slot,slot_id))
  });
export default connect(mapStateToProps,mapDispatchToProps)(BookingScreen);	