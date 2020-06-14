import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Accordian from '../../../../utils/Accordian';

export default function HeartCondition() {
  const menu = [
    {
      key: 1,
      title: 'Coronary heart disease',
      data:
        'The most common heart condition in Scotland is coronary heart disease. This is caused when the heart’s blood vessels - the coronary arteries - become narrowed or blocked and can’t supply enough blood to the heart. It can lead to angina and/or a heart attack.',
    },
    {
      key: 2,
      title: 'Angina',
      data:
        'Angina is a pain or discomfort in your chest, arm, neck, stomach or jaw that happens when the blood supply to your heart becomes restricted because of your arteries becoming narrowed. This clogging is called atheroma. Angina is a symptom of coronary heart disease, not an illness in itself. Angina is your heart’s way of telling you it’s not getting enough oxygen when you’re doing something strenuous or you’re feeling under stress. Many people learn to recognise how much activity will bring on an angina attack - this is called stable angina. If you have unexplained chest pain, seek urgent medical advice - you will need an assessment of your overall health.',
    },
    {
      key: 3,
      title: 'Unstable angina',
      data:
        'Unstable angina can be undiagnosed chest pain or a sudden worsening of existing angina. It happens when the blood supply to the heart is severely restricted and angina attacks occur more frequently, with less and less activity. These attacks may even happen at rest or wake you from sleep. They can last up to 10 minutes. You should see your doctor urgently, and you may be admitted to hospital. Until tests confirm the diagnosis, this is sometimes called Acute Coronary Syndrome (ACS).',
    },
    {
      key: 4,
      title: 'Heart attack',
      data:
        'A heart attack - also known as myocardial infarction or MI - happens when the blood supply to part of your heart muscle becomes completely blocked. This is most commomly caused by a piece of fatty material breaking off and a blood clot forms within a coronary artery. This can cause damage to the part of your heart muscle which that particular coronary artery was supplying.',
    },
    {
      key: 5,
      title: 'Heart failure',
      data:
        'If the heart’s pumping action can’t work effectively, your heart muscle can’t meet your body’s demand for blood and oxygen, and your body develops various different symptoms, like fatigue and shortness of breath. This is called heart failure because of the failure of your heart to work efficiently.',
    },
    {
      key: 6,
      title: 'Arrhythmia (abnormal heart rhythms)',
      data:
        'The heart muscle has its own electrical system which helps to stimulate the heartbeat. If the electrical signals within your heart are interrupted or disturbed, your heart can beat too quickly (tachycardia), too slowly (bradycardia) and/or in an irregular way. This is called an arrhythmia.',
    },
    {
      key: 7,
      title: 'Valve disease ',
      data:
        'The valves open and close to regulate the flow of blood through the heart. Problems with the valves can increase the workload of your heart and can put a strain on your heart muscle, leading to a range of symptoms, like: 1- shortness of breath. 2- swollen ankles. 3- fatigue. 4- chest pain (angina or palpitations). 5- dizziness or fainting',
    },
    {
      key: 8,
      title: 'High blood pressure',
      data:
        'Another condition which can affect the heart is high blood pressure or hypertension. Although it’s not a disease in itself, hypertension can lead to an increased risk of developing serious conditions such as coronary heart disease, heart attacks and strokes.',
    },
    {
      key: 9,
      title: 'Congenital heart conditions',
      data:
        'Congenital heart conditions occur when there’s an abnormality or defect with the structure of the heart of a developing foetus while inside the mother’s womb. A baby may be born with only one defect or with several defects. Some types of congenital heart defects are life-threatening, either immediately to the newborn or over time.',
    },
    {
      key: 10,
      title: 'Inherited heart conditions',
      data:
        'Inherited conditions can be passed on through families. They are sometimes called familial or genetic heart conditions. They can affect people of any age and can be life-threatening. The first sign there’s a problem is often when someone dies suddenly with no obvious cause. These conditions are different from most congenital heart conditions, although some congenital conditions can also be inherited.',
    },
  ];

  const _renderAccordians = () => {
    const items = [];
    for (var item of menu) {
      items.push(
        <Accordian title={item.title} data={item.data} key={item.key} />,
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
