import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Main = (props: any) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('PaystackStack');
          }}>
          <Text style={{color: 'black'}}>PaystackStack</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Main;
