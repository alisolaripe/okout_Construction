

export async function Update_Function (List_Item){


  return (
    requestLocationPermission().then(res => {

      return res
    })
      .catch(error => console.log("dd", error)));
}
export async function Add_Function (NY){


}
export async function Deleted_Function (){
  const requestLocationPermission = async () => {
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

      if (granted === 'granted') {

        return true;
      } else {

        return false;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    requestLocationPermission().then(res => {

      return res
    })
      .catch(error => console.log("dd", error)));
}
