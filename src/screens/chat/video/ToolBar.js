import React from 'react';
import {StyleSheet, View, TouchableOpacity, Platform,SafeAreaView} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {
  userIsCalling,
  callInProgress,
  videoSessionObtained,
  localVideoStreamObtained,
  clearVideoSession,
  clearVideoStreams,
  muteAudio,
  setMediaDevices,
} from '../../../store/actions/chat/videoSession';
import CallingService from '../../../store/videoChatServices/call-service';

export class ToolBar extends React.Component {
  state = {
    isFrontCamera: true,
    isAudioMuted: false,
  };

  componentWillUnmount() {
    this.stopCall();
  }
  componentDidMount() {
    console.log(this.props)
  }
  

  initiateCall =()=> {
    CallingService.createVideoSession(this.props.opponentsIds).then(session => {
      this.props.videoSessionObtained(session);

      CallingService.getVideoDevices().then(this.props.setMediaDevices);

      CallingService.getUserMedia(session)
        .then(stream => {
          this.props.localVideoStreamObtained(stream);
          this.props.userIsCalling(true);
          CallingService.initiateCall(this.props.videoSession);
        })
        .catch(err => {
          console.log({err});
          // console.error("getUserMedia err" + err);
        });
    });
  }

  stopCall =()=> {
    this.props.userIsCalling(false);
    this.props.callInProgress(false);

    CallingService.finishCall(this.props.videoSession);

    this.props.clearVideoSession();
    this.props.clearVideoStreams();
  }

  switchCamera =()=> {
    CallingService.switchCamera(this.props.localVideoStream);
    this.setState(prevState => ({isFrontCamera: !prevState.isFrontCamera}));
  }

  muteUnmuteAudio = ()=> {
    if (this.props.audioMuted) {
      CallingService.unmuteAudio(this.props.videoSession);
      this.props.muteAudio(false);
      this.setState({isAudioMuted: false});
    } else {
      CallingService.muteAudio(this.props.videoSession);
      this.props.muteAudio(true);
      this.setState({isAudioMuted: true});
    }
  }

  _renderSwitchVideoSourceButton = () => {
    const {isFrontCamera} = this.state;
    const type = isFrontCamera ? 'camera-rear' : 'camera-front';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonSwitch]}
        onPress={this.switchCamera}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  _renderMuteButton = () => {
    const {isAudioMuted} = this.state;
    const type = isAudioMuted ? 'mic-off' : 'mic';

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonMute]}
        onPress={this.muteUnmuteAudio}>
        <MaterialIcon name={type} size={32} color="white" />
      </TouchableOpacity>
    );
  };

  render() {
    const isCallingOrCallInProgress =
      this.props.isCalling || this.props.activeCall;
    const isActiveCall = this.props.activeCall;
    const isTwoCamerasAvailable = this.props.mediaDevices.length > 1;
    const callStartStop = isCallingOrCallInProgress ? (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonCallEnd]}
        onPress={() => this.stopCall()}>
        <MaterialIcon name="call-end" size={32} color="white" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonCall]}
        onPress={() => this.initiateCall()}>
        <MaterialIcon name="call" size={32} color="white" />
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={styles.container}>
        
        <View style={styles.toolBarItem}>
          {isActiveCall ? this._renderMuteButton():null}
        </View>
        <View style={styles.toolBarItem}>
		{ callStartStop }
        </View>
        <View style={styles.toolBarItem}>
          {isActiveCall && isTwoCamerasAvailable ?this._renderSwitchVideoSourceButton():null}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 100,
  },
  toolBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCall: {
    backgroundColor: 'green',
  },
  buttonCallEnd: {
    backgroundColor: 'red',
  },
  buttonMute: {
    backgroundColor: 'blue',
  },
  buttonSwitch: {
    backgroundColor: 'orange',
  },
});

const mapStateToProps = state => {
  let jointProps = {};

  if (state.videosession) {
    jointProps.videoSession = state.videosession.videoSession;
    jointProps.isCalling = state.videosession.userIsCalling;
    jointProps.activeCall = state.videosession.callInProgress;
    jointProps.audioMuted = state.videosession.audioMuted;
    jointProps.mediaDevices = state.videosession.mediaDevices;
    jointProps.activeVideoDevice = state.videosession.activeVideoDevice;
    jointProps.localVideoStream = state.videosession.localVideoStream;
  }

  jointProps.opponentsIds = state.chatUsers.opponentsIds;

  return jointProps;
};

const mapDispatchToProps = dispatch => ({
  userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
  callInProgress: inProgress => dispatch(callInProgress(inProgress)),
  videoSessionObtained: videoSession =>
    dispatch(videoSessionObtained(videoSession)),
  clearVideoSession: () => dispatch(clearVideoSession()),
  clearVideoStreams: () => dispatch(clearVideoStreams()),
  localVideoStreamObtained: localStream =>
    dispatch(localVideoStreamObtained(localStream)),
  muteAudio: mute => dispatch(muteAudio(mute)),
  setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolBar);
