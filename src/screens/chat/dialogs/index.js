import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Text, StatusBar, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import store from '../../../store/configureStore';

import Dialog from './elements/dialog'
import ChatService from '../../../store/chatServices/chat-service'
import Indicator from '../components/indicator'
import CreateBtn from '../components/createBtn'
import { BTN_TYPE } from '../../../helpers/constants'
import Avatar from '../components/avatar'


class Dialogs extends Component {
  static currentUserInfo = ''
  dialogs = []

  constructor(props) {
    super(props)
    this.state = {
      isLoader: this.props.chatDialogs.length === 0 && true,
    }
    
  }

  static navigationOptions = ({ navigation }) => {
    Dialogs.currentUserInfo = { ...store.getState().chatCurrentUser }
    
    // return {
    //   headerTitle: (
    //     <Text style={[
    //       { fontSize: 22, color: 'black' },
    //       Platform.OS === 'android' ?
    //         { paddingLeft: 13 } :
    //         { paddingLeft: 0 }]}>
    //       {Dialogs.currentUserInfo.full_name}
    //     </Text>
    //   ),
    //   headerRight: (
    //     <TouchableOpacity onPress={() => this.goToSettingsScreen(navigation)}>
    //       <Avatar
    //         photo={Dialogs.currentUserInfo.avatar}
    //         name={Dialogs.currentUserInfo.full_name}
    //         iconSize="small"
    //       />
    //     </TouchableOpacity>
    //   ),
    // }
  }

  componentDidMount() {
    ChatService.fetchDialogsFromServer()
      // .then(() => {
      //   PushNotificationService.init(this.props.navigation)
      // })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.chatCurrentUser.full_name !== Dialogs.currentUserInfo.full_name) {
      Dialogs.currentUserInfo = { ...props.chatCurrentUser }
      return true
    } return null
  }

  static goToSettingsScreen = (props) => {
    props.push('Settings', { user: Dialogs.currentUserInfo })
  }

  componentDidUpdate(prevProps) {
    const { chatDialogs } = this.props
    if (this.props.chatDialogs !== prevProps.chatDialogs) {
      this.dialogs = chatDialogs
      
      this.setState({ isLoader: false })
    }
  }

  keyExtractor = (item, index) => index.toString()

  _renderDialog = ({ item }) => {
    return (
      <Dialog dialog={item} navigation={this.props.navigation} userType={this.props.userType}/>
    )
  }

  goToContactsScreen = () => {
    const { navigation } = this.props
    navigation.push('Contacts')
  }

  render() {
    const { isLoader } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {isLoader ?
          (
            <Indicator color={'red'} size={40} />
          ) : this.props.chatDialogs.length === 0 ?
            (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 19 }}>No chats yet</Text>
            </View>
            ) :
            (
              <FlatList
                data={this.dialogs}
                keyExtractor={this.keyExtractor}
                renderItem={(item) => this._renderDialog(item)}
              />
            )
        }
        {/* <CreateBtn goToScreen={this.goToContactsScreen} type={BTN_TYPE.DIALOG} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


const mapStateToProps = (state) => ({
  chatDialogs:state.chatDialogs,
  chatCurrentUser:state.chatCurrentUser,
  userType:state.userType,
})

export default connect(mapStateToProps)(Dialogs)