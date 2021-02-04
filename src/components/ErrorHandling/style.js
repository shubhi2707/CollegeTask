import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textError: {color: 'black', fontSize: hp('3%'), fontWeight: 'bold'},
  touchableStyle: {width: wp('80%'), height: hp('10%'), borderRadius: 40},
  gradientStyle: {
    width: wp('80%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  retryText: {color: 'white', fontSize: hp('3%'), fontWeight: 'bold'},
});

export default styles;
