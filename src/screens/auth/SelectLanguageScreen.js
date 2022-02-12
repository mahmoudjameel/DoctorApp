import React, { Component } from 'react';
import { Container, Header, Title,Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import {languages} from '../../data/languages'
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SelectLanguageScreen extends Component {
  
    constructor(props){
      super(props);
    }
  
 onSelect = async(val)=>{
  await AsyncStorage.setItem('selectedLanguage',JSON.stringify(val)),
  this.props.selectedLanguage(language=val)
  this.props.navigation.navigate('Auth')
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
          <Left/>
          <Body>
            <Title>Select language</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListItem onPress={()=>this.onSelect(languages.en)}> 
            <Body>
              <Text>English</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>this.onSelect(languages.ar)}>
            <Body>
              <Text>عربى</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>this.onSelect(languages.hi)}>
            <Body>
              <Text>हिंदी</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>this.onSelect(languages.ur)}>
            <Body>
              <Text>اردو</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={()=>this.onSelect(languages.fr)}>
            <Body>
              <Text>français</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    selectedLanguage: (language) => dispatch({ type: 'SELECT_LANGUAGE', language:language }),
  }
}
export default  connect(null,mapDispatchToProps)(SelectLanguageScreen)
