import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textDesign: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wp('7%'),
  },
});

export default styles;
