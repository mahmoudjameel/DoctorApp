import React, { Component } from "react";
import {Modal,ScrollView,View,FlatList} from 'react-native';
import { Container,Text, Header, Content,Textarea,Item,Input,Thumbnail, Form,Right,Label,Fab,Title,Picker,Icon,Button, H3, Left,Body,Footer, List,ListItem, Row, Col } from "native-base";
import {connect} from 'react-redux';


export default class AddReportScreen extends Component{
    state={
        weight:this.props.navigation.getParam('weight'),
        height:this.props.navigation.getParam('height'),
        temprature:this.props.navigation.getParam('temprature'),
        bloodPressureSystolic:this.props.navigation.getParam('bloodPressureSystolic'),
        bloodPressureDystolic:this.props.navigation.getParam('bloodPressureDystolic'),
        notes:this.props.navigation.getParam('notes'),
        consultingType:this.props.navigation.getParam('consultingType'),
        prescribedMedications:this.props.navigation.getParam('prescribedMedications'),
        forDiseases:this.props.navigation.getParam('forDiseases'),
        appointment_id:this.props.navigation.getParam('appointment_id'),
        addReportModal:false,
        reportCode:'',
        reportTestName:'',
        reportResult:'',
        reportUnit:'',
        reportStatus:'',
        reportNormalFrom:'',
        reportNormalTo:'',
        reportNote:'',
        diagnosticReports:[]
    }
    onAddReports = ()=>{
        const is_exist = this.state.diagnosticReports.some(reports=>reports.reportCode == this.state.reportCode)
        if (is_exist){
            this.setState({diagnosticReports:this.state.diagnosticReports.filter(reports=>reports.reportCode != this.state.reportCode)})
            this.state.diagnosticReports.push({reportCode:this.state.reportCode,reportTestName:this.state.reportTestName,
                reportResult:this.state.reportResult,reportUnit:this.state.reportUnit,reportStatus:this.state.reportStatus,
            reportNormalFrom:this.state.reportNormalFrom,reportNormalTo:this.state.reportNormalTo,reportNote:this.state.reportNote})
        }
        else{
            this.state.diagnosticReports.push({reportCode:this.state.reportCode,reportTestName:this.state.reportTestName,
                reportResult:this.state.reportResult,reportUnit:this.state.reportUnit,reportStatus:this.state.reportStatus,
            reportNormalFrom:this.state.reportNormalFrom,reportNormalTo:this.state.reportNormalTo,reportNote:this.state.reportNote})
        }
        this.setState({addReportModal:false})
    }
    render(){
        const _renderReports = reports =>{
            console.log(reports);
            
            return (
                <ListItem thumbnail>
                <Left>
              <Thumbnail square resizeMode={"center"} source={require('../../assets/reports.png')}/>
          </Left>
          <Body>
              <Text>{reports.item.reportTestName}({reports.item.reportStatus})</Text>
              <Text note>{reports.item.reportCode} </Text>
          </Body>
          <Right>
                <Icon name ="edit" type="AntDesign"style={{color:"red"}} onPress={()=>this.setState({addReportModal:true,reportCode:reports.item.reportCode,reportTestName:reports.item.reportTestName,
            reportResult:reports.item.reportResult,reportUnit:reports.item.reportUnit,reportStatus:reports.item.reportStatus,
        reportNormalFrom:reports.item.reportNormalFrom,reportNormalTo:reports.item.reportNormalTo,reportNote:reports.item.reportNote})}/>
        </Right>
          </ListItem>  
        );
        }
        return(
            <Container>
  <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back' onPress={()=>this.props.navigation.navigate('AddDrug')}/>
                            </Button>
                        </Left>
                        <Body style={{alignItems:"center",width:"100%"}}>
                            <Title style={{textAlign:"center"}}>Diagnostic Reports</Title>
                        </Body>
                        <Right>
                            {this.state.diagnosticReports.length >0 ?<Button hasText transparent onPress={()=>this.props.navigation.navigate({
                                routeName:'FinishConsultation',
                                params:{
                                  weight:this.state.weight,
                                  temprature:this.state.temprature,
                                  bloodPressureSystolic:this.state.bloodPressureSystolic,
                                  bloodPressureDystolic:this.state.bloodPressureDystolic,
                                  notes:this.state.notes,
                                  forDiseases:this.state.forDiseases,
                                  consultingType:this.state.consultingType,
                                  prescribedMedications:this.state.prescribedMedications,
                                  diagnosticReports:this.state.diagnosticReports,
                                  appointment_id:this.state.appointment_id,
                                  height:this.state.height,
                                }
                            })}>
                                <Text>Next</Text>
                            </Button>:<Button hasText transparent onPress={()=>this.props.navigation.navigate({
                                routeName:'FinishConsultation',
                                params:{
                                  weight:this.state.weight,
                                  temprature:this.state.temprature,
                                  bloodPressureSystolic:this.state.bloodPressureSystolic,
                                  bloodPressureDystolic:this.state.bloodPressureDystolic,
                                  notes:this.state.notes,
                                  forDiseases:this.state.forDiseases,
                                  consultingType:this.state.consultingType,
                                  prescribedMedications:this.state.prescribedMedications,
                                  diagnosticReports:this.state.diagnosticReports,
                                  appointment_id:this.state.appointment_id,
                                  height:this.state.height,
                                }
                            })}>
                                <Text>Skip</Text>
                            </Button>}
                          </Right>
                    </Header>
                <Modal visible={this.state.addReportModal} animationType={"slide"}>
                    <Container>
                    <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
                            <Left>
                                <Button transparent onPress={()=>this.setState({addReportModal:false})}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Add Report</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={()=>this.onAddReports()}>
                                    <Text >Add</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Content padder>
                        <Form>
                            <Item inlineLabel>
                                <Label>Code</Label>
                            <Input placeholder="Text" placeholderTextColor="grey" value = {this.state.reportCode} onChangeText={value=>this.setState({reportCode:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Test Name</Label>
                                <Input placeholder="Text" placeholderTextColor="grey" value={this.state.reportTestName} onChangeText={value=>this.setState({reportTestName:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Result</Label>
                                <Input placeholder="Number" placeholderTextColor="grey" value={this.state.reportResult} onChangeText={value=>this.setState({reportResult:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Unit</Label>
                                <Input placeholder="Text" placeholderTextColor="grey" value={this.state.reportUnit} onChangeText={value=>this.setState({reportUnit:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Status</Label>
                                <Input placeholder="Text" placeholderTextColor="grey" value={this.state.reportStatus} onChangeText={value=>this.setState({reportStatus:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Normal From</Label>
                                <Input placeholder="Number" placeholderTextColor="grey" value={this.state.reportNormalFrom} onChangeText={value=>this.setState({reportNormalFrom:value})}/>
                            </Item>
                            <Item inlineLabel last>
                                <Label>Normal To</Label>
                                <Input placeholder="Number" placeholderTextColor="grey" value={this.state.reportNormalTo} onChangeText={value=>this.setState({reportNormalTo:value})}/>
                            </Item>
                            <Textarea rowSpan={3} bordered placeholder="Note"  onChangeText={value=>this.setState({reportNote:value})}/>
                        </Form>
                        </Content>
                    </Container>
                </Modal>
                <Content padder>
                {this.state.diagnosticReports.length == 0 ? <Text style={{textAlign:"center",width:"100%",height:"100%",justifyContent:"center"}}>No Diagnostic Report Added</Text>:
                <FlatList
                data={this.state.diagnosticReports}
                renderItem={_renderReports}
                extraData={this.state}
              />}
                </Content>
                <Footer style={{backgroundColor:"transperent"}}>
          
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#BF2032'}}
            position="bottomRight"
            onPress={()=>this.setState({addReportModal:true,reportCode:'',
            reportTestName:'',
            reportResult:'',
            reportUnit:'',
            reportStatus:'',
            reportNormalFrom:'',
            reportNormalTo:'',
            reportNote:''})}>
            <Icon name="plus"  type="AntDesign"/>
          </Fab>
        </Footer>
            </Container>
        )
    }
}