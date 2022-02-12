// import ConnectyCube from 'react-native-connectycube'
import { Alert, Platform } from 'react-native'
 import Sound from 'react-native-sound'
import store from '../../store/configureStore';

class CallingService {
	// outgoingCall = new Sound(require('../../assets/sounds/dialing.mp3'));
	// incomingCall = new Sound(require('../../assets/sounds/calling.mp3'));
	// endCall = new Sound(require('../../assets/sounds/end_call.mp3'));

	// playSound = type => {
	// 	switch (type) {
	// 	  case 'outgoing':
	// 		this.outgoingCall.setNumberOfLoops(-1);
	// 		this.outgoingCall.play();
	// 		break;
	// 	  case 'incoming':
	// 		this.incomingCall.setNumberOfLoops(-1);
	// 		this.incomingCall.play();
	// 		break;
	// 	  case 'end':
	// 		this.endCall.play();
	// 		break;
	
	// 	  default:
	// 		break;
	// 	}
	//   };

	// getUserMedia(session) {
	// 	return new Promise((resolve, reject) => {
	// 		session.getUserMedia({
	// 			audio: true,
	// 			video: { facingMode: 'user' }
	// 		}).then(stream=>{
	// 			resolve(stream)
	// 		}).catch(err=>reject(err))
	// 	});
	// }

	// switchCamera(localStream) {
	// 	// MediaStreamTrack.prototype._switchCamera()
	// 	// switch the front/back cameras in a video track on the fly, without the need for adding/removing tracks or renegotiating
	// 	localStream.getVideoTracks().forEach(track => track._switchCamera());
	// }

	// getVideoDevices() {
	// 	return new Promise((resolve, reject) => {
	// 		ConnectyCube.videochat.getMediaDevices('videoinput').then(devices => {
	// 			devices ? resolve(devices) : reject();
	// 		});
	// 	});
	// }

	// createVideoSession(calleesIds) {
	// 	return new Promise((resolve, reject) => {
	// 		const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
	// 		const additionalOptions = {};
	// 		const session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);
	// 		resolve(session)
	// 	});
	// }

	// initiateCall(session) {
	// 	this.playSound('outgoing');
	// 	var extension = {filter: "0"};
	// 	session.call(extension, function(error) {

	// 	});
	// }

	// acceptCall(session) {
	// 	this.stopSounds();
	// 	var extension = {};
	// 	session.accept(extension);
	// }

	// rejectCall(session) {
	// 	this.stopSounds();
	// 	var extension = {};
	// 	session.reject(extension);
	// }

	// finishCall(session) {
	// 	this.stopSounds();
	// 	if(session){

	// 		this.playSound('end');
	// 		var extension = {};
	// 		session.stop(extension);
			
	// 		ConnectyCube.videochat.clearSession(session.ID);
	// 	}
	// }

	// muteAudio(session) {
	// 	session.mute('audio');
	// }

	// unmuteAudio(session) {
	// 	session.unmute('audio');
	// }

	// getUserById = (userId, key) => {
	// 	return store.getState().chatUsers.users
	//   };

	// processOnUserNotAnswer(session, userId) {
	// 	this.stopSounds();
	// 	console.log("CallingService processOnUserNotAnswer", userId);

	// 	Alert.alert(
	// 		'An opponent did not answer',
	// 		'',
	// 		[
	// 			{text: 'Ok', onPress: () => {

	// 			}},
	// 		],
	// 		{cancelable: true},
	// 	);
	// }

	// processOnAcceptCallListener(session, extension) {
	// 	this.stopSounds();
	// }

	// processOnRejectCallListener(session, extension) {
	// 	this.stopSounds();
	// 	ConnectyCube.videochat.clearSession(session.ID);

	// 	Alert.alert(
	// 		'An opponent rejected the call request',
	// 		'',
	// 		[
	// 			{text: 'Ok', onPress: () => {

	// 			}},
	// 		],
	// 		{cancelable: true},
	// 	);
	// }

	// processOnStopCallListener(session, extension) {
	// 	this.stopSounds()
	// 	ConnectyCube.videochat.clearSession(session.ID);

	// 	Alert.alert(
	// 		'The call is finished',
	// 		'',
	// 		[
	// 			{text: 'Ok', onPress: () => {

	// 			}},
	// 		],
	// 		{cancelable: true},
	// 	);
	// }

	
	// stopSounds = () => {
	// 	if (this.incomingCall.isPlaying()) {
	// 	  this.incomingCall.pause();
	// 	}
	// 	if (this.outgoingCall.isPlaying()) {
	// 	  this.outgoingCall.pause();
	// 	}
	//   };
}

// create instance
const Calling = new CallingService()

// lock instance
Object.freeze(Calling)

export default Calling