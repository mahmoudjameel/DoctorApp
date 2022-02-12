import React from "react";
import {Modal,ScrollView,View,FlatList} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import { Container,Text, Header, Content,Textarea,Item,Input, Form,Label,Fab,Title,Right,Picker,Icon,Button, H3, Left,Body,Footer, List,ListItem, Row, Col } from "native-base";
import {connect} from 'react-redux';
import axios  from 'axios';
import {  BASE_URL } from '../../store/constants';

import Slider from '@react-native-community/slider';
import * as medicationAction from '../../store/actions/medications';

class PatientConsultScreen extends ValidationComponent {
  state={
    appointment_id:this.props.navigation.getParam('appointment_id'),
    weight:0,
    temprature:0,
    temprature_c:0,
    bloodPressureSystolic:0,
    bloodPressureDiastolic:0,
    notes:'',
    consultingType:'',
    forDiseases:[],
    modalDiseasesVisible:false,
    height:0,
    diseasesData:[],
    diseasesDataBackup:[],
    refresh:false,
    modalDiagnosisVisible:false,
    diagnosisList:'',
    diagnosisResponse:'',
    forDiagnosis:'',
    forDiagnosis_id:'',
    loadingDiagnosis:false
  }
  componentDidMount(){
    this.props.fetchMedications();
    this.setState({
      diseasesData:this.props.diseasesCategories,
      diseasesDataBackup:this.props.diseasesCategories,
    })
   this.fetchDiagnosisList();
  }
  async fetchDiagnosisList(){
    try {
      const diagnosisResponse = await axios.get(BASE_URL+'/diseases/diagnosis/api', {
      })
      console.log(diagnosisResponse);
      this.setState({diagnosisList:diagnosisResponse.data.results,diagnosisResponse:diagnosisResponse})
      
  } catch (error) {
      
      throw new Error('Something went wrong!');

  }
  }
  async searchDiagnosisList(event){
    searchText = event.nativeEvent.text;
    console.log(searchText);
    try {
      const diagnosisResponse = await axios.get(BASE_URL+'/diseases/diagnosis/api?search='+searchText, {
      })
      console.log(diagnosisResponse);
      this.setState({diagnosisList:diagnosisResponse.data.results,diagnosisResponse:diagnosisResponse})
      
  } catch (error) {
      
      throw new Error('Something went wrong!');

  }
  }
  setSearchText(event){
    searchText = event.nativeEvent.text;
    data       = this.state.diseasesDataBackup;
    
    searchText = searchText.trim().toLowerCase();
   data = data.filter(l => {
    return l.name.toLowerCase().match( searchText );
   });
   this.setState({
    diseasesData : data
    });
   }


   addForDisease =(id,name)=>{
    this.state.forDiseases.push({diseaseId:id,diseaseName:name})
    this.setState({refresh:!this.state.refresh})
   }
   _onNext = ()=>{
     this.validate({
       consultingType:{required:true}
     })
     if(this.isFormValid()){
      this.props.navigation.navigate({
        routeName:'AddDrug',
        params:{
          weight:this.state.weight,
          height:this.state.height,
          temprature:this.state.temprature,
          bloodPressureSystolic:this.state.bloodPressureSystolic,
          bloodPressureDystolic:this.state.bloodPressureDiastolic,
          notes:this.state.notes,
          forDiseases:this.state.forDiseases,
          consultingType:this.state.consultingType,
          appointment_id:this.state.appointment_id,
        }
      })
     }
   }
   _tempChange = value =>{
      let celsius = (value-32)*5/9
      
      this.setState({temprature:value,temprature_c:Math.round(celsius)})
   }
   getMoreDiagnosis = async ()=>{
     this.setState({loadingDiagnosis:true})
    
    try {
      const diagnosisResponse = await axios.get(this.state.diagnosisResponse.data.next, {
      })
      console.log(diagnosisResponse);
      this.setState({diagnosisList:[...this.state.diagnosisList,...diagnosisResponse.data.results],diagnosisResponse:diagnosisResponse})
      
  } catch (error) {
      
      throw new Error('Something went wrong!');

  }
  this.setState({loadingDiagnosis:false})
   }
      
