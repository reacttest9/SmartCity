import React from 'react';
import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import { getScreenHeight } from '../utils/domUtils';


const CustomTextInput = props => {
  return (
    <View>
      <Text style={styles.placeholder}>{props.title}</Text>
      <View style={styles.textInputContanier}>
        {props.leftIcon ? (
          <View style={styles.iconContanier}>
            <Image style={styles.icon} source={props.leftIcon} />
          </View>
        ) : (
          <View style={styles.spacer} />
        )}
        <TextInput
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor={"black"}
          {...props}
          ref={props.inputRef}
          onSubmitEditing={props.onSubmit}
          returnKeyType={props.type ? props.type : 'done'}
          secureTextEntry={props.secure}
          onChangeText={props.action}
          value={props.value}
        />
        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    color: "black",
    fontSize: getScreenHeight(2),
  },
  textInputContanier: {
    borderRadius: 8,
    borderColor: "black",
    borderWidth: getScreenHeight(0.1),
    height: getScreenHeight(7),
    marginTop: getScreenHeight(0.5),
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems:'center'
  },
  iconContanier: {
    width: '12%',
    height: getScreenHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:-getScreenHeight(1.6)
  },
  icon: {
    width: getScreenHeight(2.5),
    height: getScreenHeight(2.5),
    resizeMode: "contain"
  },
  spacer: {
    width: getScreenHeight(2),
    height: getScreenHeight(6),
  },
  input: {
    paddingHorizontal: getScreenHeight(1.5),
    color: "black",
    fontSize: getScreenHeight(2),
    flex: 1,
  },
});

export default CustomTextInput;
