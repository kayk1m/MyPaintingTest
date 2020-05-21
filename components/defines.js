import React from 'react';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const SERVER_URL = 'http://kay.airygall.com';
const STORAGE_URL = 'http://jeonghyunkay.ipdisk.co.kr:8000/list/HDD2/Kay';
const ERROR_CODE = {
  COMMON_ERROR: -1,
  RDS_SERVER_ERROR: 1,
  CONNECTION_FAILED: 2,
  LOGIN_FAILD: 3,
  PASSWORD_WRONG: 4,
  REQUIRE_LOGIN: 5,
  TOKEN_EXPIRED: 6,
  NO_PERMISSION: 7,
  NO_REFRESH_TOKEN: 8,
  INVALID_REFRESH_TOKEN: 9,

  NO_SUCH_USER: 11,
  USERNAME_ALREADY_OCCUPIED: 12,
  EMAIL_ALREADY_OCCUPIED: 13,

  NO_SUCH_PAINTING: 21,

  NO_SUCH_PRODUCT: 31,
}

export {
  SCREEN_WIDTH,
  SERVER_URL,
  STORAGE_URL,
  ERROR_CODE
};
