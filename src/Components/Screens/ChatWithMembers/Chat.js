import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Chat = ({route}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages(theMessage => setMessages(GiftedChat.append([], theMessage)));
  }, []);

  function loadMessages(callback) {
    firestore()
      .collection('Message')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        var newMessage = [];
        if (querySnapshot) {
          querySnapshot.forEach(chat => {
            var id = chat.id;
            let value = chat.data();
            newMessage.push({
              _id: id,
              text: value.text,
              createdAt: value.createdAt.toDate(),
              user: {
                _id: value.user._id,
                name: value.user.name,
                avatar: value.user.avatar,
              },
            });
          });
          callback(newMessage);
        }
      });
  }

  const onSend = theMessages => {
    firestore()
      .collection('Message')
      .add({
        _id: route.params.friendUserId,
        text: theMessages[0].text,
        user: theMessages[0].user,
        createdAt: new Date(),
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={theMessages => onSend(theMessages)}
      user={{
        _id: route.params.currentUserId,
        name: 'soufiane',
        avatar: route.params.avatar,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
