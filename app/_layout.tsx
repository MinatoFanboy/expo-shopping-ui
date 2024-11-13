import { FC, useEffect } from 'react';

/** React Navigation */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

/** Splash screen */
import * as SplashScreen from 'expo-splash-screen';

/** Animated */
import 'react-native-reanimated';

/** Expo Router */
import { Stack, useRouter } from 'expo-router';

/** Expo Fonts */
import { useFonts } from 'expo-font';

/** Local Storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Auth Context */
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

/** Hook App Theme */
import { useColorScheme } from '@/hooks/useColorScheme';

/** Prevent the splash screen from auto-hiding before asset loading is complete. */
SplashScreen.preventAutoHideAsync();

const _layout: FC = () => {
    const [loaded] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
        icomoon: require('../assets/fonts/icomoon.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <RootLayout />
        </AuthProvider>
    );
};

const RootLayout: FC = () => {
    const router = useRouter();
    const { setAuth } = useAuth();
    const colorScheme = useColorScheme();

    useEffect(() => {
        /** Check localStorage saved user info, is existed => logged in */
        const checkData = async () => {
            try {
                const user = await AsyncStorage.getItem('user');

                if (user) {
                    setAuth?.(JSON.parse(user) as any);
                    router.replace('/home');
                } else {
                    setAuth?.(null);
                    router.replace('/onboarding');
                }
            } catch {}
        };

        checkData();
    }, []);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name={'onboarding'} />
            </Stack>
        </ThemeProvider>
    );
};

export default _layout;
