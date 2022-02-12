import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem,Footer,FooterTab,Button, Text,ListItem,List,Left,Thumbnail,Body, Icon, Right } from 'native-base';
import {connect} from 'react-redux';
export default class AppoinmentsScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
        <Card>
            <List style={{width:"90%"}}>
              <ListItem thumbnail onPress={()=>this.props.navigation.navigate('Consult')}>
                <Left>
                  <Thumbnail source={require('../../assets/pt.jpg')}/>
                </Left>
                <Body>
                  <Text>Pateint</Text>
                </Body>
                <Right>
                  <Text>3:00 pm</Text>
                </Right>
              </ListItem>
             <ListItem thumbnail>
                <Left>
                  <Thumbnail source={require('../../assets/pt.jpg')}/>
                </Left>
                <Body>
                  <Text>Patient 2</Text>
                </Body>
                <Right>
                  <Text>4:00 pm</Text>
                </Right>
              </ListItem>            
            </List>
            </Card>
        </Content>
        <Footer>
            <FooterTab>
                <Button vertical active onPress={()=>this.props.navigation.navigate('DrHome')}>
                  <Text>Home</Text>
                </Button>
                <Button vertical>
                  <Text>Appoints</Text>
                </Button>
                <Button vertical onPress={()=>this.props.navigation.navigate('Patients')}>
                  <Text>Patients</Text>
                </Button>
                <Button vertical>
                  <Text>Settings</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}
