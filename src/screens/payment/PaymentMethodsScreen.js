import React, { useState, useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity,ScrollView } from 'react-native';
import { PaymentView } from './components/PaymentView';
import { Container, Header, Content, List, ListItem, Card,Left, Body,H1, Right, Thumbnail, Text, Icon, Row, H2, Col, Button, Footer, Grid, H3, CardItem, CheckBox } from 'native-base';
import axios  from 'axios';
import {  BASE_URL } from '../../store/constants';

const PaymentMethodsScreen = (props) => {
    const price = props.navigation.getParam('price')
    const currencyCode = props.navigation.getParam('currency_code')
    const appintmentDetails = props.navigation.getParam('appointmentDetails')
    const userId = props.navigation.getParam('user_id')
    const isInsured = props.navigation.getParam('isInsured')
    const insuranceType = props.navigation.getParam('insuranceType')
    const climbedAmount = props.navigation.getParam('climbedAmount')
    const insuranceDetails = props.navigation.getParam('insuranceDetails')
    const discount_by =  props.navigation.getParam('discount_by')

    const [response, setResponse ] = useState()
    
    const [ makePayment, setMakePayment ] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState('')

    const cartInfo = {
        insured:isInsured,
        user_id:userId,
        appointment_id:appintmentDetails.appointment_id,
        amount: price,
        currency:currencyCode,
        insuranceType:insuranceType,
        climbedAmount:climbedAmount,
        insuranceDetails:insuranceDetails,
        discount_by:discount_by
    }

    const onCheckStatus = async (paymentResponse) => {
        setPaymentStatus('Please wait while confirming your payment!')

        let jsonResponse = JSON.parse(paymentResponse);
        // perform operation to check payment status

        try {
            const stripeResponse = await axios.post(BASE_URL+'/doctor/api/payment', {
                product: cartInfo,
                authToken: jsonResponse
            })
            if(stripeResponse){
                const { paid } = stripeResponse.data;
                if(paid === true){
                    setPaymentStatus('Payment Success')
                    setResponse(stripeResponse)
                }else{
                    setResponse(stripeResponse.data.error)
                    setPaymentStatus('Payment failed due to some issue')
                }

            }else{
                setPaymentStatus(' Payment failed due to some issue')
                setResponse(stripeResponse.data.error)
            }

            
        } catch (error) {
            
            setPaymentStatus(jsonResponse.error.message)
            setResponse(" ")

        }
 
    }


    const paymentUI = () => {

        if(!makePayment){

            return (
            <List>
                <ListItem onPress={() => {
                            setMakePayment(true)
                        }}>
                    <Body><Text>Credit/Debit/ATM Card</Text></Body>
                </ListItem>
            </List>
            )
             
            // show to make payment
        }else{

            if(response !== undefined){
                if (paymentStatus == 'Payment Success'){
                    return(
                        <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "10%"}}>
                    <Text style={{ fontSize: 24, margin: 10,fontWeight:"bold"}}> { paymentStatus} </Text>
                    <View style={{width: '100%',
                alignItems: 'center',
                alignSelf: 'center',marginTop:"25%"}}>
                  <Thumbnail large source={require('../../assets/payment/sucessfull.png')} style={{height:200,width:"75%"}}/>
                </View>
                    
                <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>props.navigation.navigate('Home')} style={{backgroundColor:"#009479",height:50,width:"70%",alignSelf:"center"}}><Text style={{width:"100%",textAlign:"center"}}>Done</Text></Button>
                    </View>
                </View>
                </ScrollView>
                )
                }
                else{
                    return <ScrollView>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "10%"}}>
                    <Text style={{ fontSize: 18, margin: 10,fontWeight:"bold"}}> { paymentStatus} </Text>
                    <Text style={{ fontSize: 16, margin: 10}}> { response} </Text>
                    <View style={{width: '100%',
                alignItems: 'center',
                alignSelf: 'center',marginTop:"25%"}}>
                  <Thumbnail large source={require('../../assets/payment/faild.png')}/>
                </View>
                    <View style={{marginTop:"25%",width:"70%",alignItems:"center",justifyContent:"center",alignSelf:"center"}}>
                        <Button rounded onPress={()=>props.navigation.navigate('Home')} style={{backgroundColor:"#009479"}}><Text style={{width:"100%",textAlign:"center"}}>Done</Text></Button>
                    </View>
                </View>
                </ScrollView>
                }

            }else{
                return <PaymentView onCheckStatus={onCheckStatus} product={cartInfo.description} amount={cartInfo.amount} />
            }
            
        }

    }


return (<View style={styles.container}>
            {paymentUI()}
        </View>);
}


const styles = StyleSheet.create({
container: { flex: 1, paddingTop: 10},
navigation: { flex: 2, backgroundColor: 'red' },
body: { flex: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
footer: { flex: 1, backgroundColor: 'cyan' }
})

 export default  PaymentMethodsScreen ;