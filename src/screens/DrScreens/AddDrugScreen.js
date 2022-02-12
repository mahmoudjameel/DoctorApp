import React, { Component } from "react";
import {Modal,ScrollView,View,FlatList} from 'react-native';
import { Container, Header,Text, Accordion,Content,Fab,Thumbnail,Textarea,Item,Input, Form,Label,Right,Title,Picker,Icon,Button, H3, Left,Body,Footer, List,ListItem, Row, Col, Badge } from "native-base";
import {connect} from 'react-redux';
import * as medicationAction from '../../store/actions/medications'
import {BASE_URL} from '../../store/constants'
import Slider from '@react-native-community/slider';

class AddDrugScreen extends Component{
    state={
        weight:this.props.navigation.getParam('weight'),
        temprature:this.props.navigation.getParam('temprature'),
        bloodPressureSystolic:this.props.navigation.getParam('bloodPressureSystolic'),
        bloodPressureDystolic:this.props.navigation.getParam('bloodPressureDystolic'),
        notes:this.props.navigation.getParam('notes'),
        consultingType:this.props.navigation.getParam('consultingType'),
        forDiseases:this.props.navigation.getParam('forDiseases'),
        appointment_id:this.props.navigation.getParam('appointment_id'),
        height:this.props.navigation.getParam('height'),
        medicenModalVisible:false,
        reportModalVisible:false,
        active:false,
        mediciens:[],
        mediciensBackUp:[],
        selectedDrug:null,
        selectedDrugName:null,
        selectedDrugId:null,
        selectedDrugType:'',
        selectedDrugDosageValue:0,
        selectedDrugDosageStr:'',
        selectedDrugDurationPeriod:'days',
        selectedDrugDurationTime:0,
        selectedDrugRepeateDays:'',
        selectedDrugTimeOfDayMorning:0,
        selectedDrugTimeOfDayNoon:0,
        selectedDrugTimeOfDayEvening:0,
        selectedDrugTimeOfDayNight:0,
        selectedDrugToBeTakenAF:0,
        selectedDrugToBeTakenBF:0,
        selectedDrugNote:'',
        selectedDrugDrNote:'NA',
        prescription:[],
    }
    componentDidMount(){
        this.setState({
            mediciens:this.props.medications,
            mediciensBackUp:this.props.medications,
        })
        
    }
     onAddPrescription = async ()=>{
                            let note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod
                            if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==0){
                                
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    console.log(this.state.selectedDrugToBeTakenAF);
                                    
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning Before Food"
                                    console.log(this.state.selectedDrugToBeTakenAF);
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    console.log(this.state.selectedDrugToBeTakenAF);
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning"
                                }
                            }
                            else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note =this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Night Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Night"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening and Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening and Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening and Night  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening and Night"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Evening"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==1){
                                    if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                        note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening and Night Before Food and After Food"
                                    }
                                    else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                        note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening and Night After Food"
                                    }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                        note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening and Night  Before Food"
                                    }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                        note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening and Night"
                                    }

                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening and Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening and Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening and Night  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening and Night"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==1){
                                    if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                        note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Night Before Food and After Food"
                                    }
                                    else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                        note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Night After Food"
                                    }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                        note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Night  Before Food"
                                    }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                        note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon and Night"
                                    }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and NoonBefore Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and NoonBefore Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Noon"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening and Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening and Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening and Night  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Evening and Night"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evinging  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Evening"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning Night  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Night"
                                }
                            }else if(this.state.selectedDrugTimeOfDayMorning==1 && this.state.selectedDrugTimeOfDayNoon==0 && this.state.selectedDrugTimeOfDayEvening==1 && this.state.selectedDrugTimeOfDayNight==0){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Morning and Evening"
                                }
                            }
                            else if(this.state.selectedDrugTimeOfDayMorning==0 && this.state.selectedDrugTimeOfDayNoon==1 && this.state.selectedDrugTimeOfDayEvening==0 && this.state.selectedDrugTimeOfDayNight==1){
                                if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Night Before Food and After Food"
                                }
                                else if(this.state.selectedDrugToBeTakenAF==1 && this.state.selectedDrugToBeTakenBF == 0){
                                    note= this.state.selectedDrugDosageStr + " " +this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Night After Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 1){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Night  Before Food"
                                }else if(this.state.selectedDrugToBeTakenAF==0 && this.state.selectedDrugToBeTakenBF == 0){
                                    note = this.state.selectedDrugDosageStr +" "+this.state.selectedDrugRepeateDays+" for "+this.state.selectedDrugDurationTime+" "+this.state.selectedDrugDurationPeriod+" in Noon and Night"
                                }
                            }
                            const is_added = this.state.prescription.some(pre=>pre.selectedDrugId == this.state.selectedDrugId)
                        if(is_added){
                            alert("Medicen already added !")
                        }
                        else{
                            await this.state.prescription.push({selectedDrug:this.state.selectedDrug,selectedDrugDosageValue:this.state.selectedDrugDosageValue,selectedDrugDurationPeriod:this.state.selectedDrugDurationPeriod,selectedDrugId:this.state.selectedDrugId,                                        
                                selectedDrugDurationTime:this.state.selectedDrugDurationTime,selectedDrugRepeateDays:this.state.selectedDrugRepeateDays,
                            selectedDrugTimeOfDayMorning:this.state.selectedDrugTimeOfDayMorning,selectedDrugTimeOfDayNoon:this.state.selectedDrugTimeOfDayNoon,selectedDrugTimeOfDayEvening:this.state.selectedDrugTimeOfDayEvening,
                        selectedDrugTimeOfDayNight:this.state.selectedDrugTimeOfDayNight,selectedDrugToBeTakenAF:this.state.selectedDrugToBeTakenAF,selectedDrugToBeTakenBF:this.state.selectedDrugToBeTakenBF
                    ,selectedDrugNote:note,selectedDrugDrNote:this.state.selectedDrugDrNote})
                        }

        this.setState({medicenModalVisible:false})
    }
    onREmovePrescription = (id)=>{
        this.setState({prescription:this.state.prescription.filter(pre=>pre.selectedDrugId != id)})
        
        
        
    }
    onperiodPicker(value){
        this.setState({
            selectedDrugDurationPeriod:value
        });
    }
    tabletDosageIncrement = ()=>{
        let count = this.state.selectedDrugDosageValue;
        let count_increment = count + 1;
        if (this.state.selectedDrugType == "tablet"){
            let srt_value = count_increment+" Tablet"
            this.setState({selectedDrugDosageValue:count_increment,selectedDrugDosageStr:srt_value})    
        }
        else{
            let srt_value = count_increment+" Capsul"
            this.setState({selectedDrugDosageValue:count_increment,selectedDrugDosageStr:srt_value})    
        }
    }
    tabletDosageDecrement =()=>{
        let count = this.state.selectedDrugDosageValue;
        if(count==0){
            if (this.state.selectedDrugType == "tablet"){
                let srt_value = count+" Tablet"
                this.setState({selectedDrugDosageValue:count_increment,selectedDrugDosageStr:srt_value})    
            }
            else{
                let srt_value = count+" Capsul"
                this.setState({selectedDrugDosageValue:count_increment,selectedDrugDosageStr:srt_value})    
            }
        }
        else{
            let count_decrement = count -1;
            if (this.state.selectedDrugType == "tablet"){
                let srt_value = count_decrement+"Tablets"
                this.setState({selectedDrugDosageValue:count_decrement,selectedDrugDosageStr:srt_value})    
            }
            else{
                let srt_value = count_decrement+"capsul"
                this.setState({selectedDrugDosageValue:count_decrement,selectedDrugDosageStr:srt_value})    
            }
        }

    }
    setSearchText(event){
        searchText = event.nativeEvent.text;
        data       = this.state.mediciensBackUp;
        
        searchText = searchText.trim().toLowerCase();
       data = data.filter(l => {
        return l.name.toLowerCase().match( searchText );
       });
       this.setState({
        mediciens : data
        });
       }
    renderDrugDoseView(){
        if (this.state.selectedDrugType=="capsul" || this.state.selectedDrugType=="tablet"){
            return(
                <View style={{marginTop:"5%"}}>
                <Text>Dosage</Text>
                <Row style={{justifyContent:"space-around"}}>
                    <Icon name="minuscircleo" type="AntDesign" color={"#009479"} style={{color:"#009479"}} onPress={()=>this.tabletDosageDecrement()}/>
                    <Text style={{textAlign:"center",alignSelf:"center"}}>{this.state.selectedDrugDosageValue} {this.state.selectedDrugType}</Text>
                    <Icon name="pluscircleo" type="AntDesign" color={"#009479"} style={{color:"#009479"}} onPress={()=>this.tabletDosageIncrement()}/>
                </Row>
            </View>
            )
        }
        else if(this.state.selectedDrugType=="syrup" || this.state.selectedDrugType=="injection"){
            return(
                <View style={{marginTop:"5%"}}>
                <Text>Dosage</Text>
                
                <Slider
                    style={{width: "85%",height:50}}
                    minimumValue={0}
                    maximumValue={50}
                    minimumTrackTintColor="#009479"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#009479"
                    onValueChange={value=>this.setState({selectedDrugDosageValue:value,selectedDrugDosageStr:value+"ml"})}
                    step={1}
                />
                
                <Text style={{fontWeight:"bold",textAlign:"center"}}>{this.state.selectedDrugDosageValue}ml</Text>
            </View>
            )
        }
        
    }
    renderRepeateDaysView(){
        if (this.state.selectedDrugRepeateDays=="everyday"){
            return(<Row style={{justifyContent:"space-around"}}>
            <Button rounded style={{width:"30%",height:30,backgroundColor:"#009479"}}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Everyday</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugRepeateDays:"alternate"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Alternate</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugRepeateDays:"specifice"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Specifice</Text>
            </Button>
        </Row>)
        }
        else if(this.state.selectedDrugRepeateDays=="alternate"){
            return(<Row style={{justifyContent:"space-around"}}>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugRepeateDays:"everyday"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Everyday</Text>
            </Button>
            <Button rounded style={{width:"30%",height:30,backgroundColor:"#009479"}}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Alternate</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugRepeateDays:"specifice"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Specifice</Text>
            </Button>
        </Row>)
        }
        else if(this.state.selectedDrugRepeateDays=="specifice"){
            return(<Row style={{justifyContent:"space-around"}}>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugRepeateDays:"everyday"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Everyday</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugRepeateDays:"alternate"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Alternate</Text>
            </Button>
            <Button rounded style={{width:"30%",height:30,backgroundColor:"#009479"}}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Specifice</Text>
            </Button>
        </Row>)
        }
        else {
            return(<Row style={{justifyContent:"space-around"}}>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugRepeateDays:"everyday"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Everyday</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugRepeateDays:"alternate"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Alternate</Text>
            </Button>
            <Button bordered rounded style={{width:"30%",height:30,borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugRepeateDays:"specifice"})}>
                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Specifice</Text>
            </Button>
        </Row>)
        }
    }
    render(){
        const _renderPrescriptionMedicen = data=>{
            
            return (
                    <ListItem thumbnail>
                    <Left>
                  <Thumbnail square resizeMode={"center"} source={{uri:BASE_URL+data.item.selectedDrug.mobile_icon}}/>
              </Left>
              <Body>
                  <Text>{data.item.selectedDrug.name}({data.item.selectedDrug.manufacturer})</Text>
                  <Text note>{data.item.selectedDrugNote} </Text>
                  <Text note>Dr.Notes:{data.item.selectedDrugDrNote}</Text>
              </Body>
              <Right>
                    <Icon name ="delete" type="AntDesign"style={{color:"red"}} onPress={()=>this.onREmovePrescription(data.item.selectedDrugId)}/>
            </Right>
              </ListItem>  
            );
        }
        const rendermediciens = data=>{
            
            return(
                <ListItem thumbnail onPress={()=>this.setState({selectedDrug:data.item,selectedDrugType:data.item.medicen_type,selectedDrugId:data.item.id})}>
                     <Left>
                        <Thumbnail square resizeMode={"center"} source={{uri:BASE_URL+data.item.mobile_icon}}/>
                    </Left>
                    <Body>
                        <Text>{data.item.name}({data.item.manufacturer})</Text>
                        <Text note>{data.item.medicen_type}</Text>
                    </Body>
                    <Right/>
                </ListItem>
            )
        }
        
        return(
            <Container>
  <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
                        <Left>
                            <Button transparent>
                                <Icon name='arrow-back' onPress={()=>this.props.navigation.navigate('Consult')}/>
                            </Button>
                        </Left>
                        <Body style={{alignItems:"center",width:"100%"}}>
                            <Title style={{textAlign:"center"}}>Drug</Title>
                        </Body>
                        <Right>
                            {this.state.prescription.length >0 ?<Button hasText transparent onPress={()=>this.props.navigation.navigate({
                                routeName:'AddReport',
                                params:{
                                  weight:this.state.weight,
                                  temprature:this.state.temprature,
                                  bloodPressureSystolic:this.state.bloodPressureSystolic,
                                  bloodPressureDystolic:this.state.bloodPressureDystolic,
                                  notes:this.state.notes,
                                  forDiseases:this.state.forDiseases,
                                  consultingType:this.state.consultingType,
                                  prescribedMedications:this.state.prescription,
                                  appointment_id:this.state.appointment_id,
                                  height:this.state.height,

                                }
                            })}>
                                <Text>Next</Text>
                            </Button>:<Button hasText transparent onPress={()=>this.props.navigation.navigate({
                                routeName:'AddReport',
                                params:{
                                  weight:this.state.weight,
                                  temprature:this.state.temprature,
                                  bloodPressureSystolic:this.state.bloodPressureSystolic,
                                  bloodPressureDystolic:this.state.bloodPressureDystolic,
                                  notes:this.state.notes,
                                  consultingType:this.state.consultingType,
                                  forDiseases:this.state.forDiseases,
                                  prescribedMedications:this.state.prescription,
                                  appointment_id:this.state.appointment_id,
                                  height:this.state.height,
                                }
                            })}>
                                <Text>Skip</Text>
                            </Button>}
                          </Right>
                    </Header>
                    <Modal visible={this.state.medicenModalVisible} animationType="fade">
                    <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
                            <Left>
                                <Button transparent onPress={()=>this.setState({medicenModalVisible:false})}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Add Drug</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={()=>this.onAddPrescription()}>
                                    <Text>Add</Text>
                                </Button>
                            </Right>
                        </Header>
                        <Container>
                        <Content padder>
                            {this.state.selectedDrug == null ? <View style={{marginTop:"5%"}}>
                                <Text>Drug Name</Text>
                                    <Item style={{width:"90%",marginLeft:"5%"}}>
                                    <Icon name="ios-search" />
                                    <Input placeholder="Search" onChange={this.setSearchText.bind(this)}/>
                                    </Item>
                                    <List style={{borderBottomWidth:0.5,borderRadius:10,marginBottom:"2%"}}>
                                            <FlatList
                                                keyExtractor={(item, index) => item.id.toString()}
                                                data={this.state.mediciens}
                                                renderItem={rendermediciens}
                                            />
                                    </List>
                            </View>:<View>
                            <View style={{marginTop:"5%"}}>
                                <Text>Drug Name</Text>
                                <ListItem icon style={{borderColor:"#009479",borderRadius:10}}>
                                    <Left>
                                        <Thumbnail square resizeMode={"center"} source={{uri:BASE_URL+this.state.selectedDrug.mobile_icon}}/>
                                    </Left>
                                    <Body>
                                    <Text>{this.state.selectedDrug.name}({this.state.selectedDrug.manufacturer})</Text>
                                    <Text note>{this.state.selectedDrug.medicen_type}</Text>
                                    </Body>
                                    <Right>
                                        <Icon name ="remove" type="FontAwesome"style={{color:"red"}} onPress={()=>this.setState({selectedDrug:null})} />
                                    </Right>
                                </ListItem>
                            </View>
                            {this.renderDrugDoseView()}
                            <View style={{marginTop:"5%"}}>
                                <Text>Duration</Text>
                                <Row style={{justifyContent:"space-around"}}>
                                <Item regular picker style={{borderColor:"#009479",borderRadius:10,width:"40%"}}>
                                    <Picker
                                        ref='durationperiod'
                                        mode='dropdown'
                                        iosIcon={<Icon name="arrow-down" />}
                                        selectedValue={this.state.selectedDrugDurationPeriod}
                                        onValueChange={this.onperiodPicker.bind(this)}
                                    >
                                        <Picker.Item label="Days" value="days" />
                                        <Picker.Item label="Months" value="months" />
                                    </Picker>
                                </Item>
                                <Item regular style={{borderColor:"#009479",borderRadius:10,width:"40%"}}>
                                    <Input keyboardType="number-pad" value={this.state.selectedDrugDurationTime} onChangeText={value=>this.setState({selectedDrugDurationTime:value})}/>
                                </Item>
                                </Row>
                            </View>
                            <View style={{marginTop:"5%"}}>
                                <Text>Repeate days</Text>
                                {this.renderRepeateDaysView()}
                            </View>
                            <View style={{marginTop:"5%"}}>
                                <Text>Time of the day</Text>
                                <Row style={{justifyContent:"space-around"}}>
                                {this.state.selectedDrugTimeOfDayMorning == 1 ? <Col style={{alignSelf:"center"}}>
                                <Button rounded style={{width:40,height:40,alignSelf:"center",backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayMorning:0})}>
                                    <Text>{this.state.selectedDrugTimeOfDayMorning}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Morning</Text>
                                </Col>:<Col style={{alignSelf:"center"}}>
                                <Button rounded bordered style={{width:40,height:40,alignSelf:"center",borderColor:"#009479"}}onPress={()=>this.setState({selectedDrugTimeOfDayMorning:1})}>
                                    <Text style={{color:"black",width:"100%",textAlign:"center"}}>{this.state.selectedDrugTimeOfDayMorning}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Morning</Text>
                                </Col>}
                                {this.state.selectedDrugTimeOfDayNoon ==1 ? <Col style={{alignSelf:"center"}}>
                                <Button rounded style={{width:40,height:40,alignSelf:"center",backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayNoon:0})}>
                                    <Text>{this.state.selectedDrugTimeOfDayNoon}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Noon</Text>
                                </Col>:<Col style={{alignSelf:"center"}}>
                                <Button rounded bordered style={{width:40,height:40,alignSelf:"center",borderColor:"#009479"}}  onPress={()=>this.setState({selectedDrugTimeOfDayNoon:1})}>
                                    <Text style={{color:"black",width:"100%",textAlign:"center"}}>{this.state.selectedDrugTimeOfDayNoon}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Noon</Text>
                                </Col>}
                                {this.state.selectedDrugTimeOfDayEvening == 1 ? <Col style={{alignSelf:"center"}}>
                                <Button rounded style={{width:40,height:40,alignSelf:"center",backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayEvening:0})}>
                                    <Text>{this.state.selectedDrugTimeOfDayEvening}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Evening</Text>
                                </Col>:<Col style={{alignSelf:"center"}}>
                                <Button rounded bordered style={{width:40,height:40,alignSelf:"center",borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayEvening:1})}>
                                    <Text style={{color:"black",width:"100%",textAlign:"center"}}>{this.state.selectedDrugTimeOfDayEvening}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Evening</Text>
                                </Col>}
                                {this.state.selectedDrugTimeOfDayNight ==1 ? <Col style={{alignSelf:"center"}}>
                                <Button rounded style={{width:40,height:40,alignSelf:"center",backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayNight:0})}>
                                    <Text>{this.state.selectedDrugTimeOfDayNight}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Night</Text>
                                </Col>:<Col style={{alignSelf:"center"}}>
                                <Button rounded bordered style={{width:40,height:40,alignSelf:"center",borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugTimeOfDayNight:1})}>
                                    <Text style={{color:"black",width:"100%",textAlign:"center"}}>{this.state.selectedDrugTimeOfDayNight}</Text>
                                </Button>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Night</Text>
                                </Col>}
                                </Row>
                            </View>
                            <View style={{marginTop:"5%"}}>
                                <Text>To be taken</Text>
                                <Row style={{justifyContent:"space-around"}}>
                                {this.state.selectedDrugToBeTakenAF == 1 ?<Button rounded style={{width:"40%",height:30,backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugToBeTakenAF:0})}>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>After food</Text>
                                </Button>:<Button rounded bordered style={{width:"40%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugToBeTakenAF:1})}>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>After food</Text>
                                </Button>}
                                {this.state.selectedDrugToBeTakenBF==1 ?<Button rounded style={{width:"40%",height:30,backgroundColor:"#009479"}} onPress={()=>this.setState({selectedDrugToBeTakenBF:0})}>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center"}} uppercase={false}>Before Food</Text>
                                </Button>:<Button rounded bordered style={{width:"40%",height:30,borderColor:"#009479"}} onPress={()=>this.setState({selectedDrugToBeTakenBF:1})}>
                                <Text style={{fontSize:14,width:"100%",textAlign:"center",color:"black"}} uppercase={false}>Before Food</Text>
                                </Button>}
                                </Row>
                            </View>
                            <View style={{marginTop:"5%"}}>
                                <Text>Note</Text>
                                <Form>
                                    <Textarea rowSpan={3} bordered placeholder="Notes" value={this.state.selectedDrugDrNote} textContentType={"emailAddress"} onChangeText={selectedDrugNote=>this.setState({selectedDrugDrNote:selectedDrugNote})}/>
                                </Form>
                            </View>
                            </View>
                        }
                        </Content>
                    </Container>
                    </Modal>
                <Content padder>
                    {this.state.prescription.length == 0 ? <Text style={{textAlign:"center",width:"100%",height:"100%",justifyContent:"center"}}>No prescription Added</Text>:
                <FlatList
                data={this.state.prescription}
                renderItem={_renderPrescriptionMedicen}
                extraData={this.state}
              />}
                </Content>
                <Footer style={{backgroundColor:"transperent"}}>
          
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#BF2032' }}
            position="bottomRight"
            onPress={()=>this.setState({medicenModalVisible:true,selectedDrug:null,
                selectedDrugName:null,
                selectedDrugId:null,
                selectedDrugType:'',
                selectedDrugDosageValue:0,
                selectedDrugDosageStr:'',
                selectedDrugDurationPeriod:'days',
                selectedDrugDurationTime:0,
                selectedDrugRepeateDays:'',
                selectedDrugTimeOfDayMorning:0,
                selectedDrugTimeOfDayNoon:0,
                selectedDrugTimeOfDayEvening:0,
                selectedDrugTimeOfDayNight:0,
                selectedDrugToBeTakenAF:0,
                selectedDrugToBeTakenBF:0,
                selectedDrugNote:'',
                selectedDrugDrNote:'NA'})}>
            <Icon name="plus"  type="AntDesign"/>
          </Fab>
        </Footer>
            </Container>
        )
    }
}
mapStateToProps = (state) => ({
    userDetails:state.userDetails.userDetails,
    language:state.selectdLanguage.selectdLanguage,
    doctorDetails:state.doctorDetails.doctorDetails,
    medications:state.medications.medications
  })
  
  const mapDispatchToProps = (dispatch) => ({
    fetchMedications:()=>dispatch(medicationAction.fetchMedications()) 
  });
export default connect(mapStateToProps,mapDispatchToProps)(AddDrugScreen);