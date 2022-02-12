import React, { Component } from 'react';
import {View,I18nManager,Platform} from 'react-native';
import { Container, Header, Content, Card, CardItem,Footer,FooterTab,Button, Text,ListItem,List,Left,Thumbnail,Body, Icon, Right } from 'native-base';
import {connect} from 'react-redux';
class PatientsScreen extends Component {
  componentDidMount(){
    console.log(this.props.patientDetails);
  }
  render() {
    return (
      <Container>
        <Content>
        <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon name="person" style={{color: '#009479'}} />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{}}>
                <Text style={{color: '#009479'}}>
                  {this.props.language.name}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.patientDetails.name}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon active name="ios-mail" style={{color: '#009479'}} />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{} }>
                <Text style={{color: '#009479'}}>
                  {this.props.language.email}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.patientDetails.user.email}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    name="gender-male-female"
                    type="MaterialCommunityIcons"
                    style={{color: '#009479'}}
                  />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{} }>
                <Text style={{color: '#009479'}}>
                  {this.props.language.gender}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.patientDetails.gender}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon name="ios-water" style={{color: 'red'}} />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{} }>
                <Text style={{color: '#009479'}}>
                  {this.props.language.bloodGroup}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.patientDetails.blood_group}</Text>
              </Right>
            </ListItem>
        </Content>
      </Container>
    );
  }
}
mapStateToProps =(state)=>({
  patientDetails:state.patientDetails.patientDetails,
  language: state.selectdLanguage.selectdLanguage,

})
const mapDispatchToProps = (dispatch)=>({
  

})
export default connect(mapStateToProps,mapDispatchToProps)(PatientsScreen);