import React, { FC, useEffect } from 'react';

/** React Native */
import { Button } from 'react-native';

/** Router */
import { useNavigation, useRouter } from 'expo-router';

/** Local Storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** React Native */
import { View } from 'react-native';

const home: FC = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const onLogout = async () => {
        await AsyncStorage.removeItem('user');

        router.replace('/login');
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({ gestureEnabled: false });
        });

        return unsubscribe;
    }, []);

    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Button onPress={onLogout} title={'Đăng xuất'} />
        </View>
    );
};

export default home;
