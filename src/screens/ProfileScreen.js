import React, {Component} from 'react';
import {View, Text, NativeModules,I18nManager,Platform} from 'react-native';
import RNKommunicateChat from 'react-native-kommunicate-chat';
import {
  Icon,
  Container,
  Header,
  Content,
  List,
  Accordion,
  ListItem,
  Left,
  Button,
  Tab,
  Tabs,
  TabHeading,
  Footer,
  FooterTab,
  Body,
  Right,
  Thumbnail,
  H3,
} from 'native-base';
import {connect} from 'react-redux';
import * as signOutAction from '../store/actions/auth';
import * as insuranceAction from '../store/actions/insurance'
import HealthyFood from '../screens/Home/HealthyFood'



class ProfileScreen extends Component {
  state = {
    is_RTL:false
  }
  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      Title: this.props.language.profile,
    });
  }
  async componentDidMount(){
    await this.props.fetchMyEmployeerInsurance(this.props.userInfo.userDetails.user_id);
    await this.props.fetchMyPersonalInsurance(this.props.userInfo.userDetails.user_id);
    
    if (I18nManager.isRTL && Platform.OS == 'android') {
      this.setState({is_RTL:true})
    }

    
  }
  onPressSignOut = () => {
    this.props.signOut((props = this.props));
  };
  onChatbotPress = ()=>{
    let conversationObject = {
       'userId' : this.props.userInfo.userDetails.email,
      'applicationId' : '2b20861496264a48dafb6f26c442fe1b', // The [APP_ID](https://dashboard.kommunicate.io/settings/install) obtained from kommunicate dashboard.
      'withPreChat' : true,
  }
    RNKommunicateChat.buildConversation(conversationObject, (response, responseMessage) => {
         if(response == "Success") {
             console.log("Conversation Successfully with id:" + responseMessage);
         }
       });
       RNKommunicateChat.isLoggedIn((response) => {
        if(response == "True") {
          console.log("loggd in");
        } else {
          //user is not logged in
        }
      });
  }
  render() {
    const dataArray = [{title: this.props.language.diseases, content: 'na'}];
    _renderHeader = (item, expanded) => {
      if (
        this.props.language.languageName == 'arabic' ||
        this.props.language.languageName == 'urdu'
      ) {
        return (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginLeft: '2%',
              marginRight: '2%',
            }}>
            {expanded ? (
              <Icon style={{fontSize: 18}} name="remove" />
            ) : (
              <Icon style={{fontSize: 18}} name="add" />
            )}

            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                marginLeft: '4%',
                marginRight: '2%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: '#009479', alignSelf: 'flex-start'}}>
                {' '}
                {item.title}
              </Text>
              <Icon name="md-body" style={{color: '#009479'}} />
            </View>
          </View>
        );
      }
      return (
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginLeft: '2%',
            marginRight: '2%',
          }}>
          <Icon name="md-body" style={{color: '#009479'}} />
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              marginLeft: '4%',
              marginRight: '2%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: '#009479', alignSelf: 'flex-start'}}>
              {' '}
              {item.title}
            </Text>
            {expanded ? (
              <Icon style={{fontSize: 18}} name="remove" />
            ) : (
              <Icon style={{fontSize: 18}} name="add" />
            )}
          </View>
        </View>
      );
    };
    _renderContent = item => {
      return this.props.userInfo.userDetails.user_diseases.map(disease => (
        <List>
          <ListItem>
            <Left>
              <Text style={{fontWeight: '400', fontSize: 14}}>
                {disease.disease_category.name}
              </Text>
            </Left>
          </ListItem>
        </List>
      ));
    };

    if (
      this.props.language.languageName == 'arabic' ||
      this.props.language.languageName == 'urdu'
    ) {
      return (
        <Container>
          <Content>
            <List>
            <ListItem itemDivider avatar>
                <View style={{width: '100%',
                alignItems: 'center',
                alignSelf: 'center',}}>
                  <Thumbnail large source={require('../assets/patient.png')}/>
                </View>
            </ListItem>
              <ListItem icon>
                <Right>
                  <Text>
                    {this.props.userInfo.userDetails.user_language_display}
                  </Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.language}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon
                      name="earth"
                      type="AntDesign"
                      style={{color: '#009479'}}
                    />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.name}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.name}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon name="person" style={{color: '#009479'}} />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.email}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.email}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon active name="ios-mail" style={{color: '#009479'}} />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.gender}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.gender}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon
                      name="gender-male-female"
                      type="MaterialCommunityIcons"
                      style={{color: '#009479'}}
                    />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.blood_group}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.bloodGroup}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon name="ios-water" style={{color: 'red'}} />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.dob}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.dob}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon
                      active
                      name="cake"
                      type="MaterialCommunityIcons"
                      style={{color: '#009479'}}
                    />
                  </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.phone}</Text>
                </Right>
                <Body>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.mobile}
                  </Text>
                </Body>
                <Left>
                  <Button transparent>
                    <Icon
                      active
                      name="ios-phone-portrait"
                      style={{color: '#009479'}}
                    />
                  </Button>
                </Left>
              </ListItem>
              <ListItem itemDivider>
                <Left />
                <Body>
                  <Text>Insurance</Text>
                </Body>
                <Right>
                  <Icon active name="add" type="Ionicons" onPress={()=>this.props.navigation.navigate('AddInsurance')}/>
                </Right>
              </ListItem>
              <ListItem>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  width: '100%',
                  color: '#009479',
                }}>
                Add Details
              </Text>
            </ListItem>
              <Accordion
                dataArray={dataArray}
                animation={true}
                expanded={[0]}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
              />

            <ListItem icon 
              onPress={() => this.props.navigation.navigate('patientAppointments')}>
             <Left>
                <Icon
                    active
                    name="calendar"
                    type="MaterialCommunityIcons"
                    style={{color: '#009479'}}
                  />
               </Left>
               <Body>
              <Text style={{color: '#009479'}}>
                My Appointments
              </Text>
              </Body>   
            </ListItem>
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('ChangePassword')
                }>
                <Text style={{color: 'red'}}>
                  {this.props.language.changePassword}
                </Text>
              </ListItem>
              <ListItem icon onPress={() => this.onPressSignOut()}>
                <Right>
                  <Text style={{color: '#009479'}}>
                    {this.props.language.logout}
                  </Text>
                </Right>

                <Body />
                <Left>
                  <Button style={{color: '#009479'}}>
                    <Icon name="log-out" />
                  </Button>
                </Left>
              </ListItem>
            </List>
            <View style={{marginTop: '5%'}}>
              <Button
                rounded
                style={{
                  width: '75%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  height: 50,
                  backgroundColor:"#009479"
                }}
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text
                  style={{fontSize: 18, textAlign: 'center', width: '100%'}}>
                  {this.props.language.editprofile}
                </Text>
              </Button>
            </View>
          </Content>
          <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Search',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
        </Container>
      );
    }
    return (
      <Container>
        <Content>
          <List>
            <ListItem itemDivider avatar>
                <View style={{width: '100%',
                alignItems: 'center',
                alignSelf: 'center',}}>
                  <Thumbnail large source={require('../assets/patient.png')}/>
                </View>
            </ListItem>
            {I18nManager.isRTL ? <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    name="earth"
                    type="AntDesign"
                    style={{color: '#009479'}}
                  />
                </Button>
              </Left>
              <Body style={{alignItems:"flex-start"}}>
                <Text style={{color: '#009479', textAlign:"right"}}>
                  {this.props.language.language}
                </Text>
              </Body>
              <Right>
                <Text>
                  {this.props.userInfo.userDetails.user_language_display}
                </Text>
              </Right>
            </ListItem>:<ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    name="earth"
                    type="AntDesign"
                    style={{color: '#009479'}}
                  />
                </Button>
              </Left>
              <Body>
                <Text style={{color: '#009479'}}>
                  {this.props.language.language}
                </Text>
              </Body>
              <Right>
                <Text>
                  {this.props.userInfo.userDetails.user_language_display}
                </Text>
              </Right>
            </ListItem>}
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
                <Text>{this.props.userInfo.userDetails.name}</Text>
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
                <Text>{this.props.userInfo.userDetails.email}</Text>
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
                <Text>{this.props.userInfo.userDetails.gender}</Text>
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
                <Text>{this.props.userInfo.userDetails.blood_group}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    active
                    name="cake"
                    type="MaterialCommunityIcons"
                    style={{color: '#009479'}}
                  />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{} }>
                <Text style={{color: '#009479'}}>
                  {this.props.language.dob}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.userInfo.userDetails.dob}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    active
                    name="ios-phone-portrait"
                    style={{color: '#009479'}}
                  />
                </Button>
              </Left>
              <Body style={I18nManager.isRTL ? {alignItems:"flex-start"}:{} }>
                <Text style={{color: '#009479'}}>
                  {this.props.language.mobile}
                </Text>
              </Body>
              <Right>
                <Text>{this.props.userInfo.userDetails.phone}</Text>
              </Right>
            </ListItem>
            <ListItem itemDivider />
            <ListItem icon noBorder>
              <Left>
                <Text style={{color: '#009479'}}>Insurance</Text>
              </Left>
              <Body/>
              <Right/>
            </ListItem>
            {this.props.myPersonallInsurance.myPersonallInsurance != null ? <ListItem>
              <Left>
                <Text>Personall Insurance</Text>
              </Left>
              <Body>
            <Text>{this.props.myPersonallInsurance.myPersonallInsurance.insure_company.company_name}</Text>
              </Body>
              <Right><Icon active name="md-add" type="Ionicons" style={{fontSize: 24, color: 'black'}} onPress={()=>this.props.navigation.navigate('AddInsurance')}/></Right>
            </ListItem>:
            <ListItem>
            <Left>
              <Text>Personall Insurance</Text>
            </Left>
            <Body>
          <Text>Add Details</Text>
            </Body>
            <Right><Icon active name="md-add" type="Ionicons" style={{fontSize: 24, color: 'black'}} onPress={()=>this.props.navigation.navigate('AddInsurance')}/></Right>
          </ListItem>
             }
            {this.props.myEmployeerInsurance.myEmployeerInsurance != null ? <ListItem>
              <Left>
                <Text>Empoyeer Insurance</Text>
              </Left>
              <Body>
            <Text>{this.props.myEmployeerInsurance.myEmployeerInsurance.employeer.company_name}</Text>
              </Body>
              <Right><Icon active name="md-add" type="Ionicons" style={{fontSize: 24, color: 'black'}} onPress={()=>this.props.navigation.navigate('AddInsurance')}/></Right>
            </ListItem>:
            <ListItem>
            <Left>
              <Text>Employeer Insurance</Text>
            </Left>
            <Body>
          <Text>Add Details</Text>
            </Body>
            <Right><Icon active name="md-add" type="Ionicons" style={{fontSize: 24, color: 'black'}} onPress={()=>this.props.navigation.navigate('AddInsurance')}/></Right>
          </ListItem>
             }
            <ListItem itemDivider />
            <Accordion
              dataArray={dataArray}
              animation={true}
              expanded={[0]}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
            />
               <ListItem icon 
              onPress={() => this.props.navigation.navigate('patientAppointments')}>
             <Left>
                <Icon
                    active
                    name="calendar"
                    type="MaterialCommunityIcons"
                    style={{color: '#009479'}}
                  />
               </Left>
               <Body>
              <Text style={{color: '#009479'}}>
                My Appointments
              </Text>
              </Body>   
            </ListItem>
             <ListItem icon 
              onPress={() => this.onChatbotPress()}>
             <Left>
                <Icon
                    active
                    name="chat"
                    type="MaterialCommunityIcons"
                    style={{color: '#009479'}}
                  />
               </Left>
               <Body>
              <Text style={{color: '#009479'}}>
                {this.props.language.chatbot}
              </Text>
              </Body>   
            </ListItem>
            <ListItem
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text style={{color: 'red'}}>
                {this.props.language.changePassword}
              </Text>
            </ListItem>

           
            <ListItem icon onPress={() => this.onPressSignOut()}>
              <Left>
                <Button style={{backgroundColor: '#BF2032'}}>
                  <Icon  name="log-out" />
                </Button>
              </Left>

              <Body />
              <Right>
                <Text style={{color: '#009479'}}>
                  {this.props.language.logout}
                </Text>
              </Right>
            </ListItem>
          </List>
          <View style={{marginTop: '5%'}}>
            <Button
              rounded
              style={{
                width: '60%',
                alignItems: 'center',
                alignSelf: 'center',
                height: 50,
                backgroundColor:"#009479",
                marginBottom:"5%"
              }}
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  width: '100%',
                  color: 'white',
                  textAlign:"center",width:"100%",
                  marginBottom:'9%',
                }}>
                {this.props.language.editprofile}
              </Text>
            </Button>
          </View>
        </Content>
        <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'HealthyFood',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
ProfileScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.getParam('Title'),
  };
};
mapStateToProps = state => ({
  userInfo: state.userDetails,
  language: state.selectdLanguage.selectdLanguage,
  myEmployeerInsurance:state.myEmployeerInsurance,
  myPersonallInsurance:state.myPersonallInsurance
});
const mapDispatchToProps = dispatch => ({
  signOut: props => dispatch(signOutAction.signOut(props)),
  fetchMyPersonalInsurance : (user_id) =>dispatch(insuranceAction.fetchUserPersonalInsurance(user_id)),
  fetchMyEmployeerInsurance : (user_id) => dispatch(insuranceAction.fetchUserEmployeerInsurance(user_id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
