import React, {createRef} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import ViewShot from 'react-native-view-shot';
import {captureRef} from 'react-native-view-shot';
import storage from '@react-native-firebase/storage';

export default function MedicalPrescription() {
  const reference = storage().ref('app-images/screenshot.png');
  let viewRef = createRef();

  const onCapture = () => {
    setTimeout(() => {
      captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
      }).then(
        async uri => {
          console.log('Image saved to', uri);
          await reference.putFile(uri);
        },
        error => console.error('Oops, snapshot failed', error),
      );
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.viewContainer}
      collapsable={false}
      ref={ref => (viewRef = ref)}>
      <ViewShot onCapture={onCapture} captureMode="mount">
        <View style={styles.headerView}>
          <View>
            <Text style={styles.headerTitleText}>Doctor Name</Text>
            <Text style={styles.boldText}>
              Specialization : pneumo phtisiologie
            </Text>
            <Text style={styles.boldText}>
              Address : Avenue des FAR immeuble
            </Text>
            <Text style={styles.boldText}>Phone : +212 606 75 23 13</Text>
          </View>
          <View style={styles.headerImageView}>
            <Image
              source={require('../../../../images/medicalhealthlogo.png')}
              style={styles.headerImage}
            />
          </View>
        </View>
        <View style={styles.lineSeparatorView} />
        <View style={styles.contentViewContainer}>
          <Text style={styles.boldText}>Date: 15/04/17</Text>
          <Text style={styles.nameTextStyle}>Name: soufiane ouddaf</Text>
          <Text style={styles.titleDescriptionText}>
            1 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>

          <Text style={styles.titleDescriptionText}>
            1 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>

          <Text style={styles.titleDescriptionText}>
            1 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>

          <Text style={styles.titleDescriptionText}>
            1 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>

          <Text style={styles.titleDescriptionText}>
            1 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>

          <Text style={styles.titleDescriptionText}>
            5 AVAMYS SPRAY NASAL :
          </Text>
          <Text style={styles.contentDescriptionText}>
            Une desription de comment il faut prendre le medicament
          </Text>
        </View>
      </ViewShot>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    marginTop: '3%',
  },
  headerTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerImageView: {
    justifyContent: 'center',
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  lineSeparatorView: {
    flex: 0.08,
    height: 7,
    backgroundColor: '#609AD0',
  },
  contentViewContainer: {
    flex: 6,
    marginTop: '3%',
    paddingLeft: '3%',
    paddingRight: '10%',
  },
  nameTextStyle: {
    marginTop: '2%',
    marginBottom: '6%',
    fontWeight: 'bold',
  },
  titleDescriptionText: {
    fontWeight: 'bold',
    marginBottom: '1%',
    marginTop: '4%',
  },
  contentDescriptionText: {
    lineHeight: 20,
    marginBottom: '3%',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
