import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  
  itemContainer: {
    width: wp('90%'),
    height: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    margin: hp('1%'),
    borderRadius: 25,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '2%',
  },
  textDesign: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  activity: {justifyContent: 'center', alignItems: 'center'},
});

export default styles;