  render() {
    
    const _renderSelectedDiseases = disease =>{
    return(
      <ListItem noIndent>
        <Body>
            <Text>{disease.item.diseaseName}</Text>
        </Body>
      <Right>
        <Icon name="delete" type="AntDesign" style={{color:"red"}} onPress={()=>this.setState({forDiseases:this.state.forDiseases.filter(dis=>dis.diseaseId != disease.item.diseaseId)})} />
        </Right>
    </ListItem>
    );      
    }
    const renderDiagnosis = diagnosis =>{
      return(<ListItem noIndent onPress={()=>this.setState({forDiagnosis_id:diagnosis.item.id,forDiagnosis:diagnosis.item.name,modalDiagnosisVisible:false})}>
      <Body>
          <Text>{diagnosis.item.name}</Text>
      </Body>
      <Right/>
    </ListItem>);
    }

    const renderdiseases = disease=>{
      
      const is_available = this.state.forDiseases.some(dis=>dis.diseaseId == disease.item.id);
      
      if(is_available){
        return(<ListItem noIndent style={{backgroundColor:"#009479"}} onPress={()=>this.setState({forDiseases:this.state.forDiseases.filter(dis=>dis.diseaseId != disease.item.id)})}>
          <Body>
              <Text style={{color:"white"}}>{disease.item.name}</Text>
          </Body>
          <Right/>
        </ListItem>);
      }else{
        return(<ListItem noIndent onPress={()=>this.addForDisease(disease.item.id,disease.item.name)}>
          <Body>
              <Text>{disease.item.name}</Text>
          </Body>
          <Right/>
        </ListItem>);
      }
    }
    return (
      <Container>
          <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}}>
              <Left>
                  <Button transparent onPress={()=>this.props.navigation.navigate('PatientInfo')}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
              <Body>
                  <Title>Consultation</Title>
              </Body>
              <Right>
                  <Button transparent onPress={()=>this._onNext()}>
                      <Text>Next</Text>
                  </Button>
              </Right>
            </Header>
        <Modal visible={this.state.modalDiseasesVisible}>
          <Container>
            <Header style={{backgroundColor:"#225B59"}}>
              <Left>
                  <Button transparent onPress={()=>this.setState({modalDiseasesVisible:false})}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
              <Body>
                  <Title>Add Disease</Title>
              </Body>
              <Right>
                  <Button transparent onPress={()=>this.setState({modalDiseasesVisible:false})}>
                      <Text>Done</Text>
                  </Button>
              </Right>
            </Header>
            <Content>
                <Item style={{width:"90%",marginLeft:"5%"}}>
                <Icon name="ios-search" />
                <Input placeholder="Search Disease" onChange={this.setSearchText.bind(this)}/>
                </Item>
                <List style={{borderBottomWidth:0.5,borderRadius:10,marginBottom:"2%"}}>
                        <FlatList
                            keyExtractor={(item, index) => item.id.toString()}
                            data={this.state.diseasesData}
                            renderItem={renderdiseases}
                            extraData={this.state}
                        />
                </List>
            </Content>
          </Container>
        </Modal>
        <Modal visible={this.state.modalDiagnosisVisible}>
          <Container>
            <Header style={{backgroundColor:"#225B59"}}>
              <Left>
                  <Button transparent onPress={()=>this.setState({modalDiagnosisVisible:false})}>
                      <Icon name='arrow-back' />
                  </Button>
              </Left>
              <Body>
                  <Title>Select Diagnosis</Title>
              </Body>
              <Right>
                  <Button transparent onPress={()=>this.setState({modalDiagnosisVisible:false})}>
                      <Text>Done</Text>
                  </Button>
              </Right>
            </Header>
                <Item style={{width:"90%",marginLeft:"5%"}}>
                <Icon name="ios-search" />
                <Input placeholder="Search Disease" onChange={this.searchDiagnosisList.bind(this)}/>
                </Item>
                <List style={{borderBottomWidth:0.5,borderRadius:10,marginBottom:"2%"}}>
                        <FlatList
                            keyExtractor={(item, index) => String(index)}
                            data={this.state.diagnosisList}
                            renderItem={renderDiagnosis}
                            extraData={this.state}
                            onEndReachedThreshold={0.1}
                            onEndReached={this.getMoreDiagnosis}
                           
