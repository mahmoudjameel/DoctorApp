import SpecialistGridTile from '../../components/SpecialistGridTile';
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import { Container,List, Header,Row,Col, Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button,Item,Input, ListItem, Icon, Left, Body, Right, Switch,Title,Card,CardItem,Fab} from 'native-base';
import * as specialistListAction from '../../store/actions/listSpecialist';
import * as doctorsListAction from '../../store/actions/doctors';
import {connect} from 'react-redux';





class DrTreatment extends Component{
  constructor (props){
    super(props);
    this.state ={
      specialistData        : [],
      specialistDataBackup  : [],
  }
  }
  componentDidMount() {
    this.setState({
      specialistData:this.props.specialists.specialistList,
      specialistDataBackup:this.props.specialists.specialistList
    })
    console.log(this.props);
    this.props.fetchDoctorsList()
    this.props.fetchDoctorPricing()
  }
  setSearchText(event){
    searchText = event.nativeEvent.text;
    data       = this.state.specialistDataBackup;
    
    searchText = searchText.trim().toLowerCase();
   data = data.filter(l => {
    return l.name.toLowerCase().match( searchText );
   });
   this.setState({
    specialistData : data
    });
   }
    render(){
        const renderDiseaseSpecialiest = itemData => {
            
            return (
              <SpecialistGridTile
                title={itemData.item.name}
                onSelect={()=>this.props.navigation.navigate({
                     routeName: 'ListDoctors',   
                     params: {
                       specialistId: itemData.item.id,
                     }
                   })}
                
              />
            );
          };
        return(
            <Container style={{backgroundColor:"#fff"}}>
            

            <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >

            <Row>
              <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="arrow-back" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.goBack()}></Icon>
              </Col>
              <Col style={{width:"70%",justifyContent:"center",alignContent:"center"}}>
              <Text style={{fontWeight:"bold",fontSize:23,color:"white",textAlign:"center",}}>
              Dr.Treatment
           </Text>
              </Col>
              <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="person" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.navigate('Profile')}></Icon>
              </Col>
          </Row>

        </Header>
        {/* </LinearGradient> */}
                <Content>
                    <Text style={{margin:"5%",fontWeight:"bold",fontSize: 25,marginLeft:"20%"}}>Specialist Consultion</Text>
                    <Text style={{marginLeft:"5%",fontSize: 15}}>Choose Specialist</Text>
                  <Item style={{width:"90%",marginLeft:"5%",backgroundColor:"#ddd",borderRadius:60}}>
                    <Icon style={{marginLeft:"3%"}} name="ios-search" />
                    <Input placeholder="Search" onChange={this.setSearchText.bind(this)}/>
                    <Icon name="ios-people" />
                  </Item>

                <FlatList
                        keyExtractor={(item, index) => item.id.toString()}
                      data={this.state.specialistData}
                    renderItem={renderDiseaseSpecialiest}
                    />
                 
                   
                    </Content>
                  
          
          {/* <Fab
            
            containerStyle={{ }}
            style={{ backgroundColor: '#BF2032' }}
            position="bottomRight"
            onPress={()=>this.props.navigation.navigate('ChatDialogs')}>
            <Icon name="message-square"  type="Feather"/>
          </Fab> */}
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
mapStateToProps = (state)=>({
  specialists:state.specialistList,
  language: state.selectdLanguage.selectdLanguage,
  // chatCurrentUser:state.chatCurrentUser,
  // chatDialogs:state.chatDialogs
})
const mapDispatchToProps = (dispatch) => ({
  fetchSpecialistList:()=>dispatch(specialistListAction.fetchDoctorSpicalists()),
  fetchDoctorsList:()=>dispatch(doctorsListAction.fetchDoctor()),
  fetchDoctorPricing:()=>dispatch(doctorsListAction.fetchDoctorPricing())
  });
export default connect(mapStateToProps,mapDispatchToProps)(DrTreatment);