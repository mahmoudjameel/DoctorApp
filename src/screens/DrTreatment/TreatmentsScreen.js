import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem,Footer,FooterTab,Button, Text,ListItem,List,Left,Thumbnail,Body, Icon, Right } from 'native-base';
import {connect} from 'react-redux';
import * as consultationAction from '../../store/actions/consultation';
import moment from 'moment';
class TreatmentsScreen extends Component {
  state={

  }
  componentDidMount(){
    this.props.fetchConsultations(this.props.userDetails.user_id)
  }
  render() {
    const  renderConsultations = data=>{
      const date_time = new Date(data.item.created_at)
      const date = date_time.getDate()+"/"+date_time.getMonth()+"/"+date_time.getFullYear()
      const time = date_time.getHours()+":"+date_time.getMinutes()
      const time_format = moment(time,'hh:mm').format('LT')
      return(
        <ListItem noIndent onPress={()=>this.props.navigation.navigate({routeName:'TreatmentDetails',
                  params:{
                      consultation_id:data.item.id,
                      doctor:data.item.doctor,
                      for_diseases:data.item.consultationdisease_set,
                      date:date,
                      time:time_format,
                      notes:data.item.notes
                  }
                  })}>
                <Body>
                  <Text>{data.item.consultation_name}</Text>
                  <Text note>Date:{date}  Time:{time_format}</Text>
                </Body>
                <Right/>
              </ListItem>
      );
    }
    if(this.props.fetchConsultations == null){
      return(    
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#009479" />
      </View> 
        )
    }

      return (
        <Container>
          <Content>
            <Card style={{width:"90%",borderRadius:8,alignSelf:"center"}}>
            <List>
              <FlatList
              data={this.props.consultations}
              renderItem={renderConsultations}
              />
            </List>
             </Card>
          </Content>
          <Footer style={{backgroundColor:"#dddddd"}}>
              <FooterTab style={{backgroundColor:"#dddddd"}}>
                  <Button vertical active style={{backgroundColor:"#dddddd"}} >
                    <Text style={{color:"#000",fontSize:15}}>Treatments</Text>
                  </Button>
                  <Button  vertical onPress={()=>this.props.navigation.navigate('ListDoctors')}style={{backgroundColor:"#dddddd"}}>
                    <Text style={{color:"#000",fontSize:15}} >Doctors</Text>
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
  userDetails:state.userDetails.userDetails,
  consultations:state.consultations.consultations
})
const mapDispatchToProps = (dispatch) => ({
  fetchConsultations:(user_id)=>dispatch(consultationAction.fetchConsultations(user_id)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(TreatmentsScreen);