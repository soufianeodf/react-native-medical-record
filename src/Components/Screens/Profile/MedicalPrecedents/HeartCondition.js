import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Accordian from '../../../../utils/Accordian';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function HeartCondition({navigation}) {
  useEffect(() => {
    console.log("**********use effect***********")
    navigation.addListener('focus', () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          setUid(user.uid);
          firestore()
            .collection('medicalPrecedents')
            .doc(user.uid)
            .get()
            .then(doc => {
              settoggleCheckBox_1(doc.data().checkBox_1);
              settoggleCheckBox_2(doc.data().checkBox_2);
              settoggleCheckBox_3(doc.data().checkBox_3);
              settoggleCheckBox_4(doc.data().checkBox_4);
              settoggleCheckBox_5(doc.data().checkBox_5);
              settoggleCheckBox_6(doc.data().checkBox_6);
              settoggleCheckBox_7(doc.data().checkBox_7);
              settoggleCheckBox_8(doc.data().checkBox_8);
              settoggleCheckBox_9(doc.data().checkBox_9);
              settoggleCheckBox_10(doc.data().checkBox_10);
            })
            .catch(error => alert(error.message));
        } else {
          navigation.navigate('Login');
        }
      });
    });
  }, [navigation]);

  const [uid, setUid] = useState('');

  const [toggleCheckBox_1, settoggleCheckBox_1] = useState(false);
  const [toggleCheckBox_2, settoggleCheckBox_2] = useState(false);
  const [toggleCheckBox_3, settoggleCheckBox_3] = useState(false);
  const [toggleCheckBox_4, settoggleCheckBox_4] = useState(false);
  const [toggleCheckBox_5, settoggleCheckBox_5] = useState(false);
  const [toggleCheckBox_6, settoggleCheckBox_6] = useState(false);
  const [toggleCheckBox_7, settoggleCheckBox_7] = useState(false);
  const [toggleCheckBox_8, settoggleCheckBox_8] = useState(false);
  const [toggleCheckBox_9, settoggleCheckBox_9] = useState(false);
  const [toggleCheckBox_10, settoggleCheckBox_10] = useState(false);

  const getCheckBox_1_State = () => toggleCheckBox_1;
  const getCheckBox_2_State = () => toggleCheckBox_2;
  const getCheckBox_3_State = () => toggleCheckBox_3;
  const getCheckBox_4_State = () => toggleCheckBox_4;
  const getCheckBox_5_State = () => toggleCheckBox_5;
  const getCheckBox_6_State = () => toggleCheckBox_6;
  const getCheckBox_7_State = () => toggleCheckBox_7;
  const getCheckBox_8_State = () => toggleCheckBox_8;
  const getCheckBox_9_State = () => toggleCheckBox_9;
  const getCheckBox_10_State = () => toggleCheckBox_10;

  const setCheckBox_1_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_1: value }).then(() => settoggleCheckBox_1(value));
  const setCheckBox_2_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_2: value }).then(() => settoggleCheckBox_2(value));
  const setCheckBox_3_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_3: value }).then(() => settoggleCheckBox_3(value));
  const setCheckBox_4_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_4: value }).then(() => settoggleCheckBox_4(value));
  const setCheckBox_5_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_5: value }).then(() => settoggleCheckBox_5(value));
  const setCheckBox_6_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_6: value }).then(() => settoggleCheckBox_6(value));
  const setCheckBox_7_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_7: value }).then(() => settoggleCheckBox_7(value));
  const setCheckBox_8_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_8: value }).then(() => settoggleCheckBox_8(value));
  const setCheckBox_9_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_9: value }).then(() => settoggleCheckBox_9(value));
  const setCheckBox_10_state = value => firestore().collection('medicalPrecedents').doc(uid).update({ checkBox_10: value }).then(() => settoggleCheckBox_10(value));

  const menu = [
    {
      key: 1,
      title: 'Coronary heart disease',
      data:
        'The most common heart condition in Scotland is coronary heart disease. This is caused when the heart’s blood vessels - the coronary arteries - become narrowed or blocked and can’t supply enough blood to the heart.\n\nIt can lead to angina and/or a heart attack.',
      getCheckBoxState: getCheckBox_1_State,
      setCheckBoxState: setCheckBox_1_state,
    },
    {
      key: 2,
      title: 'Angina',
      data:
        'Angina is a pain or discomfort in your chest, arm, neck, stomach or jaw that happens when the blood supply to your heart becomes restricted because of your arteries becoming narrowed. This clogging is called atheroma. Angina is a symptom of coronary heart disease, not an illness in itself. \n\nAngina is your heart’s way of telling you it’s not getting enough oxygen when you’re doing something strenuous or you’re feeling under stress. Many people learn to recognise how much activity will bring on an angina attack - this is called stable angina. \n\nIf you have unexplained chest pain, seek urgent medical advice - you will need an assessment of your overall health.',
      getCheckBoxState: getCheckBox_2_State,
      setCheckBoxState: setCheckBox_2_state,
    },
    {
      key: 3,
      title: 'Unstable angina',
      data:
        'Unstable angina can be undiagnosed chest pain or a sudden worsening of existing angina. It happens when the blood supply to the heart is severely restricted and angina attacks occur more frequently, with less and less activity.\n\nThese attacks may even happen at rest or wake you from sleep. They can last up to 10 minutes. \n\nYou should see your doctor urgently, and you may be admitted to hospital. \n\nUntil tests confirm the diagnosis, this is sometimes called Acute Coronary Syndrome (ACS).',
      getCheckBoxState: getCheckBox_3_State,
      setCheckBoxState: setCheckBox_3_state,
    },
    {
      key: 4,
      title: 'Heart attack',
      data:
        'A heart attack - also known as myocardial infarction or MI - happens when the blood supply to part of your heart muscle becomes completely blocked. This is most commomly caused by a piece of fatty material breaking off and a blood clot forms within a coronary artery. This can cause damage to the part of your heart muscle which that particular coronary artery was supplying.',
      getCheckBoxState: getCheckBox_4_State,
      setCheckBoxState: setCheckBox_4_state,
    },
    {
      key: 5,
      title: 'Heart failure',
      data:
        'If the heart’s pumping action can’t work effectively, your heart muscle can’t meet your body’s demand for blood and oxygen, and your body develops various different symptoms, like fatigue and shortness of breath. This is called heart failure because of the failure of your heart to work efficiently.',
      getCheckBoxState: getCheckBox_5_State,
      setCheckBoxState: setCheckBox_5_state,
    },
    {
      key: 6,
      title: 'Arrhythmia (abnormal heart rhythms)',
      data:
        'The heart muscle has its own electrical system which helps to stimulate the heartbeat. If the electrical signals within your heart are interrupted or disturbed, your heart can beat too quickly (tachycardia), too slowly (bradycardia) and/or in an irregular way. This is called an arrhythmia.',
      getCheckBoxState: getCheckBox_6_State,
      setCheckBoxState: setCheckBox_6_state,
    },
    {
      key: 7,
      title: 'Valve disease ',
      data:
        'The valves open and close to regulate the flow of blood through the heart. Problems with the valves can increase the workload of your heart and can put a strain on your heart muscle, leading to a range of symptoms, like: \n\n▪ shortness of breath. \n▪ swollen ankles. \n▪ fatigue. \n▪ chest pain (angina or palpitations). \n▪ dizziness or fainting',
      getCheckBoxState: getCheckBox_7_State,
      setCheckBoxState: setCheckBox_7_state,
    },
    {
      key: 8,
      title: 'High blood pressure',
      data:
        'Another condition which can affect the heart is high blood pressure or hypertension. Although it’s not a disease in itself, hypertension can lead to an increased risk of developing serious conditions such as coronary heart disease, heart attacks and strokes.',
      getCheckBoxState: getCheckBox_8_State,
      setCheckBoxState: setCheckBox_8_state,
    },
    {
      key: 9,
      title: 'Congenital heart conditions',
      data:
        'Congenital heart conditions occur when there’s an abnormality or defect with the structure of the heart of a developing foetus while inside the mother’s womb. A baby may be born with only one defect or with several defects. Some types of congenital heart defects are life-threatening, either immediately to the newborn or over time.',
      getCheckBoxState: getCheckBox_9_State,
      setCheckBoxState: setCheckBox_9_state,
    },
    {
      key: 10,
      title: 'Inherited heart conditions',
      data:
        'Inherited conditions can be passed on through families. They are sometimes called familial or genetic heart conditions. \n\nThey can affect people of any age and can be life-threatening. The first sign there’s a problem is often when someone dies suddenly with no obvious cause. \n\nThese conditions are different from most congenital heart conditions, although some congenital conditions can also be inherited.',
      getCheckBoxState: getCheckBox_10_State,
      setCheckBoxState: setCheckBox_10_state,
    },
  ];

  const _renderAccordians = () => {
    const items = [];
    for (var item of menu) {
      items.push(
        <Accordian
          title={item.title}
          data={item.data}
          key={item.key}
          getCheckBoxState={item.getCheckBoxState}
          setCheckBoxState={item.setCheckBoxState}
        />,
      );
    }
    return items;
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {_renderAccordians()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
