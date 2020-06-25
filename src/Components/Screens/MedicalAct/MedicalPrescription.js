import React from 'react';
import {View, Text, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function MedicalPrescription() {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1.2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: '3%',
          marginTop: '3%',
        }}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Doctor Name</Text>
          <Text style={{fontWeight: 'bold'}}>
            Specialization : pneumo phtisiologie
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            Address : Avenue des FAR immeuble
          </Text>
          <Text style={{fontWeight: 'bold'}}>Phone : +212 606 75 23 13</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../../../../images/medicalhealthlogo.png')}
            style={{width: 100, height: 100}}
          />
        </View>
      </View>
      <View style={{flex: 0.08, height: 7, backgroundColor: '#609AD0'}} />
      <View style={{flex: 6, marginTop: '3%', paddingLeft: '3%', paddingRight: '10%'}}>
        <Text style={{fontWeight: 'bold'}}>Date: 15/04/17</Text>
        <Text style={{marginTop: '2%', marginBottom: '6%', fontWeight: 'bold'}}>Name: soufiane ouddaf</Text>
        
        <Text style={{fontWeight: 'bold', marginBottom: '1%', marginTop: '4%'}}>1) AVAMYS SPRAY NASAL :</Text>
        <Text style={{lineHeight: 20, marginBottom: '3%'}}>2 PULVERISATION /NARINE /J LE MATIN X 15 JOURS PUIS 1 PULVERISATION /NARINE/J X 1 MOIS</Text>
      </View>
    </ScrollView>
  );
}
