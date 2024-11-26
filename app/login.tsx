import React, { FC, useCallback, useEffect, useState } from 'react';

/** React Native */
import { Image, StyleSheet, View } from 'react-native';

/** Router */
import { useNavigation, useRouter } from 'expo-router';

/** Local Storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import SocialButton from '@/components/common/SocialButton';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';
import ThemedText from '@/components/common/ThemedText';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Async */
import { validateEmail, wait } from '@/helpers/common';

const LoginScreen: FC = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const subTitleColor = useThemeColor({}, 'text2');

    const [error, setError] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });

    const handleNavigate = useCallback((route: '/signup' | '/forgotPassword') => {
        router.push(route);
    }, []);

    const [loading, setLoading] = useState<boolean>(false);

    const onChangeForm = useCallback(({ name, value }: { name: 'email' | 'password'; value: string }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const onSubmit = useCallback(async () => {
        setError({ email: '', password: '' });

        if (form.email && form.password) {
            if (!validateEmail(form.email)) {
                setError((prev) => ({ ...prev, email: 'Email is not in correct format' }));
            } else {
                setLoading(true);

                await wait(500);

                setLoading(false);

                await AsyncStorage.setItem('user', JSON.stringify(form));

                router.replace('/(tabs)');
            }
        } else {
            if (form.email === '') {
                setError((prev) => ({ ...prev, email: 'Email cannot be blank' }));
            }
            if (form.password === '') {
                setError((prev) => ({ ...prev, password: 'Password cannot be blank' }));
            }
        }
    }, [form]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({ gestureEnabled: false });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Container keyboard>
            {/** Header  */}
            <View style={styles.header}>
                {/** Logo */}
                <Image resizeMode={'contain'} source={require('@/assets/images/logo/logo.png')} style={styles.logo} />

                {/** Title & Content */}
                <View style={{ gap: 5 }}>
                    <ThemedText bold style={styles.textCenter} type={'header5'}>
                        Welcome Back
                    </ThemedText>
                    <ThemedText style={[styles.textCenter, { color: subTitleColor }]} type={'body2'}>
                        Log in to your account using email or social networks
                    </ThemedText>
                </View>
            </View>

            {/** Form */}
            <View style={styles.form}>
                <View style={{ gap: 30 }}>
                    {/** Input & Forgot Password */}
                    <View style={{ gap: 10 }}>
                        {/** Email & Password */}
                        <View style={{ gap: 20 }}>
                            <TextInput
                                autoCapitalize={'none'}
                                error={error.email}
                                icon={'sms'}
                                onChangeText={(text) => onChangeForm({ name: 'email', value: text })}
                                placeholder={'Email'}
                                value={form.email}
                            />

                            <TextInput
                                autoCapitalize={'none'}
                                error={error.password}
                                icon={'lock'}
                                onChangeText={(text) => onChangeForm({ name: 'password', value: text })}
                                placeholder={'Password'}
                                secureTextEntry
                                value={form.password}
                            />
                        </View>

                        {/** Forgot Password */}
                        <View style={styles.forgotPassword}>
                            <TextButton
                                hitSlop={{ bottom: 10, left: 20, right: 10, top: 10 }}
                                onPress={() => handleNavigate('/forgotPassword')}
                                title={'Forgot Password'}
                            />
                        </View>
                    </View>

                    <Button loading={loading} onPress={onSubmit} title={'Login'} />
                </View>

                {/** Other login */}
                <View>
                    {/** Label */}
                    <View style={styles.otherLoginLabel}>
                        <View style={[styles.otherLoginSeparate, { backgroundColor: GlobalColors.gray }]} />

                        <ThemedText type={'body2'}>Or login with</ThemedText>

                        <View style={[styles.otherLoginSeparate, { backgroundColor: GlobalColors.gray }]} />
                    </View>

                    {/** Google Login */}
                    <SocialButton style={{ marginTop: 20 }} type={'google'} />

                    {/** Google Login */}
                    <SocialButton style={{ marginTop: 10 }} type={'facebook'} />

                    <View style={styles.signUp}>
                        <ThemedText type={'body2'}>{'First time here?'}</ThemedText>

                        <TextButton
                            hitSlop={{ bottom: 8, left: 4, right: 8, top: 8 }}
                            onPress={() => handleNavigate('/signup')}
                            title={'Signup'}
                        />
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    form: {
        gap: 20,
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
        gap: 30,
        paddingHorizontal: 40,
    },
    logo: {
        height: 80,
        width: 80,
    },
    otherLoginLabel: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
    },
    otherLoginSeparate: {
        flex: 1,
        height: 1,
    },
    signUp: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        marginTop: 20,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default LoginScreen;
