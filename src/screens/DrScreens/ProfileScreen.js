import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { Icon,Container, Header, Content, List,Accordion ,ListItem, Left,Button,Tab,Tabs, TabHeading,Footer, FooterTab, Body, Right, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import * as doctorAuthAction from '../../store/actions/auth';

class ProfileScreen extends Component {
    constructor (props){
      super(props);
      this.props.navigation.setParams({
        Title: this.props.language.profile
      });
    }
    onPressSignOut = ()=>{
      this.props.signOut(props=this.props)
    }
    
    render() {
      if(this.props.language.languageName == "arabic" || this.props.language.languageName == "urdu"){
      return (
        <Container>
          <Content>
            <List>
            <ListItem itemDivider>
              </ListItem> 
              <ListItem icon>
                <Right>
                  <Text>{this.props.userInfo.userDetails.user_language_display}</Text>
                </Right>
                <Body>
                  <Text style={{color:"#009479"}}>{this.props.language.language}</Text>
                </Body>
                <Left>
                <Button transparent>
                  <Icon name='earth' type="AntDesign" style={{ color:"#009479" }}/>
                </Button>
                </Left>
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.doctorDetails.name}</Text>
                </Right>
                <Body>
                  <Text style={{color:"#009479"}}>{this.props.language.name}</Text>
                </Body>
                <Left>
                <Button transparent>
                <Icon name='person' style={{ color:"#009479" }}/>
                </Button>
                </Left>
                
              </ListItem>
              <ListItem icon>
                <Right>
                  <Text>{this.props.doctorDetails.email}</Text>
                </Right>
                <Body>
                  <Text style={{color:"#009479"}}>{this.props.language.email}</Text>
                </Body>
                <Left>
                  <Button transparent>
                  <Icon active name='ios-mail' style={{ color:"#009479" }}/>
                  </Button>
                </Left>
              </ListItem>
            <ListItem icon>
              <Right>
                <Text>{this.props.doctorDetails.gender}</Text>
              </Right>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.gender}</Text>
              </Body>
              <Left>
                <Button transparent>
                <Icon name='gender-male-female' type='MaterialCommunityIcons' style={{ color:"#009479" }}/>
                </Button>
              </Left>
            </ListItem>
            <ListItem icon>
              <Right>
                <Text>{this.props.doctorDetails.blood_group}</Text>
              </Right>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.bloodGroup}</Text>
              </Body>
              <Left>
                <Button transparent>
                <Icon name="ios-water" style={{ color:"red" }} />
                </Button>
              </Left>
            </ListItem>
            <ListItem icon>
              <Right>
                <Text>{this.props.doctorDetails.dob}</Text>
              </Right>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.dob}</Text>
              </Body>
              <Left>
                <Button transparent>
                <Icon active name='cake'type='MaterialCommunityIcons' style={{ color:"#009479" }}/>
                </Button>
              </Left>
              
            </ListItem>
            <ListItem icon>
            <Right>
                <Text>{this.props.doctorDetails.phone}</Text>
              </Right>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.mobile}</Text>
              </Body>
              <Left>
                <Button transparent>
                <Icon active name='ios-phone-portrait' style={{ color:"#009479" }}/>
                </Button>
              </Left>
              
            </ListItem>
            <ListItem icon onPress={()=>this.props.navigation.navigate('Availability')}>
              <Body>
                <Text style={{color:"#009479"}}>Update Availablity</Text>
              </Body>
              <Left>
                <Button transparent>
                <Icon active name='calendar' type="AntDesign" style={{ color:"#009479" }}/>
                </Button>
              </Left>
              
            </ListItem>
            <ListItem icon 
              onPress={() => this.props.navigation.navigate('doctorAppointmentsHistory')}>
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
                Appointments History
              </Text>
              </Body>   
            </ListItem>
            {/* <ListItem onPress={()=>this.props.navigation.navigate('ChangePassword')}>
              <Text style={{color:"red"}}>{this.props.language.changePassword}</Text>
            </ListItem> */}
            <ListItem icon onPress={()=>this.onPressSignOut()}>
              <Right>
              <Text style={{color:"#009479"}}>{this.props.language.logout}</Text>
              </Right>
              
              <Body/>
              <Left>
                <Button style={{ color:"#009479" }} >
                  <Icon name="log-out"/>
                </Button>
              </Left>
            </ListItem>
            </List>
            <View style={{marginTop:"5%"}}>
              {/* <Button rounded style={{width:"75%",
          alignItems:"center",
          alignSelf:"center",
          height:50
          }} onPress={()=>this.props.navigation.navigate('EditProfile')}>
                <Text style={{fontSize:18,textAlign:"center",width:"100%"}} >{this.props.language.editprofile}</Text>
              </Button> */}
            </View>
          </Content>
        </Container>
      );
      }
      return (
        <Container>
          <Content>
            <List>
            <ListItem itemDivider>
              </ListItem> 
              <ListItem icon>
                <Left>
                <Button transparent>
                <Icon name='earth' type="AntDesign" style={{ color:"#009479" }}/>
                </Button>
                </Left>
                <Body>
                  <Text style={{color:"#009479"}}>{this.props.language.language}</Text>
                </Body>
                <Right>
                  <Text>{this.props.userInfo.userDetails.user_language_display}</Text>
                </Right>
              </ListItem>
              <ListItem icon>
                <Left>
                <Button transparent>
                <Icon name='person' style={{ color:"#009479" }}/>
                </Button>
                </Left>
                <Body>
                  <Text style={{color:"#009479"}}>{this.props.language.name}</Text>
                </Body>
                <Right>
                  <Text>{this.props.doctorDetails.name}</Text>
                </Right>
              </ListItem>
              <ListItem icon>
              <Left>
                <Button transparent>
                <Icon active name='ios-mail' style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.email}</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.email}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon name='gender-male-female' type='MaterialCommunityIcons' style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.gender}</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.gender}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon name="ios-water" style={{ color:"red" }} />
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.bloodGroup}</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.blood_group}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='cake'type='MaterialCommunityIcons' style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.dob}</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.dob}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='ios-phone-portrait' style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>{this.props.language.mobile}</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.phone}</Text>
              </Right>
            </ListItem>
            
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='doctor' type="MaterialCommunityIcons" style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>Spicalist</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.spicality.name}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='hospital-building' type="MaterialCommunityIcons" style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>Hospital</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.hospital.name}</Text>
              </Right>
            </ListItem>
            <ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='hospital-symbol' type="FontAwesome5" style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>Clinic</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.clinic.name}</Text>
              </Right>
            </ListItem><ListItem icon>
            <Left>
                <Button transparent>
                <Icon active name='earth' style={{ color:"#009479" }}/>
                </Button>
                </Left>
              <Body>
                <Text style={{color:"#009479"}}>Country</Text>
              </Body>
              <Right>
                <Text>{this.props.doctorDetails.resident_country.name}</Text>
              </Right>
            </ListItem>

            <ListItem icon onPress={()=>this.props.navigation.navigate('Availability')}>
            <Left>
                <Button transparent>
                <Icon active name='calendar' type="AntDesign" style={{ color:"#009479" }}/>
                </Button>
              </Left>
              <Body>
                <Text style={{color:"#009479"}}>Update Availablity</Text>
              </Body>
            </ListItem>
            <ListItem icon 
              onPress={() => this.props.navigation.navigate('doctorAppointmentsHistory')}>
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
                Appointments History
              </Text>
              </Body>   
            </ListItem>
            {/* <ListItem onPress={()=>this.props.navigation.navigate('ChangePassword')}>
              <Text style={{color:"red"}}>{this.props.language.changePassword}</Text>
            </ListItem> */}
            <ListItem icon onPress={()=>this.onPressSignOut()}>
            <Left>
                <Button style={{ backgroundColor:"#BF2032" }} >
                <Icon name="log-out"/>
                </Button>
              </Left>
              
              <Body/>
              <Right>
                <Text style={{color:"#009479"}}>{this.props.language.logout}</Text>
              </Right>
              
            </ListItem>
            </List>
            <View style={{marginTop:"5%"}}>
              {/* <Button rounded style={{width:"75%",
          alignItems:"center",
          alignSelf:"center",
          height:50
          }} onPress={()=>this.props.navigation.navigate('EditProfile')}>
                <Text style={{fontSize:18,textAlign:"center",width:"100%",color:"white"}} >{this.props.language.editprofile}</Text>
              </Button> */}
            </View>
          </Content>
        </Container>
      );
    }
  }
  ProfileScreen.navigationOptions = ({navigation })=>{
    
    return {
      headerTitle: navigation.getParam('Title'),
    };
  }
  mapStateToProps = (state) => ({
    doctorDetails:state.doctorDetails.doctorDetails,
    userInfo:state.userDetails,
    language:state.selectdLanguage.selectdLanguage,
  })
  const mapDispatchToProps = (dispatch) => ({
    signOut:(props)=>dispatch(doctorAuthAction.signOut(props))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);