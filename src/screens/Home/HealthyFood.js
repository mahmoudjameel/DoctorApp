import React, { Component } from 'react';
import {StyleSheet,Image,Text,ImageBackground,View,ScrollView,ActivityIndicator} from 'react-native';
import {Container,List,Left,Body,Right, Header,Row,Col,Footer, FooterTab, Content,Picker, Icon,Button,Item,Input,Form} from 'native-base';
import colors from '../../styles/colors';
import * as productCategoryAction from '../../store/actions/productCategory';
import * as periodsAction from '../../store/actions/periods';
import * as diseaseAction from '../../store/actions/diseases'
import * as productsActions from '../../store/actions/products';
import * as choicesAction from '../../store/actions/choices';
import * as specialistListAction from '../../store/actions/listSpecialist';



import {connect} from 'react-redux';
class HealthyFood extends Component {
    state={
        searchData:null,
        searchBarcode:null,
        productCatId:null,
        diseaseCatId:null,
        periodId:null,
        topBrand:null,
    }
    constructor (props){
        super(props);
      }
    componentDidMount() {
        this.props.fetchProducts(user_id=this.props.userInfo.userDetails.user_id)
        this.props.fetchDiseases()
        this.props.fetchPeriods()
        this.props.fetchProductsCategories()
        this.props.fetchChoices()
        this.props.fetchSpecialistList()
        
      }
      _onSearch=()=>{
        
        this.props.navigation.navigate({
          routeName: 'SearchResult',
          params:{
            searchData:this.state.searchData,
            productCatId:this.state.productCatId,
            diseaseCatId:this.state.diseaseCatId,
            periodId:this.state.periodId,
            title:'Search Result'
          }
        })
      
      }
    render() {
        if(this.props.periods!=null && this.props.productCategories !=null && this.props.diseasesCategories !=null){
          if(this.props.language.languageName == "arabic" || this.props.language.languageName == "urdu"){
              return(
<Container>
  
  <Header style={{backgroundColor:"#009479",borderBottomColor:"#009479",height:65}} >
  <Row style={{width:"100%"}}>
      <Left>
      <Icon name="arrow-back" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right",marginTop:"60%"}} onPress={()=>this.props.navigation.goBack()}></Icon>
      </Left>
      <Body>
      <Text style={{fontWeight:"bold",fontSize:23,color:"white",textAlign:"center",marginTop:"20%"}}>
      {this.props.language.healthyfood}
   </Text>
      </Body>
      <Right>
        <Icon name="person" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right",marginTop:"20%"}} onPress={()=>this.props.navigation.navigate('Profile')}></Icon>
      </Right>
  </Row>

</Header>
<Content >

    <View  style={{flex: 1,alignItems: 'center',marginTop:"20%"}}>
        <Text style={{fontSize:20,fontWeight:"bold"}}>{this.props.language.searchByBarcode}</Text>
        <View style={{backgroundColor:"#fff",borderColor:"#009479",borderWidth:1,borderRadius:8,marginTop:"3%"}}>
        <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{fontSize:40, color:"#009479",padding:15}} onPress={()=>this.props.navigation.navigate('BarcodeSearch')}></Icon>
        </View>
        <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.productNameOrbarcode} </Text>
    <View style={{flex:1,flexDirection:"row",alignSelf:"center", width:"90%",marginTop:"5%"}}>
      
        
            <Item style={{width:"70%" ,height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd",borderColor:"#fff"}}>
                <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode3} onChangeText={searchBarcode=>this.setState({searchBarcode})} value={this.state.searchBarcode}/>
                <Icon name="ios-search" />
            </Item>
        
        <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"30%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'ChampBarcode',params:{barcode:this.state.searchBarcode}})}> 
    <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
  </Button>
    </View>

    
    <Text style={{fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.productNameOrbarcode1} </Text>
    <View style={{flex:1,flexDirection:"row",alignSelf:"center", width:"90%",marginTop:"5%"}}>                      
        <View style={{flexDirection:"row" ,width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd",borderColor:"#fff"}}>
            <Item style={{width:"100%"}}>
                <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode2} onChangeText={searchData=>this.setState({searchData})} value={this.state.searchData}/>
                <Icon name="ios-search" />
            </Item>
        </View>
        <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"30%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champProductName',params:{name:this.state.searchData}})}> 
    <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
  </Button>
    </View>
    <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}>{this.props.language.productCategories}</Text>
    <Row style={{alignSelf:"center", width:"90%",marginTop:"5%"}}> 
    
    <Col style={{width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd"}}>
        <Form>
    
        <Picker selectedValue={this.state.productCatId} style={{height: 50, width: "100%" }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({productCatId: itemValue})}>
               
              <Picker.Item label={this.props.language.productCategories} value={null} />
              <Picker.Item label="Pasta Dishes"     value="Pasta Dishes"/>
              <Picker.Item label="Sugary Snacks"    value="Sugary Snacks"/>
              <Picker.Item label="Biscuits Sables"  value="Biscuits Sables"/>
              <Picker.Item label="Pastries"         value="Pastries"/>
              <Picker.Item label="Biscuits And Cakes"         value="Biscuits And Cakes"/>
              <Picker.Item label="Meat Based Products"         value="Meat Based Products"/>
              <Picker.Item label="Meals"         value="Meals"/>
              <Picker.Item label="Preparations Made From Fish Meat"         value="Preparations Made From Fish Meat"/>
              <Picker.Item label="Shortbread Cookies"         value="Shortbread Cookies"/>
              <Picker.Item label="Meals With Fish"         value="Meals With Fish"/>
              <Picker.Item label="Plant Based Foods And Beverages"         value="Plant Based Foods And Beverageseals"/>
              <Picker.Item label="Plant Based Foods"         value="Plant Based Foods"/>
              <Picker.Item label="Pizzas Tartes Salees Et Quiches"         value="Pizzas Tartes Salees Et Quiches"/>
              <Picker.Item label="Sables"         value="Sables"/>
              <Picker.Item label="Cereals And Potatoes"         value="Cereals And Potatoesles"/>
              <Picker.Item label="Cereals And Their Products"         value="Cereals And Their Products"/>
              <Picker.Item label="Pastas"         value="Pastas"/>
              <Picker.Item label="Meals With Meat"         value="Meals With Meat"/>
              <Picker.Item label="Pasteurized Cheeses"         value="Pasteurized Cheeses"/>
              <Picker.Item label="Assorted Chocolate Candies"         value="Assorted Chocolate Candies"/>
              <Picker.Item label="Confectioneries"         value="Confectioneries"/>
              <Picker.Item label="Seafood"         value="Seafood"/>
              <Picker.Item label="Produits Aoc"         value="Produits Aoc"/>
              <Picker.Item label="Biscuits"         value="Biscuits"/>
              <Picker.Item label="Aoc Products"         value="Aoc Products"/>
              <Picker.Item label="Meringues"         value="Meringues"/>
              <Picker.Item label="Beverages"         value="Beverages"/>
              <Picker.Item label="Breton Cakes"         value="Breton Cakes"/>
              <Picker.Item label="Assortiments De Bonbons De Chocolat"         value="Assortiments De Bonbons De Chocolat"/>
              <Picker.Item label="Nougats"         value="Nougats"/>
              <Picker.Item label="Plats Prepares A Base De Pates"         value="Plats Prepares A Base De Pates"/>
              <Picker.Item label="Pork Meals"         value="Pork Meals"/>
              <Picker.Item label="Pizzas"         value="Pizzas"/>
              <Picker.Item label="Unpasteurised Cheeses"         value="Unpasteurised Cheeses"/>
              <Picker.Item label="Bolognese Lasagne"         value="Bolognese Lasagne"/>
              <Picker.Item label="Christmas Foods And Drinks"         value="Christmas Foods And Drinks"/>
              <Picker.Item label="Christmas Sweets"         value="Christmas Sweets"/>
              <Picker.Item label="Flavoured"         value="Flavoured"/>
              <Picker.Item label="Cheese Pizzas"         value="Cheese Pizzas"/>
              <Picker.Item label="Lasagnes A La Bolognaise"         value="Lasagnes A La Bolognaise"/>
              <Picker.Item label="Dairies"         value="Dairies"/>
              <Picker.Item label="Ravioli Frais"         value="Ravioli Frais"/>
              <Picker.Item label="Fruits And Vegetables Based Foods"         value="Fruits And Vegetables Based Foods"/>
              <Picker.Item label="Desserts"         value="Desserts"/>
              <Picker.Item label="Bonbons"         value="Bonbons"/>
              <Picker.Item label="Chocolate Candies"         value="Chocolate Candies"/>
              <Picker.Item label="Pasta In A Box"         value="Pasta In A Box"/>
              <Picker.Item label="Dairy Drinks"         value="Dairy Drinks"/>
              <Picker.Item label="Flavoured Milks"         value="Flavoured Milks"/>
              <Picker.Item label="Instant Pasta"         value="Instant Pasta"/>
              <Picker.Item label="Waffles"         value="Waffles"/>
              <Picker.Item label="Wraps"         value="Wraps"/>
              <Picker.Item label="Plant Milks"         value="Plant Milks"/>
              <Picker.Item label="Plant Based Beverages"         value="Plant Based Beverages"/>
              <Picker.Item label="Added"         value="Added"/>
              <Picker.Item label="Raviolis Frais"         value="Raviolis Frais"/>
              <Picker.Item label="Fruits Based Foods"         value="Fruits Based Foods"/>
              <Picker.Item label="Prepared Vegetables"         value="Prepared Vegetables"/>
              <Picker.Item label="Wrap"         value="Wrap"/>
              <Picker.Item label="Fermented Foods"         value="Fermented Foods"/>
              <Picker.Item label="Fermented Milk Products"         value="Fermented Milk Products"/>
              <Picker.Item label="Cheeses"         value="Cheeses"/>
              <Picker.Item label="Milk Jams"         value="Milk Jams"/>
             

          

      </Picker>
   
        </Form>
    </Col>
    <Col>
    <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"95%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champProductCategories',params:{categories:this.state.productCatId}})}> 
    <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
  </Button>
    
  </Col>
  </Row>
  <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.diseaseCategories} </Text>
  <Row style={{alignSelf:"center", width:"90%",marginTop:"5%"}}> 
    
    <Col style={{width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd"}}>
        <Form>
        <Picker selectedValue={this.state.topBrand} style={{height: 50, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({topBrand: itemValue})}>
              <Picker.Item label={this.props.language.diseaseCategories} value={null} />
              <Picker.Item label="  Auchan"     value="Auchan"/>
              <Picker.Item label="U"    value="U"/>
              <Picker.Item label="  Casino"  value="Casino"/>
              <Picker.Item label="  Leader Price"    value="Leader Price"/>
              <Picker.Item label="Nestle"    value="Nestle"/>
              <Picker.Item label="Carrefour"    value="Carrefour"/>
              <Picker.Item label="Meijer"    value="Meijer"/>
              <Picker.Item label="Cora"    value="Cora  "/>
              <Picker.Item label="Propiedad De"    value="Propiedad De"/>
              <Picker.Item label="Kroger"    value="Kroger"/>
              <Picker.Item label="Target Stores"    value="Target Stores"/>
              <Picker.Item label="Great Value"    value="Great Value"/>
              <Picker.Item label="Monoprix"    value="Monoprix"/>
              <Picker.Item label="Coop"    value="Coop"/>
              <Picker.Item label="Migros"    value="Migros"/>
              <Picker.Item label="Picard"    value="Picard"/>
              <Picker.Item label="Unilever"    value="Unilever"/>
              <Picker.Item label="Ahold"    value="Ahold"/>
              <Picker.Item label="Roundy's"    value="Roundy's"/>
              <Picker.Item label="Sans Marque"    value="Sans Marque"/>
              <Picker.Item label="Netto"    value="Netto"/>
              <Picker.Item label="Weis"    value="Weis"/>
              <Picker.Item label="Food Lion"    value="Food Lion"/>
              <Picker.Item label="Spartan"    value="Spartan"/>
              <Picker.Item label="Shoprite"    value="Shoprite"/>
              <Picker.Item label="Marque Repere"    value="Marque Repere"/>
              <Picker.Item label="Belle France"    value="Belle France"/>
              <Picker.Item label="Food Club"    value="Food Club"/>
              <Picker.Item label="La Vie Claire"    value="La Vie Claire"/>
              <Picker.Item label="Knorr"    value="Knorr"/>
              <Picker.Item label="Delhaize"    value="Delhaize"/>
              <Picker.Item label="Wal Mart Stores Inc"    value="Wal Mart Stores Inc"/>
              <Picker.Item label="Franprix"    value="FranprixU"/>
              <Picker.Item label="Fleury Michon"    value="Fleury Michon"/>
              <Picker.Item label="Lindt"    value="Lindt"/>
              <Picker.Item label="365 Everyday Value"    value="365 Everyday Value"/>
              <Picker.Item label="Danone"    value="Danone"/>
              <Picker.Item label="Whole Foods Market"    value="Whole Foods Market  "/>
              <Picker.Item label="Hy Vee"    value="Hy Vee"/>
              <Picker.Item label="Dia"    value="Dia"/>
              <Picker.Item label="Wegmans"    value="Wegmans"/>
              <Picker.Item label="Thiriet"    value="Thiriet"/>
              <Picker.Item label="Intermarche"    value="Intermarche"/>
              <Picker.Item label="Hannaford"    value="Hannaford"/>
              <Picker.Item label="Market Pantry"    value="Market Pantry"/>
              <Picker.Item label="Meijer Inc"    value="Meijer Inc"/>
              <Picker.Item label="Safeway Inc"    value="Safeway Inc"/>
              <Picker.Item label="Leclerc"    value="Leclerc"/>
              <Picker.Item label="Harris Teeter"    value="Harris Teeter"/>
              <Picker.Item label="Goya"    value="Goya"/>
              <Picker.Item label="Hacendado"    value="Hacendado"/>
              <Picker.Item label="The Kroger Co"    value="The Kroger Co"/>
              <Picker.Item label="Lipton"    value="Lipton"/>
              <Picker.Item label="Haribo"    value="Haribo"/>
              <Picker.Item label="Food Town Stores Inc"    value="Food Town Stores Inc"/>
              <Picker.Item label="Tesco"    value="Tesco"/>
              <Picker.Item label="Whole Foods Market Inc"    value="Whole Foods Market Inc"/>
              <Picker.Item label="Weis Quality"    value="Weis Quality"/>
              <Picker.Item label="Hannaford Bros Co"    value="Hannaford Bros Co"/>
              <Picker.Item label="Kellogg's"    value="Kellogg's"/>
              <Picker.Item label="Boni"    value="Boni  "/>
              <Picker.Item label="Alnatura"    value="Alnatura"/>
              <Picker.Item label="Giant Eagle"    value="Giant Eagle"/>
              <Picker.Item label="Lu"    value="Lu"/>
              <Picker.Item label="Giant"    value="Giant"/>
              <Picker.Item label="Mccormick"    value="Mccormick"/>
              <Picker.Item label="Topco Associates Inc"    value="Topco Associates Inc"/>
              <Picker.Item label="Essential Everyday"    value="Essential Everyday"/>
              <Picker.Item label="Barilla"    value="Barilla"/>
              <Picker.Item label="Giant Eagle Inc"    value="Giant Eagle Inc"/>
              <Picker.Item label="Hy Vee Inc"    value="Hy Vee Inc"/>
              <Picker.Item label="Maggi"    value="Maggi"/>
              <Picker.Item label="Big Y"    value="Big Y"/>
              <Picker.Item label="Mondelez"    value="Mondelez"/>
              <Picker.Item label="Milka"    value="Milka"/>
              <Picker.Item label="Ferrara Candy Company"    value="Ferrara Candy Company"/>
              <Picker.Item label="Weis Markets Inc"    value="Weis Markets Inc"/>
              <Picker.Item label="oplait"    value="Yoplait"/>
              <Picker.Item label="Clover Valley"    value="Clover Valley"/>
              <Picker.Item label="Dr Oetker"    value="Dr Oetker"/>
              <Picker.Item label="Lidl"    value="Lidl"/>
              <Picker.Item label="Ferrero"    value="Ferrero"/>
              <Picker.Item label="Heinz"    value="Heinz"/>
              <Picker.Item label="Bio Village"    value="Bio Village"/>
              <Picker.Item label="Coca Cola"    value="Coca Cola"/>
              <Picker.Item label="Jardin Bio"    value="Jardin Bio"/>
              <Picker.Item label="Primeal"    value="Primeal"/>
              <Picker.Item label="Le Gaulois"    value="Le Gaulois"/>
              <Picker.Item label="Paturages"    value="Paturages"/>
              <Picker.Item label="Brookshire's"    value="Brookshire's"/>
              <Picker.Item label="Bonduelle"    value="Bonduelle"/>
              <Picker.Item label="Chabrior"    value="Chabrior"/>
              <Picker.Item label="The Hain Celestial Group Inc"    value="The Hain Celestial Group Inc  "/>
              <Picker.Item label="Key Food"    value="Key Food"/>
              <Picker.Item label="Andros"    value="Andros"/>
              <Picker.Item label="U Bio"    value="U Bio"/>
              <Picker.Item label="Aldi Benner Company"    value="Aldi Benner Company"/>
              <Picker.Item label="Herta"    value="Herta"/>
              <Picker.Item label="Monique Ranou"    value="Monique Ranou"/>



        </Picker>
        </Form>
    </Col>
    <Col>
    <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"95%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champTopBrand',params:{brand:this.state.topBrand}})}> 
    <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
  </Button>
    
  </Col>
  </Row>

 


</View>


</Content>
</Container>
              );
            }
            
      return (          
        <Container>
  
  <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
          <Row style={{width:"100%"}}>
          <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="arrow-back" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.goBack()}></Icon>
              </Col>
              <Col style={{width:"70%",justifyContent:"center",alignContent:"center"}}>
              <Text style={{fontWeight:"bold",fontSize:23,color:"white",textAlign:"center",}}>
              Healthy Food
           </Text>
              </Col>
              <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="person" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.navigate('Profile')}></Icon>
              </Col>
          </Row>

        </Header>
        <Content >
        {/* <ImageBackground source={require('../../assets/top-1.png')} style={{width:"100%", height:45,position:"absolute"}} resizeMode={'stretch'}>
        </ImageBackground> */}
            <View  style={{flex: 1,alignItems: 'center',marginTop:"20%"}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>{this.props.language.searchByBarcode}</Text>
                <View style={{backgroundColor:"#fff",borderColor:"#249ec4",borderWidth:1,borderRadius:8,marginTop:"3%"}}>
                <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{fontSize:40, color:"#4eb9cb",padding:15}} onPress={()=>this.props.navigation.navigate('BarcodeSearch')}></Icon>
                </View>
                <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.productNameOrbarcode} </Text>
            <View style={{flex:1,flexDirection:"row",alignSelf:"center", width:"90%",marginTop:"5%"}}>
              
                
                    <Item style={{width:"70%" ,height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd",borderColor:"#fff"}}>
                        <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode3} onChangeText={searchBarcode=>this.setState({searchBarcode})} value={this.state.searchBarcode}/>
                        <Icon name="ios-search" />
                    </Item>
                
                <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"30%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'ChampBarcode',params:{barcode:this.state.searchBarcode}})}> 
            <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
          </Button>
            </View>

            
            <Text style={{fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.productNameOrbarcode1} </Text>
            <View style={{flex:1,flexDirection:"row",alignSelf:"center", width:"90%",marginTop:"5%"}}>                      
                <View style={{flexDirection:"row" ,width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd",borderColor:"#fff"}}>
                    <Item style={{width:"100%"}}>
                        <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode2} onChangeText={searchData=>this.setState({searchData})} value={this.state.searchData}/>
                        <Icon name="ios-search" />
                    </Item>
                </View>
                <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"30%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champProductName',params:{name:this.state.searchData}})}> 
            <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
          </Button>
            </View>
            <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}>{this.props.language.productCategories}</Text>
            <Row style={{alignSelf:"center", width:"90%",marginTop:"5%"}}> 
            
            <Col style={{width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd"}}>
                <Form>
            
                <Picker selectedValue={this.state.productCatId} style={{height: 50, width: "100%" }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({productCatId: itemValue})}>
                       
                      <Picker.Item label={this.props.language.productCategories} value={null} />
                      <Picker.Item label="Pasta Dishes"     value="Pasta Dishes"/>
                      <Picker.Item label="Sugary Snacks"    value="Sugary Snacks"/>
                      <Picker.Item label="Biscuits Sables"  value="  Biscuits Sables"/>
                      <Picker.Item label="Pastries"         value="Pastries"/>
                      <Picker.Item label="Biscuits And Cakes"         value="Biscuits And Cakes"/>
                      <Picker.Item label="Meat Based Products"         value="Meat Based Products"/>
                      <Picker.Item label="Meals"         value="Meals"/>
                      <Picker.Item label="Preparations Made From Fish Meat"         value="Preparations Made From Fish Meat"/>
                      <Picker.Item label="Shortbread Cookies"         value="Shortbread Cookies"/>
                      <Picker.Item label="Meals With Fish"         value="Meals With Fish"/>
                      <Picker.Item label="Plant Based Foods And Beverages"         value="Plant Based Foods And Beverageseals"/>
                      <Picker.Item label="Plant Based Foods"         value="Plant Based Foods"/>
                      <Picker.Item label="Pizzas Tartes Salees Et Quiches"         value="Pizzas Tartes Salees Et Quiches"/>
                      <Picker.Item label="Sables"         value="Sables"/>
                      <Picker.Item label="Cereals And Potatoes"         value="Cereals And Potatoesles"/>
                      <Picker.Item label="Cereals And Their Products"         value="Cereals And Their Products"/>
                      <Picker.Item label="Pastas"         value="Pastas"/>
                      <Picker.Item label="Meals With Meat"         value="Meals With Meat"/>
                      <Picker.Item label="Pasteurized Cheeses"         value="Pasteurized Cheeses"/>
                      <Picker.Item label="Assorted Chocolate Candies"         value="Assorted Chocolate Candies"/>
                      <Picker.Item label="Confectioneries"         value="Confectioneries"/>
                      <Picker.Item label="Seafood"         value="Seafood"/>
                      <Picker.Item label="Produits Aoc"         value="Produits Aoc"/>
                      <Picker.Item label="Biscuits"         value="Biscuits"/>
                      <Picker.Item label="Aoc Products"         value="Aoc Products"/>
                      <Picker.Item label="Meringues"         value="Meringues"/>
                      <Picker.Item label="Beverages"         value="Beverages"/>
                      <Picker.Item label="Breton Cakes"         value="Breton Cakes"/>
                      <Picker.Item label="Assortiments De Bonbons De Chocolat"         value="Assortiments De Bonbons De Chocolat"/>
                      <Picker.Item label="Nougats"         value="Nougats"/>
                      <Picker.Item label="Plats Prepares A Base De Pates"         value="Plats Prepares A Base De Pates"/>
                      <Picker.Item label="Pork Meals"         value="Pork Meals"/>
                      <Picker.Item label="Pizzas"         value="Pizzas"/>
                      <Picker.Item label="Unpasteurised Cheeses"         value="Unpasteurised Cheeses"/>
                      <Picker.Item label="Bolognese Lasagne"         value="Bolognese Lasagne"/>
                      <Picker.Item label="Christmas Foods And Drinks"         value="Christmas Foods And Drinks"/>
                      <Picker.Item label="Christmas Sweets"         value="Christmas Sweets"/>
                      <Picker.Item label="Flavoured"         value="Flavoured"/>
                      <Picker.Item label="Cheese Pizzas"         value="Cheese Pizzas"/>
                      <Picker.Item label="Lasagnes A La Bolognaise"         value="Lasagnes A La Bolognaise"/>
                      <Picker.Item label="Dairies"         value="Dairies"/>
                      <Picker.Item label="Ravioli Frais"         value="Ravioli Frais"/>
                      <Picker.Item label="Fruits And Vegetables Based Foods"         value="Fruits And Vegetables Based Foods"/>
                      <Picker.Item label="Desserts"         value="Desserts"/>
                      <Picker.Item label="Bonbons"         value="Bonbons"/>
                      <Picker.Item label="Chocolate Candies"         value="Chocolate Candies"/>
                      <Picker.Item label="Pasta In A Box"         value="Pasta In A Box"/>
                      <Picker.Item label="Dairy Drinks"         value="Dairy Drinks"/>
                      <Picker.Item label="Flavoured Milks"         value="Flavoured Milks"/>
                      <Picker.Item label="Instant Pasta"         value="Instant Pasta"/>
                      <Picker.Item label="Waffles"         value="Waffles"/>
                      <Picker.Item label="Wraps"         value="Wraps"/>
                      <Picker.Item label="Plant Milks"         value="Plant Milks"/>
                      <Picker.Item label="Plant Based Beverages"         value="Plant Based Beverages"/>
                      <Picker.Item label="Added"         value="Added"/>
                      <Picker.Item label="Raviolis Frais"         value="Raviolis Frais"/>
                      <Picker.Item label="Fruits Based Foods"         value="Fruits Based Foods"/>
                      <Picker.Item label="Prepared Vegetables"         value="Prepared Vegetables"/>
                      <Picker.Item label="Wrap"         value="Wrap"/>
                      <Picker.Item label="Fermented Foods"         value="Fermented Foods"/>
                      <Picker.Item label="Fermented Milk Products"         value="Fermented Milk Products"/>
                      <Picker.Item label="Cheeses"         value="Cheeses"/>
                      <Picker.Item label="Milk Jams"         value="Milk Jams"/>
                     

                  

              </Picker>
           
                </Form>
            </Col>
            <Col>
            <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"95%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champProductCategories',params:{categories:this.state.productCatId}})}> 
            <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
          </Button>
            
          </Col>
          </Row>
          <Text style={{alignItems:"flex-start",fontWeight:"bold",fontSize:20,marginTop:"5%"}}> {this.props.language.diseaseCategories} </Text>
          <Row style={{alignSelf:"center", width:"90%",marginTop:"5%"}}> 
            
            <Col style={{width:"70%",height:50,alignSelf:"center",borderRadius:20,backgroundColor:"#ddd"}}>
                <Form>
                <Picker selectedValue={this.state.topBrand} style={{height: 50, width: "100%"}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({topBrand: itemValue})}>
                      <Picker.Item label={this.props.language.diseaseCategories} value={null} />
                      <Picker.Item label="  Auchan"     value="Auchan"/>
                      <Picker.Item label="U"    value="U"/>
                      <Picker.Item label="  Casino"  value="Casino"/>
                      <Picker.Item label="  Leader Price"    value="Leader Price"/>
                      <Picker.Item label="Nestle"    value="Nestle"/>
                      <Picker.Item label="Carrefour"    value="Carrefour"/>
                      <Picker.Item label="Meijer"    value="Meijer"/>
                      <Picker.Item label="Cora"    value="Cora  "/>
                      <Picker.Item label="Propiedad De"    value="Propiedad De"/>
                      <Picker.Item label="Kroger"    value="Kroger"/>
                      <Picker.Item label="Target Stores"    value="Target Stores"/>
                      <Picker.Item label="Great Value"    value="Great Value"/>
                      <Picker.Item label="Monoprix"    value="Monoprix"/>
                      <Picker.Item label="Coop"    value="Coop"/>
                      <Picker.Item label="Migros"    value="Migros"/>
                      <Picker.Item label="Picard"    value="Picard"/>
                      <Picker.Item label="Unilever"    value="Unilever"/>
                      <Picker.Item label="Ahold"    value="Ahold"/>
                      <Picker.Item label="Roundy's"    value="Roundy's"/>
                      <Picker.Item label="Sans Marque"    value="Sans Marque"/>
                      <Picker.Item label="Netto"    value="Netto"/>
                      <Picker.Item label="Weis"    value="Weis"/>
                      <Picker.Item label="Food Lion"    value="Food Lion"/>
                      <Picker.Item label="Spartan"    value="Spartan"/>
                      <Picker.Item label="Shoprite"    value="Shoprite"/>
                      <Picker.Item label="Marque Repere"    value="Marque Repere"/>
                      <Picker.Item label="Belle France"    value="Belle France"/>
                      <Picker.Item label="Food Club"    value="Food Club"/>
                      <Picker.Item label="La Vie Claire"    value="La Vie Claire"/>
                      <Picker.Item label="Knorr"    value="Knorr"/>
                      <Picker.Item label="Delhaize"    value="Delhaize"/>
                      <Picker.Item label="Wal Mart Stores Inc"    value="Wal Mart Stores Inc"/>
                      <Picker.Item label="Franprix"    value="FranprixU"/>
                      <Picker.Item label="Fleury Michon"    value="Fleury Michon"/>
                      <Picker.Item label="Lindt"    value="Lindt"/>
                      <Picker.Item label="365 Everyday Value"    value="365 Everyday Value"/>
                      <Picker.Item label="Danone"    value="Danone"/>
                      <Picker.Item label="Whole Foods Market"    value="Whole Foods Market  "/>
                      <Picker.Item label="Hy Vee"    value="Hy Vee"/>
                      <Picker.Item label="Dia"    value="Dia"/>
                      <Picker.Item label="Wegmans"    value="Wegmans"/>
                      <Picker.Item label="Thiriet"    value="Thiriet"/>
                      <Picker.Item label="Intermarche"    value="Intermarche"/>
                      <Picker.Item label="Hannaford"    value="Hannaford"/>
                      <Picker.Item label="Market Pantry"    value="Market Pantry"/>
                      <Picker.Item label="Meijer Inc"    value="Meijer Inc"/>
                      <Picker.Item label="Safeway Inc"    value="Safeway Inc"/>
                      <Picker.Item label="Leclerc"    value="Leclerc"/>
                      <Picker.Item label="Harris Teeter"    value="Harris Teeter"/>
                      <Picker.Item label="Goya"    value="Goya"/>
                      <Picker.Item label="Hacendado"    value="Hacendado"/>
                      <Picker.Item label="The Kroger Co"    value="The Kroger Co"/>
                      <Picker.Item label="Lipton"    value="Lipton"/>
                      <Picker.Item label="Haribo"    value="Haribo"/>
                      <Picker.Item label="Food Town Stores Inc"    value="Food Town Stores Inc"/>
                      <Picker.Item label="Tesco"    value="Tesco"/>
                      <Picker.Item label="Whole Foods Market Inc"    value="Whole Foods Market Inc"/>
                      <Picker.Item label="Weis Quality"    value="Weis Quality"/>
                      <Picker.Item label="Hannaford Bros Co"    value="Hannaford Bros Co"/>
                      <Picker.Item label="Kellogg's"    value="Kellogg's"/>
                      <Picker.Item label="Boni"    value="Boni  "/>
                      <Picker.Item label="Alnatura"    value="Alnatura"/>
                      <Picker.Item label="Giant Eagle"    value="Giant Eagle"/>
                      <Picker.Item label="Lu"    value="Lu"/>
                      <Picker.Item label="Giant"    value="Giant"/>
                      <Picker.Item label="Mccormick"    value="Mccormick"/>
                      <Picker.Item label="Topco Associates Inc"    value="Topco Associates Inc"/>
                      <Picker.Item label="Essential Everyday"    value="Essential Everyday"/>
                      <Picker.Item label="Barilla"    value="Barilla"/>
                      <Picker.Item label="Giant Eagle Inc"    value="Giant Eagle Inc"/>
                      <Picker.Item label="Hy Vee Inc"    value="Hy Vee Inc"/>
                      <Picker.Item label="Maggi"    value="Maggi"/>
                      <Picker.Item label="Big Y"    value="Big Y"/>
                      <Picker.Item label="Mondelez"    value="Mondelez"/>
                      <Picker.Item label="Milka"    value="Milka"/>
                      <Picker.Item label="Ferrara Candy Company"    value="Ferrara Candy Company"/>
                      <Picker.Item label="Weis Markets Inc"    value="Weis Markets Inc"/>
                      <Picker.Item label="oplait"    value="Yoplait"/>
                      <Picker.Item label="Clover Valley"    value="Clover Valley"/>
                      <Picker.Item label="Dr Oetker"    value="Dr Oetker"/>
                      <Picker.Item label="Lidl"    value="Lidl"/>
                      <Picker.Item label="Ferrero"    value="Ferrero"/>
                      <Picker.Item label="Heinz"    value="Heinz"/>
                      <Picker.Item label="Bio Village"    value="Bio Village"/>
                      <Picker.Item label="Coca Cola"    value="Coca Cola"/>
                      <Picker.Item label="Jardin Bio"    value="Jardin Bio"/>
                      <Picker.Item label="Primeal"    value="Primeal"/>
                      <Picker.Item label="Le Gaulois"    value="Le Gaulois"/>
                      <Picker.Item label="Paturages"    value="Paturages"/>
                      <Picker.Item label="Brookshire's"    value="Brookshire's"/>
                      <Picker.Item label="Bonduelle"    value="Bonduelle"/>
                      <Picker.Item label="Chabrior"    value="Chabrior"/>
                      <Picker.Item label="The Hain Celestial Group Inc"    value="The Hain Celestial Group Inc  "/>
                      <Picker.Item label="Key Food"    value="Key Food"/>
                      <Picker.Item label="Andros"    value="Andros"/>
                      <Picker.Item label="U Bio"    value="U Bio"/>
                      <Picker.Item label="Aldi Benner Company"    value="Aldi Benner Company"/>
                      <Picker.Item label="Herta"    value="Herta"/>
                      <Picker.Item label="Monique Ranou"    value="Monique Ranou"/>



                </Picker>
                </Form>
            </Col>
            <Col>
            <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"95%",backgroundColor:"#009479"}} onPress={()=>this.props.navigation.navigate({routeName: 'champTopBrand',params:{brand:this.state.topBrand}})}> 
            <Text style={{fontSize:20,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
          </Button>
            
          </Col>
          </Row>
        
         
       
        
        </View>
      
        
        </Content>
        </Container>
      );
    }
    else{
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
        </View>
        );
    }
    }
  }
  mapStateToProps = (state) => ({
    availableProducts: state.product,
    userInfo:state.userDetails,
    periods:state.periods.periods,
    diseasesCategories:state.selectDiseases.diseasesCategories,
    productCategories:state.product_categories.availableProductCategories,
    language:state.selectdLanguage.selectdLanguage,
  })
  const mapDispatchToProps = (dispatch) => ({
  fetchProductsCategories:()=>dispatch(productCategoryAction.fetchProductCategory()),
  fetchProducts:(user_id)=>dispatch(productsActions.fetchProducts(user_id)),
  fetchPeriods:()=>dispatch(periodsAction.fetchPeriods()),
  fetchDiseases:()=>dispatch(diseaseAction.fetchDiseaseCategories()),
  fetchChoices:()=>dispatch(choicesAction.fetchChoices()),
  fetchSpecialistList:()=>dispatch(specialistListAction.fetchDoctorSpicalists()),
  });
  export default connect(mapStateToProps,mapDispatchToProps)(HealthyFood);