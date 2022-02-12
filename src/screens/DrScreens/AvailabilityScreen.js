import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Row, Col ,Body,Title} from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {Days} from '../../data/daysTime'
import {connect} from 'react-redux';
import * as addDoctorAvailablityAction from '../../store/actions/doctorAvailablity'
import Modal from 'react-native-modal';
import DaysButtons from '../../components/DaysButtons'
class AvailabilityScreen1 extends Component {
    state={
        days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        timing:[ {order_by:0,time:'12-01AM'},{order_by:1,time:'01-02AM'},{order_by:2,time:'02-03AM'},{order_by:3,time:'03-04AM'},{order_by:4,time:'04-05AM'},{order_by:5,time:'05-06AM'},{order_by:6,time:'06-07AM'},{order_by:7,time:'07-08AM'},{order_by:8,time:'08-09AM'},{order_by:9,time:'09-10AM'},{order_by:10,time:'10-11AM'},{order_by:11,time:'11-12PM'},{order_by:12,time:'12-01PM'},{order_by:13,time:'01-02PM'},{order_by:14,time:'02-03PM'},{order_by:15,time:'03-04PM'},{order_by:16,time:'04-05PM'},{order_by:17,time:'05-06PM'},{order_by:18,time:'06-07PM'},{order_by:19,time:'07-08PM'},{order_by:20,time:'08-09PM'},{order_by:21,time:'09-10PM'},{order_by:22,time:'10-11PM'},{order_by:23,time:'11-12AM'}],
        selectedDay:'',
        timeModalVisible:false,
    }
    constructor (props){
        super(props);
      }
  
    _DaySelect = (visible,day)=>{
        this.setState({selectedDay:day})
        this.setState({timeModalVisible: visible});
    }
    _TimeSelect = (time,order_by)=>{
        this.props.addDoctorAvailablity(this.props.userDetails.id,this.state.selectedDay,time,order_by)
    }
  render() {
    if(this.props.doctorAvailablity == null){
      return(    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View> 
        )
    }
    
    
      const renderDayButtons = days=>{
        
            if(this.props.doctorAvailablity.length > 0){
                const isSelected = this.props.doctorAvailablity.some(sel=>sel.day === days.item)
                
                if(isSelected){
                    return(
                        <Col style={{marginTop:"5%",marginBottom:"2%"}}>
                            <Button large dark style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"#17AFB0"}}  rounded onPress={()=>this._DaySelect(visible=true,value=days.item)}>
                              <Text style={{textAlign:"center",color:"white",width:"100%"}}> {days.item} </Text>
                            </Button>                    
                        </Col>
                    )    
                }
                return(
                  <Col style={{marginTop:"5%",marginBottom:"2%"}}>
                  <Button large dark style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"white"}} rounded onPress={()=>this._DaySelect(visible=true,value=days.item)}>
                    <Text style={{textAlign:"center",color:"black",width:"100%"}}> {days.item} </Text>
                  </Button>                    
              </Col>
                  )
              }
            
              return(
                <Col style={{marginTop:"5%", marginBottom:"2%"}}>
                  <Button dark style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"white"}} large rounded onPress={()=>this._DaySelect(visible=true,value=days.item)}>
                    <Text style={{textAlign:"center",color:"black",width:"100%"}}> {days.item} </Text>
                  </Button>                    
              </Col>
              )
          }
      
      const renderTimeButtons= times=>{
        console.log(times);
        
            if(this.props.doctorAvailablity.length > 0){
              
              
              const dayFilter = this.props.doctorAvailablity.filter(sel=>sel.day === this.state.selectedDay)
              
                const isSelected = dayFilter.some(sel=>sel.time_slot === times.item.time)
                if(isSelected){
                  
                  
                    return(
                      <Col style={{marginTop:"5%",marginBottom:"5%"}}>
                        <Button dark style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"#17AFB0"}} onPress={()=>this._TimeSelect(time=times.item.time,order_by=times.item.order_by)} rounded>
                          <Text style={{textAlign:"center",color:"white",width:"100%"}}> {times.item.time} </Text>
                        </Button>                    
                      </Col>
                    )    
                }
                return(
                    <Col style={{marginTop:"5%",marginBottom:"5%"}}>                
                        <Button style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"white"}}  rounded onPress={()=>this._TimeSelect(time=times.item.time,order_by=times.item.order_by)}><Text style={{textAlign:"center",color:"black",width:"100%"}}> {times.item.time} </Text></Button>                    
                    </Col>
                  )
              }
              return(
                <Col style={{marginTop:"5%",marginBottom:"5%"}}>                
                        <Button style={{width:"80%",alignItems:"center",alignSelf:"center",backgroundColor:"white"}}  rounded onPress={()=>this._TimeSelect(time=times.item.time,order_by=times.item.order_by)}><Text style={{textAlign:"center",color:"black",width:"100%"}}> {times.item.time} </Text></Button>                    
                    </Col>
              )
          }

    return (
      <View>
        
        <Modal
            onBackdropPress={() => this.setState({ timeModalVisible: false })}
            isVisible={this.state.timeModalVisible} style={styles.bottomModal}>
            <Header style={{borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:"#225B59"}}>
              <Body>
                <Title>SelectTimings</Title>
              </Body>
            </Header>
            <ScrollView style={styles.modalContent}>
            <FlatList
              data={this.state.timing}
              renderItem={renderTimeButtons}
              extraData={this.props}
              /> 
            </ScrollView>
        </Modal>
            <FlatList
            data={this.state.days}
            renderItem={renderDayButtons}
            extraData={this.props}
        />
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomModal: {
      margin: 0, 
      backgroundColor: 'white', 
      height: "50%", 
      flex:0 , 
      bottom: 0, 
      position: 'absolute',
      width: '100%',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
  });
mapStateToProps = (state) => ({
    userDetails:state.userDetails.userDetails,
    language:state.selectdLanguage.selectdLanguage,
    doctorAvailablity:state.doctorAvailablity.doctorAvailablity
  })
  
  const mapDispatchToProps = (dispatch) => ({
    addDoctorAvailablity:(userId,day,time,order_by)=>dispatch(addDoctorAvailablityAction.addDoctorAvailablity(userId,day,time,order_by))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(AvailabilityScreen1);