import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem,Footer,FooterTab,Button, Text,ListItem,List,Left,Thumbnail,Body, Icon, Right, Row } from 'native-base';
import {connect} from 'react-redux';
import {BASE_URL} from '../../store/constants'

class PatientMedicationsScreen extends Component {
  render() {
    const renderPrescrition = data=>{
      
      return(
        <Card style={{width:"90%",borderRadius:8,alignSelf:"center"}}>
            <ListItem thumbnail>
                    <Left>
                  <Thumbnail square resizeMode={"center"} source={{uri:BASE_URL+data.item.medication.mobile_icon}}/>
              </Left>
              <Body>
                  <Text>{data.item.medication.name}({data.item.medication.manufacturer})</Text>
                  <Text note>{data.item.note}</Text>
                  <Text note>Dr.Notes:{data.item.dr_note}</Text>
              </Body>
              <Right/>
              </ListItem>  
           </Card>
      )
    }
    return (
      <Container>
        <Content>
          <FlatList
          data={this.props.prescriptions}
          renderItem={renderPrescrition}
          />
        </Content>
      </Container>
    );
  }
}
mapStateToProps = (state)=>({
  userDetails:state.userDetails.userDetails,
  consultations:state.consultations.consultations,
  prescriptions:state.prescriptions.prescriptions,
  dignosisReports:state.dignosisReports.dignosisReports
})
export default connect(mapStateToProps)(PatientMedicationsScreen);