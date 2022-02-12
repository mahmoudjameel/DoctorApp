import React, { Component } from 'react';
import { View, Dimensions, Alert, ActivityIndicator, ScrollView,Modal, FlatList } from 'react-native';
import {
    Container, Header, Button, Text,
    Content, Form, Item, Input, Label, Icon, List, ListItem, Left, Body, Right,Title
} from 'native-base';
import ValidationComponent from 'react-native-form-validator';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import * as insuranceCompaniesAction from '../store/actions/insurance'
class AddInsurance extends ValidationComponent {
    state = {
        insurance_type: 'personal',
        empoyerListModal :false,
        insuranceListModal :false,
        isLoading:true,
        selectedInsuranceCompany:'',
        selectedInsuranceCompanyId:'',
        insuranceNumber:'',
        selectedEmployeer:'',
        selectedEmployeerId:'',
        employeeId:'',
        employeeEmail:'',
        
    }
    constructor(props) {
        super(props)
    }
    async componentWillMount(){
        await this.props.fetchEmployeersCompanies();
        await this.props.fetchInsuranceComapnies();
        this.setState({isLoading:false})
    }

    render() {
      const _submitInsurance = ()=>{
          this.validate({
            selectedInsuranceCompany:{required:true},
            selectedInsuranceCompanyId:{required:true},
            insuranceNumber:{required:true},
          })
          if (this.isFormValid()){
            const data = {selectedInsuranceCompany:this.state.selectedInsuranceCompanyId,insuranceNumber:this.state.insuranceNumber,user_id:this.props.userInfo.userDetails.user_id}
            this.props.addPersonalInsurance(data)
          }
      }
      const _submitEmployee = ()=>{
          this.validate({
            selectedEmployeer:{required:true},
            selectedEmployeerId:{required:true},
            employeeId:{required:true},
          })
          if (this.isFormValid()){
            const data={selectedEmployeer:this.state.selectedEmployeerId,employeeId:this.state.employeeId,user_id:this.props.userInfo.userDetails.user_id,employeeEmail:this.state.employeeEmail}
            this.props.addEmployeersInsurance(data)
          }
      }
        const renderEmployeer = itemData=>{
          return(
          <List>
            <ListItem onPress={()=>this.setState({selectedEmployeerId:itemData.item.id,selectedEmployeer:itemData.item.company_name,empoyerListModal:false})}>
              <Body>
                <Text>{ itemData.item.company_name }</Text>
              </Body>
              <Right/>
            </ListItem>
          </List>)
          }
          const renderInsurance = itemData=>{
            return(
            <List>
              <ListItem onPress={()=>this.setState({selectedInsuranceCompanyId:itemData.item.id,selectedInsuranceCompany:itemData.item.company_name,insuranceListModal:false})}>
                <Body>
                  <Text>{ itemData.item.company_name }</Text>
                </Body>
                <Right/>
              </ListItem>
            </List>)
            }
        if(this.state.isLoading == true){
            return(
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
              </View>
            )
        }
        return (
            <Container>
                <Modal visible={this.state.empoyerListModal}>
                <Header style={{borderTopRadius:7}}>
            <Left>
              <Button transparent onPress={() => {
                  this.setState({empoyerListModal:false});}}>
                    <Icon name='md-close'/>
              </Button>
            </Left>
              <Body>
                <Title>Select Employeer</Title>
              </Body>
            </Header>
            <ScrollView>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={this.props.employeerCompanies.employers.results}
              renderItem={renderEmployeer}
              extraData={this.props}
              /> 
            </ScrollView>
                </Modal>
                <Modal visible={this.state.insuranceListModal}>
                <Header style={{borderTopRadius:7}}>
            <Left>
              <Button transparent onPress={() => {
                  this.setState({insuranceListModal:false});}}>
                    <Icon name='md-close'/>
              </Button>
            </Left>
              <Body>
                <Title>Select Insurance Company</Title>
              </Body>
            </Header>
            <ScrollView>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={this.props.insuranceCompanies.insuranceCompanies.results}
              renderItem={renderInsurance}
              extraData={this.props}
              /> 
            </ScrollView>
                </Modal>
                <Content padder>
                    <View style={{ height: "20%" }}>
                        <Text>Select Insurance Type</Text>
                        <Grid style={{ marginTop: "5%" }}>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ insurance_type: "personal" })}>
                                <Icon name='user-alt' type="FontAwesome5" onPress={() => this.setState({ insurance_type: "personal" })} style={this.state.insurance_type == "personal" ?{fontSize:40,color:"#17AFB0"} : {fontSize:40,color:"#EBEBE4"}}/>
                                <Text style={this.state.insurance_type=="personal" ? { marginTop: "2%",color:"#4eb9cb" }:{ marginTop: "2%",color:"#EBEBE4" }}>Personal Insurance</Text>
                            </Col>
                            <Col style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.setState({ insurance_type: "employer" })}>
                                <Icon name='office-building' type="MaterialCommunityIcons" onPress={() => this.setState({ insurance_type: "employer" })} style={this.state.insurance_type == "employer" ? {fontSize:40,color:"#17AFB0"}:{fontSize:40,color:"#EBEBE4"}}/>
                                <Text style={this.state.insurance_type=="employer" ? { marginTop: "2%",color:"#4eb9cb" }:{ marginTop: "2%",color:"#EBEBE4" }}>Employer Insurance</Text>
                            </Col>
                        </Grid>
                    </View>
                    {this.state.insurance_type == "personal" ? <Form style={{marginTop:"15%"}}>
            <Item error={this.isFieldInError('selectedInsuranceCompany')?true:false}  fixedLabel>
              <Label>Insurance Company</Label>
              <Input onFocus={()=>this.setState({insuranceListModal:true})} value={this.state.selectedInsuranceCompany}/>
            </Item>
            <Item error={this.isFieldInError('insuranceNumber')?true:false} fixedLabel last>
              <Label>Insurance Number</Label>
              <Input onChangeText={(number)=>this.setState({insuranceNumber:number})} value={this.state.insuranceNumber}/>
            </Item>
            <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>_submitInsurance()} style={{backgroundColor:"#17AFB0"}}><Text style={{width:"100%",textAlign:"center"}}>Submit</Text></Button>
            </View>
          </Form>:  <Form style={{marginTop:"15%"}}>
            <Item error={this.isFieldInError('selectedEmployeer')?true:false} fixedLabel>
              <Label>Employeer</Label>
              <Input onFocus={()=>this.setState({empoyerListModal:true})} value={this.state.selectedEmployeer}/>
            </Item>
            <Item error={this.isFieldInError('employeeId')?true:false} fixedLabel last>
              <Label>Employee Id</Label>
              <Input onChangeText={id=>this.setState({employeeId:id})} value={this.state.employeeId}/>
            </Item>
            <Item floatingLabel last>
              <Label>Employee Email</Label>
              <Input onChangeText={email=>this.setState({employeeEmail:email})}/>
            </Item>
            <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>_submitEmployee()}style={{backgroundColor:"#17AFB0"}}><Text style={{width:"100%",textAlign:"center"}}> Submit </Text></Button>
              </View>
          </Form>}
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => ({
    authInfo: state.auth,
    userInfo: state.userDetails,
    language: state.selectdLanguage,
    employeerCompanies:state.employers,
    insuranceCompanies : state.insuranceCompanies
})

  const mapDispatchToProps = (dispatch) => ({
    fetchEmployeersCompanies: ()=>dispatch(insuranceCompaniesAction.fetchEmployeer()),
    fetchInsuranceComapnies : ()=>dispatch(insuranceCompaniesAction.fetchInsuranceCompanies()),
    addEmployeersInsurance : (data)=>dispatch(insuranceCompaniesAction.AddEmployeerInsurance(data)),
    addPersonalInsurance : (data)=>dispatch(insuranceCompaniesAction.AddPersonallInsurance(data)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(AddInsurance);