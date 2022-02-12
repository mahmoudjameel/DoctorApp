import React, { Component } from "react";
import {Text} from 'react-native'
import { Container, Header, Content, Accordion, Footer,FooterTab,Button,List,ListItem,View,Left,Right,Icon,Card } from "native-base";
import {connect} from 'react-redux';



class MealScreen extends Component {
    state={
        choices:[]
    }
    constructor (props){
        super(props);
        const choices = this.props.choiceList
        for (key in choices) {
            this.state.choices.push(choices[key])
          }
          
      }

  _renderHeader(item, expanded) {
    return (
      <Card style={{width:"90%", height:100,justifyContent:"center",backgroundColor:"#41AEA9", borderRadius:8,alignSelf:"center"}}>

      <View style={{
        flexDirection: "row",
        padding: 30,
        justifyContent: "space-between",
        alignItems: "center" ,
         }}>
      <Text style={{ fontWeight: "400" ,fontSize:18,color:"#000"}}>
          {" "}{item.name}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove" />
          : <Icon style={{ fontSize: 18 }} name="add" />}
      </View>
      </Card>
    );
  }

  render() {
    const _renderContent= (item)=>{
        const allChoices =  this.state.choices[0]
          const meal_choice = allChoices.filter(choices=>choices.period ==item.id)
          return (
              
            meal_choice.map(choice=>(
            <List>
                <ListItem onPress={()=>{
                    this.props.navigation.navigate({
                    routeName: 'PeriodChoiceProducts',
                    params: {
                            choiceId: choice.id,
                            periodId:item.id,
                            title:choice.name
                     }
                    });
                }}>
                  <Left>
                    <Text style={{ fontWeight: "400" ,fontSize:14}}>{choice.name}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
            </List>
          ))  
        );
      }
    if(this.props.periods==null && this.props.choiceList==null){
        return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View> 
        )
      }
      
      
    return (
      <Container>
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={this.props.periods}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={_renderContent}
          />
        </Content>
        <Footer>
        
          <FooterTab style={{backgroundColor:"#dddddd"}}>
  
            <Button transparent vertical onPress={()=>this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{this.props.language.home}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Search',params:{headerTitle:this.props.language.search}})}>
              <Icon name="search" style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{this.props.language.search}</Text>
            </Button>
            <Button rounded onPress={()=>this.props.navigation.navigate('BarcodeSearch')} style={{backgroundColor:"#009479",height:80}}>
              <Icon active name="barcode" style={{color:"#fff",fontSize:45}}/>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Favourite',params:{headerTitle:this.props.language.favorieteCollections}})}>
              <Icon name="favorite"  type='MaterialIcons' style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{this.props.language.favoriete}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{this.props.language.profile}</Text>
            </Button>
         
          </FooterTab>
        
        </Footer>
      </Container>
    );
  }
}
MealScreen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('headerTitle')
  };
}
mapStateToProps = (state) => ({
    availableProducts: state.product,
    userInfo:state.userDetails,
    periods:state.periods.periods,
    diseasesCategories:state.selectDiseases.diseasesCategories,
    productCategories:state.product_categories.availableProductCategories,
    choiceList:state.choices,
    language:state.selectdLanguage.selectdLanguage,
  })
export default connect(mapStateToProps)(MealScreen);