import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, Platform,ActivityIndicator } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import store from '../../../store/configureStore';
import Avatar from '../components/avatar'
import { getTime } from '../../../helpers/getTime'
import MessageSendState from '../components/messageSendState'
import ChatImage from '../components/chatImage'
import Icon from 'react-native-vector-icons/AntDesign'
import {translate} from './translate'
import AsyncStorage from '@react-native-async-storage/async-storage';

const fullWidth = Dimensions.get('window').width
const fullHeight = Dimensions.get('window').height

export default class Message extends Component {
  isAtachment = null

  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      send_state: props.message.send_state,
      showTranslation:true,
      error:false,
      lang:{}
    }
    this.isAtachment = props.message.attachment
  }

  
  componentDidMount() {
    AsyncStorage.getItem('selectedLanguage',(err,res)=>{
      this.setState({lang:JSON.parse(res)},()=>{
        this.translateMessage()

      })
    })

  }
  
  translateMessage = ()=>{
    if(this.props.otherSender){
      this.setState({error:false})
        let text = this.props.message.body
        let target = this.state.lang.value
        translate({text,target}).then(res=>{
          const [reponse] = res.data.data.translations
          this.props.updateMessage(this.props.message.id,reponse.translatedText)
        }).catch(err=>{
          console.log({err})
          this.setState({error:true})
        })
    }
  }
  

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.message.send_state != nextState.send_state ||
  //     nextState.isModal !== this.state.isModal
  //   ) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }


  renderAttachment = () => {
    const { message } = this.props
    return (
      <TouchableOpacity style={{ marginBottom: 3 }} onPress={this.handleModalState}>
        <ChatImage photo={message.attachment[0].url} width={200} height={150} />
      </TouchableOpacity>
    )
  }

  handleModalState = () => {
    this.setState({ isModal: !this.state.isModal })
  }

  renderHeader = () => {
    return <View style={[{ margin: Platform.OS === 'ios' ? 35 : 15 }, { position: 'absolute', zIndex: 10 }]}>
      <Icon name="close" size={30} color='white' onPress={this.handleModalState} />
    </View>
  }

  toggleTranslationView = ()=>{
    if(!this.isAtachment && this.props.message.translation !== ''){
      this.setState({showTranslation:!this.state.showTranslation})
    }
  }

  renderMessage = ()=>{
    const {message,otherSender} = this.props
    const {showTranslation } = this.state
    if(message.translation === ''){
      return (<ActivityIndicator size="small" color="#0000ff" />)
    }else{
      return (
        <Text style={[styles.messageText, (otherSender ? styles.selfToLeft : styles.selfToRight)]}>
        {showTranslation?message.translation:message.body}
      </Text>
      )
    }
  }

  render() {
    const { message, otherSender } = this.props
    const { isModal,lang} = this.state
    const user = otherSender ? store.getState().chatUsers.users[message.sender_id] : '.'
    return (
      <View onTouchStart={this.toggleTranslationView}>
        {this.isAtachment &&
          <Modal visible={isModal} transparent={false} style={{ backgroundColor: 'black' }}>
            <View style={{
              width: fullWidth,
              height: fullHeight,
            }}>
              <ImageViewer
                imageUrls={[{ url: message.attachment[0].url }]}
                onCancel={() => this.handleModalState()}
                enableSwipeDown
                renderIndicator={() => null}
                renderHeader={this.renderHeader}
                renderImage={props => (
                  <ChatImage
                    photo={props.source.uri}
                    width={+message.attachment[0].width}
                    height={+message.attachment[0].height}
                  />
                )}
              />
            </View>
          </Modal>
        }
        {otherSender ?
          (
            <View style={[styles.col]}>

            <View style={[styles.container, styles.positionToLeft]}>
              <Avatar
                photo={user.avatar}
                name={user.full_name}
                iconSize="small"
              />
              <View style={[styles.message, styles.messageToLeft]}>
                {this.isAtachment &&
                  this.renderAttachment()
                }
                  {this.renderMessage()}

                <Text style={styles.dateSent}>
                  {getTime(message.date_sent)}
                </Text>
              </View>
            </View>
              {this.state.showTranslation && message.translation !== ''?<Text style={{fontSize:9,textAlign:'left',marginLeft:55,marginTop:0,paddingTop:0}}>{lang.translate}</Text>:null}
              {this.state.error?<Text onPress={this.translateMessage} style={{fontSize:9,textAlign:'left',marginLeft:55,marginTop:0,paddingTop:0,color:'red'}}>{lang.error}</Text>:null}
            </View>
          ) :
          (
            <View style={[styles.container, styles.positionToRight]}>
              <View style={[styles.message, styles.messageToRight]}>
                {this.isAtachment &&
                  this.renderAttachment()
                }
                <Text style={[styles.messageText, styles.selfToRight]}>
                  {message.body || ' '}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Text style={styles.dateSent}>
                    {getTime(message.date_sent)}
                  </Text>
                  <MessageSendState send_state={message.send_state} />
                </View>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  col:{
    flexDirection:'column',
    alignContent:'center',
    display:'flex',
  },
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  positionToLeft: {
    justifyContent: 'flex-start'
  },
  positionToRight: {
    justifyContent: 'flex-end'
  },
  message: {
    paddingTop: 5,
    paddingBottom: 3,
    paddingHorizontal: 6,
    borderRadius: 10
  },
  messageToLeft: {
    maxWidth: fullWidth - 90,
    borderBottomLeftRadius: 2,
    backgroundColor: '#63D9C6'
  },
  messageToRight: {
    maxWidth: fullWidth - 55,
    borderBottomRightRadius: 2,
    backgroundColor: '#48A6E3'
  },
  messageText: {
    fontSize: 16,
    color: 'white'
  },
  selfToLeft: {
    alignSelf: 'flex-start'
  },
  selfToRight: {
    alignSelf: 'flex-end'
  },
  dateSent: {
    alignSelf: 'flex-end',
    paddingTop: 1,
    paddingHorizontal: 3,
    fontSize: 12,
    color: 'lightcyan'
  }
})
