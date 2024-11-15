import React, { FC, useEffect } from 'react';

/** React Native */
import { Button } from 'react-native';

/** Router */
import { useNavigation, useRouter } from 'expo-router';

/** Local Storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** App Components */
import Container from '@/components/common/Container';

const HomeScreen: FC = () => {
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
        <Container scroll>
            <Button onPress={onLogout} title={'Đăng xuất'} />
        </Container>
    );
};

export default HomeScreen;
