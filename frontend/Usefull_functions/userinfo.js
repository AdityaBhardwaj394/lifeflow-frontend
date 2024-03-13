import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
const setuserlocally=async (user)=>{
    await EncryptedStorage.setItem(
        'user_login',
        JSON.stringify({
            status:user,
        })
    )
}

export const getuserlocally=async ()=>{
    let user=await EncryptedStorage.getItem('user_login')
    if(user===null|| user===undefined){
        setuserlocally(false);
    }
    return JSON.parse(user).status;
}

export const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };