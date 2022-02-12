import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Row, Col ,Body,Title} from 'native-base';
import { View,FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';

const DaysButtons = props=>{
    return(
        <Col style={{alignSelf:"center",alignContent:"space-between",marginTop:"5%", width:"80%"}}>                
             <Button light style={{marginBottom:"2%"}} large rounded onPress={props.onSelect}><Text style={{alignSelf:"center",marginLeft:"25%"}}> {props.day} </Text></Button>                    
        </Col>
    )
}
export default DaysButtons