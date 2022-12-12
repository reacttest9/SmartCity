import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const getScreenWidth = value => {
  if (value) {
    let finalValue = (screenWidth * value) / 100;
    return finalValue;
  } else {
    return screenWidth;
  }
};

export const getScreenHeight = value => {
  if (value) {
    let finalValue = (screenHeight * value) / 100;
    return finalValue;
  } else {
    return screenHeight;
  }
};

export const getNumbersOnly = value => {
  return value.replace(/[^0-9]/g, '');
};

