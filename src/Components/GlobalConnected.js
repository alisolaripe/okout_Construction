import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
export async function isNetworkConnected() {
    return (NetInfo.fetch().then(isConnected => {
        let status = null;
        if (Platform.OS === "ios") {
            isConnected = fetch("https://www.google.com");
            status = isConnected;

        } else {
            status = isConnected;
        }
        return status;
    }))
}

