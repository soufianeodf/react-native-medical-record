import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {StyleSheet} from 'react-native';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((theMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, theMessages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={theMessages => onSend(theMessages)}
      user={{
        _id: 3,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
