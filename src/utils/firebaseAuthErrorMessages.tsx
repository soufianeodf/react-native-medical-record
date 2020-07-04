import firebaseAuthErrorMessages from './firebaseAuthErrorMessages.json';

export default function _firebaseAuthErrorMessages(errorCode) {
  for (var key in firebaseAuthErrorMessages) {
    if (firebaseAuthErrorMessages.hasOwnProperty(key)) {
      if ('auth/' + key === errorCode) {
        return firebaseAuthErrorMessages[key];
      }
    }
  }
  return 'Something went wrong';
}
