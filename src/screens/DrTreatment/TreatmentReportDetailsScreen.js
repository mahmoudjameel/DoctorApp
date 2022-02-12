import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import { Container,Text, Header, Content,Textarea,Item,Input,Thumbnail, Form,Right,Label,Fab,Title,Picker,Icon,Button, H3, Left,Body,Footer, List,ListItem, Row, Col } from "native-base";
import {connect} from 'react-redux';

class TreatmentReportDetailsScreen extends Component {
    state={
        report:'',
    }
    componentDidMount(){
        this.setState({report:this.props.navigation.getParam('report')})
    }
  render() {
    return (
      <Container>
        <Content padder>
        <Form>
            <Item inlineLabel>
                <Label>Code</Label>
            <Input value = {this.state.report.code}/>
            </Item>
            <Item inlineLabel last>
                <Label>Test Name</Label>
                <Input disabled value={this.state.report.test_name}/>
            </Item>
            <Item inlineLabel last>
                <Label>Result</Label>
                <Input disabled value={String(this.state.report.result)}/>
            </Item>
            <Item inlineLabel last>
                <Label>Unit</Label>
                <Input disabled value={this.state.report.unit}/>
            </Item>
            <Item inlineLabel last>
                <Label>Status</Label>
                <Input disabled value={this.state.report.status}/>
            </Item>
            <Item inlineLabel last>
                <Label>Normal From</Label>
                <Input disabled value={String(this.state.report.normal_from)}/>
            </Item>
            <Item inlineLabel last>
                <Label>Normal To</Label>
                <Input disabled value={String(this.state.report.normal_to)}/>
            </Item>
            <Textarea disabled rowSpan={3} bordered value={this.state.report.note}  />
        </Form>
        </Content>
      </Container>
    );
  }
}
TreatmentReportDetailsScreen.navigationOptions = ({navigation })=>{
    return {
      headerTitle: navigation.getParam('title'),
    };
  }
mapStateToProps = (state)=>({
  userDetails:state.userDetails.userDetails,
  consultations:state.consultations.consultations,
  prescriptions:state.prescriptions.prescriptions,
  dignosisReports:state.dignosisReports.dignosisReports
})
export default connect(mapStateToProps)(TreatmentReportDetailsScreen);