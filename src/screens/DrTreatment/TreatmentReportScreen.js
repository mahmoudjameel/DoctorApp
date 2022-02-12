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
class TreatmentsReportScreen extends Component {
  render() {
    const renderReports =data=>{
      console.log(data);
      
      return(
        <Card style={{width:"90%",borderRadius:8,alignSelf:"center"}}>
          <List>
            <ListItem noIndent onPress={()=>this.props.navigation.navigate({routeName:'TreatmentReportDetail',
            params:{
                report:data.item,
                title:data.item.test_name
            }
          })}>
              <Body>
                <Row>
              <Thumbnail square resizeMode={"center"} source={require('../../assets/reports.png')}/>
                <Text style={{flex: 1, justifyContent: 'center', alignSelf:"center"}} >{data.item.test_name}</Text>
                </Row>
              </Body>
              <Right/>
            </ListItem>
          </List>
        </Card>
      )
    }
    return (
      <Container>
        <Content>
          <FlatList
          data={this.props.dignosisReports}
          renderItem={renderReports}
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
export default connect(mapStateToProps)(TreatmentsReportScreen);