import EncryptedStorage from 'react-native-encrypted-storage';

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