                        />
                </List>
          </Container>
        </Modal>
        <Content>
          <List>
          <ListItem noBorder>
            <Text style={{fontWeight:"bold"}}>Session Name</Text>
          </ListItem>
            <ListItem>
              <Item regular error={this.isFieldInError('consultingType')?true:false}>
                  <Input ref='consultingType' placeholder='eg:-general checkup,fever,etc..' onChangeText={value=>this.setState({consultingType:value})} />
              </Item>
            </ListItem>
            <ListItem itemDivider>
              <Text style={{fontWeight:"bold",marginTop:"5%"}}>Today's Weight</Text>
            </ListItem>  
            <ListItem>
              <Slider
                style={{width: "90%",height:40}}
                minimumValue={0}
                maximumValue={200}
                minimumTrackTintColor="#009479"
                maximumTrackTintColor="#000000"
                thumbTintColor="#009479"
                onValueChange={value=>this.setState({weight:value})}
                step={1}
              />
              <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.weight}KG</Text>
            </ListItem>

            <ListItem itemDivider>
                <Text style={{fontWeight:"bold"}}>Height</Text>
            </ListItem>  

            <ListItem>
            <Slider
              style={{width: "90%",height:40}}
              minimumValue={0}
              maximumValue={300}
              minimumTrackTintColor="#009479"
              maximumTrackTintColor="#000000"
              thumbTintColor="#009479"
              onValueChange={value=>this.setState({height:value})}
              step={1}
            />
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.height}Cm</Text>
            </ListItem>

          <ListItem itemDivider>
            <Text style={{fontWeight:"bold"}}>Body Temparature</Text>
          </ListItem>
          <ListItem>    
            <Slider
              style={{width: "86%",height:40}}
              minimumValue={0}
              maximumValue={130}
              minimumTrackTintColor="#009479"
              maximumTrackTintColor="#000000"
              thumbTintColor="#009479"
              onValueChange={value=>this._tempChange(value)}
              step={1}
            />
            <Col>
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.temprature}&#8457;</Text>
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.temprature_c}&#8451;</Text>
            </Col>
          </ListItem>

          <ListItem itemDivider>
              <Text style={{fontWeight:"bold"}}>Today Blood Pressure</Text>
          </ListItem>
          <ListItem itemHeader>
              <Text>Systolic</Text>
          </ListItem>    
          <ListItem>        
            <Slider
              style={{width: "80%",height:40}}
              minimumValue={0}
              maximumValue={200}
              minimumTrackTintColor="#009479"
              maximumTrackTintColor="#000000"
              thumbTintColor="#009479"
              onValueChange={value=>this.setState({bloodPressureSystolic:value})}
              step={1}
            />
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.bloodPressureSystolic}mmHg</Text>
          </ListItem>
          <ListItem itemHeader>
              <Text>Diastolic</Text>
          </ListItem>    
          <ListItem>        
            <Slider
              style={{width: "80%",height:40}}
              minimumValue={0}
              maximumValue={200}
              minimumTrackTintColor="#009479"
              maximumTrackTintColor="#000000"
              thumbTintColor="#009479"
              onValueChange={value=>this.setState({bloodPressureDiastolic:value})}
              step={1}
            />
            <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.bloodPressureDiastolic}mmHg</Text>
          </ListItem>
          <ListItem itemDivider>
              <Text style={{fontWeight:"bold"}}>For Disease</Text>
          </ListItem>    
          <ListItem itemHeader onPress={()=>this.setState({modalDiseasesVisible:true})}>
              <Icon name="plus" type="AntDesign"/>
              <Text>Add Disease</Text>
          </ListItem>
          <FlatList
            data={this.state.forDiseases}
            renderItem={_renderSelectedDiseases}
            extraData={this.state}
          />
          
          <ListItem itemHeader onPress={()=>this.setState({modalDiagnosisVisible:true})}>
              <Icon name="plus" type="AntDesign"/>
              <Text>Add Diagnosis</Text>
          </ListItem>
         { this.state.forDiagnosis == '' ? <ListItem noIndent>
             
          </ListItem>:<ListItem noIndent>
             <Body>
               <Text>{this.state.forDiagnosis}</Text>
             </Body>
            <Right>
              <Icon name="delete" type="AntDesign" style={{color:"red"}} onPress={()=>this.setState({forDiagnosis:''})} />
              </Right>
          </ListItem>}
          </List>
          <Form>
            <Textarea rowSpan={5} style={{width:"90%",alignSelf:"center"}} bordered placeholder="Notes" onChangeText={value=>this.setState({notes:value})}/>
          </Form>
        </Content>
      </Container>
    );
  }
}
mapStateToProps =(state)=>({
  patientDetails:state.patientDetails.patientDetails,
  diseasesCategories:state.selectDiseases.diseasesCategories,
})
const mapDispatchToProps = (dispatch)=>({
  fetchMedications:()=>dispatch(medicationAction.fetchMedications()), 
})
export default connect(mapStateToProps,mapDispatchToProps)(PatientConsultScreen);