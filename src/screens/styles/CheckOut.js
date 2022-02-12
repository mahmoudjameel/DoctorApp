import { StyleSheet,Dimensions } from 'react-native';
import colors from '../../styles/colors';

const phoneWidth = Dimensions.get("window").width;
const keywidth = phoneWidth/3;
const keyHeight = keywidth-30
const keyPadHeight = keyHeight * 4;

const screenHeight = 200;
const Lkeywidth = screenHeight/2;
const LkeyHeight = Lkeywidth-40
const LkeyPadHeight = LkeyHeight * 4;
const styles = StyleSheet.create({
    keyPadView:{
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        alignContent:"flex-start",
        width:phoneWidth,
        height:keyPadHeight,
        
    },
    resultText:{
        width:"50%",
        alignSelf:"center",
        fontSize:34,
        textAlign:"right",
    },
    phoneKey:{
        width:keywidth,
        height:keyHeight,
        borderRadius:5,
        borderColor:colors.blue,
        // borderTopWidth:0,
        borderWidth:0.2,
        alignItems:"center",
        
    },
    phoneKeyText:{
        fontSize:28,
        marginVertical:"18%",
        color:colors.blue,
        fontWeight:"normal"
    },
    addNotesView:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        borderColor:colors.blue,
        width:"70%",
        height:"100%",
        borderWidth:0.5,
        borderRadius:5,
    },
    //Landscape view
    LkeyPadView:{
        flex:2,
        flexDirection:"row",
        flexWrap:"wrap",
        alignContent:"flex-start",
        width:screenHeight,
        height:LkeyPadHeight,
    },
    LresultText:{
        width:"40%",
        fontSize:34,
        textAlign:"left",
        
    },
    LphoneKey:{
        width:Lkeywidth,
        height:LkeyHeight,
        borderRadius:5,
        borderColor:colors.blue,
        // borderTopWidth:0,
        borderWidth:0.2,
        alignItems:"center",
        
    },
    LphoneKeyText:{
        fontSize:32,
        marginVertical:"18%",
        color:colors.blue
    },
    LaddNotesView:{
        flex:1,
        flexDirection:"row",
        alignItems:"flex-start",
        height:200,
        borderColor:colors.blue,
        borderWidth:0.5,
        borderRadius:5,
        marginRight:"10%"
    }
})

export default styles;
