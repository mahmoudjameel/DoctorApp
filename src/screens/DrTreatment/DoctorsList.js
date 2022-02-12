import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem,Footer,FooterTab,Button, Text,ListItem,List,Left,Thumbnail,Body, Icon, Right } from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import {connect} from 'react-redux';
class DoctorsList extends Component {
  state={
    specialistId :this.props.navigation.getParam('specialistId'),

  }
  
  render() {
    const doctorsList = this.props.doctors?.filter(doc=>doc.spicality.id === this.state.specialistId)
    const renderDoctorsList = doctor =>{
      console.log(this.props.doctorPricing.doctorPricing);
      console.log(doctor.item.resident_country.name);
      const doctorPriceData = this.props.doctorPricing?.doctorPricing?.filter(price=>price.specialist.id === this.state.specialistId && price.country.name === doctor.item.resident_country.name)
      let doctorprice = 0
      console.log(doctorPriceData);
      doctorPriceData?.map(prc=>(
        doctorprice=prc
      ))
      const doctorCourses = doctor.item.course
      return(
       <Card style={{width:"90%",borderRadius:30,alignSelf:"center",}}>
      <List style={{ backgroundColor:"#009479",borderRadius:30,height:100}}>
        <ListItem avatar noBorder onPress={()=>this.props.navigation.navigate({
                     routeName: 'DoctorInfo',   
                     params: {
                       doctorId: doctor.item.id,
                       price:doctorprice.price,
                       currency_code:doctorprice.country.currency_code,
                     }
                   })}  >
          <Left>
            <Thumbnail source={require('../../assets/doctor-avatar.png')}/>
          </Left>
          <Body>
            <Text style={{fontWeight:"bold",color:"white"}}>{doctor.item.name}</Text>
            <Text style={{fontWeight:"bold",color:"white"}} note>{doctor.item.year_of_experience} years exp</Text>
            {doctor.item.course.map(course=>(<Text note>{course.title}</Text>))}
            {/* <Text note>{doctor.item.spicality.name}</Text> */}
          </Body>
          <Right><Text style={{fontWeight:"bold",color:"white"}}>{doctorprice.price} </Text></Right>
        </ListItem>
      </List>
       </Card>);
    };
    return (
      <Container>
        <Content>
        <FlatList
            data={doctorsList}
            keyExtractor={(item ) => item.id.toString()}
            renderItem={renderDoctorsList} 
          />
        </Content>
        <Footer>
            <FooterTab style={{backgroundColor:"#dddddd"}}>
                <Button vertical onPress={()=>this.props.navigation.navigate('Treatments')}>
                  <Text style={{backgroundColor:"#dddddd",color:"#000",fontSize:15}}>Treatments</Text>
                </Button>
                <Button vertical active style={{backgroundColor:"#dddddd"}}>
                  <Text style={{backgroundColor:"#dddddd",color:"#000",fontSize:15}}>Doctors</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
mapStateToProps = (state)=>({
  specialists:state.specialistList,
  doctors:state.doctors.doctors,
  chatCurrentUser:state.chatCurrentUser,
  doctorPricing:state.doctorPricing
})

export default connect(mapStateToProps)(DoctorsList);