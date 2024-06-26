import { PermissionsAndroid, platform } from "react-native";

export const androidCameraPermission = () => new Promise(async (resolve, reject) => {
    try {
        if(platform.OS === 'android' && platform.Version > 22){
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ])
            if(
                granted['android.permission.CAMERA'] !== 'granted' ||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
                granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
            ) {
                showError("Don't have required permission. Please allow permissions")
                return resolve(false);

            }
            return resolve(true)
        }
        return resolve(true)
    }
    catch (error){
        return resolve(false)
    }
})