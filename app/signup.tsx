import React, { FC, useCallback, useState } from 'react';

/** React Native */
import { Image, StyleSheet, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** Local Storage */
import AsyncStorage from '@react-native-async-storage/async-storage';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import SocialButton from '@/components/common/SocialButton';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';
import ThemedText from '@/components/common/Text';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Async */
import { validateEmail, wait } from '@/helpers/common';

const SignupScreen: FC = () => {
    const router = useRouter();
    const subTitleColor = useThemeColor({}, 'text2');

    const [error, setError] = useState<{ confirmPassword: string; email: string; name: string; password: string }>({
        confirmPassword: '',
        email: '',
        name: '',
        password: '',
    });
    const [form, setForm] = useState<{ confirmPassword: string; email: string; name: string; password: string }>({
        confirmPassword: '',
        email: '',
        name: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = useCallback(() => {
        router.push('/login');
    }, []);

    const onChangeForm = useCallback(
        ({ name, value }: { name: 'confirmPassword' | 'email' | 'name' | 'password'; value: string }) => {
            setForm((prev) => ({ ...prev, [name]: value }));
        },
        [],
    );

    const onSubmit = useCallback(async () => {
        setError({ confirmPassword: '', email: '', name: '', password: '' });

        if (form.confirmPassword && form.email && form.name && form.password) {
            if (!validateEmail(form.email)) {
                setError((prev) => ({ ...prev, email: 'Email is not in correct format' }));
            } else {
                setLoading(true);

                await wait(500);

                setLoading(false);

                await AsyncStorage.setItem('user', JSON.stringify(form));

                router.back();
            }
        } else {
            if (form.confirmPassword === '') {
                setError((prev) => ({ ...prev, confirmPassword: 'Confirm password cannot be blank' }));
            }
            if (form.email === '') {
                setError((prev) => ({ ...prev, email: 'Email cannot be blank' }));
            }
            if (form.name === '') {
                setError((prev) => ({ ...prev, name: 'Name cannot be blank' }));
            }
            if (form.password === '') {
                setError((prev) => ({ ...prev, password: 'Password cannot be blank' }));
            }
        }
    }, [form]);

    return (
        <Container keyboard>
            {/** Header  */}
            <View style={styles.header}>
                {/** Logo */}
                <Image resizeMode={'contain'} source={require('@/assets/images/logo/logo.png')} style={styles.logo} />

                {/** Title & Content */}
                <View style={{ gap: 5 }}>
                    <ThemedText bold style={styles.textCenter} type={'header5'}>
                        Create New Account
                    </ThemedText>
                    <ThemedText style={[styles.textCenter, { color: subTitleColor }]} type={'body2'}>
                        Looks like you don't have an account or correct with social networks
                    </ThemedText>
                </View>
            </View>

            {/** Form */}
            <View style={styles.form}>
                <View style={{ gap: 30 }}>
                    {/** Name, Email, Password & Confirm Password */}
                    <View style={{ gap: 20 }}>
                        <TextInput
                            autoCapitalize={'none'}
                            error={error.name}
                            icon={'profile'}
                            onChangeText={(text) => onChangeForm({ name: 'name', value: text })}
                            placeholder={'Name'}
                            value={form.name}
                        />

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

                        <TextInput
                            autoCapitalize={'none'}
                            error={error.confirmPassword}
                            icon={'lock'}
                            onChangeText={(text) => onChangeForm({ name: 'confirmPassword', value: text })}
                            placeholder={'Confirm Password'}
                            secureTextEntry
                            value={form.confirmPassword}
                        />
                    </View>

                    <Button loading={loading} onPress={onSubmit} title={'Signup'} />
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
                        <ThemedText type={'body2'}>{'Already have an account?'}</ThemedText>

                        <TextButton
                            hitSlop={{ bottom: 8, left: 4, right: 8, top: 8 }}
                            onPress={handleLogin}
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

export default SignupScreen;
