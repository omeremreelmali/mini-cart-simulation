import {
    widthPercentageToDP,
    heightPercentageToDP,
  } from 'react-native-responsive-screen';
  
  export const wp = (width: any) => widthPercentageToDP(width);
  export const hp = (height: any) => heightPercentageToDP(height);
  