import React, { Component } from 'react';
import { Container,Card,CardItem, Header, Content, Button, Text, Row, Col ,Body,Title, Right} from 'native-base';
import { View,FlatList,Switch, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {Days} from '../../data/daysTime'
import {connect} from 'react-redux';
import * as doctorAvailablityAction from '../../store/actions/auth'
import * as addDoctorAvailablityAction from '../../store/actions/doctorAvailablity'
import Modal from 'react-native-modal';
import DaysButtons from '../../components/DaysButtons'
class AvailabilityScreen extends Component {
    state={
        days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        timing:['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12AM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'],
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
    _TimeSelect = (time)=>{
        this.props.addDoctorAvailablity(this.props.userDetails.id,this.state.selectedDay,time)
        this.setState({timeModalVisible:false})
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
                        <Card>
            <CardItem header bordered>
              <Text>NativeBase</Text>
              <Right>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    value={isSelected}
                 />
              </Right>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable
                  developers to build
                  high-quality mobile apps using React Native iOS and Android
                  apps
                  with a fusion of ES6.
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
                    )    
                }
                return(
                    <Card>
                    <CardItem header bordered>
                      <Text>NativeBase</Text>
                      <Right>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            value={isSelected}
                         />
                      </Right>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text>
                          NativeBase is a free and open source framework that enable
                          developers to build
                          high-quality mobile apps using React Native iOS and Android
                          apps
                          with a fusion of ES6.
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Text>GeekyAnts</Text>
                    </CardItem>
                  </Card>
                  )
              }
            
              return(
                <Card>
                <CardItem header bordered>
                  <Text>NativeBase</Text>
                  <Right>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        value={false}
                     />
                  </Right>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      NativeBase is a free and open source framework that enable
                      developers to build
                      high-quality mobile apps using React Native iOS and Android
                      apps
                      with a fusion of ES6.
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Text>GeekyAnts</Text>
                </CardItem>
              </Card>
              )
          }
      
      const renderTimeButtons= times=>{
            if(this.props.doctorAvailablity.length > 0){
              
              const dayFilter = this.props.doctorAvailablity.filter(sel=>sel.day === this.state.selectedDay)
              
                const isSelected = dayFilter.some(sel=>sel.time === times.item)
                if(isSelected){
                    return(
                        <Col style={{alignSelf:"center",alignContent:"space-between",marginTop:"5%", width:"80%"}}>
                            <Button dark style={{marginBottom:"2%"}}  rounded><Text style={{marginLeft:"25%",color:"white"}}> {times.item} </Text></Button>                    
                        </Col>
                    )    
                }
                return(
                    <Col style={{alignSelf:"center",alignContent:"space-between",marginTop:"5%", width:"80%"}}>                
                        <Button light style={{marginBottom:"2%"}}  rounded onPress={()=>this._TimeSelect(time=times.item)}><Text style={{alignSelf:"center",marginLeft:"25%"}}> {times.item} </Text></Button>                    
                    </Col>
                  )
              }
              return(
                <Col style={{alignSelf:"center",alignContent:"space-between",marginTop:"5%", width:"80%"}}>                
                    <Button light style={{marginBottom:"2%"}}  rounded onPress={()=>this._TimeSelect(time=times.item)}><Text style={{alignSelf:"center",marginLeft:"25%"}}> {times.item} </Text></Button>                    
                </Col>
              )
          }

    return (
      <View>
        
        <Modal
            onBackdropPress={() => this.setState({ timeModalVisible: false })}
            isVisible={this.state.timeModalVisible} style={styles.bottomModal}>
            <Header style={{borderTopRadius:7}}>
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
      borderRadius:7,
      position: 'absolute',
      width: '100%'
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
    addDoctorAvailablity:(userId,day,time)=>dispatch(addDoctorAvailablityAction.addDoctorAvailablity(userId,day,time))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(AvailabilityScreen);