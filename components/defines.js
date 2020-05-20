import React from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const SERVER_URL = 'http://kay.airygall.com';
const STORAGE_URL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay';

export {
  SCREEN_WIDTH,
  SERVER_URL,
  STORAGE_URL
};
