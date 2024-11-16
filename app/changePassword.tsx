import React, { FC, useCallback, useRef, useState } from 'react';

/** React Native */
import { Image, StyleSheet, View, useColorScheme } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Modal from '@/components/common/Modal';
import TextInput from '@/components/common/TextInput';
import ThemedText from '@/components/common/Text';

import Header from '@/components/Header';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Dimension */
import { hp, wait } from '@/helpers/common';

const ChangePasswordScreen: FC = () => {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';

    const subTitleColor = useThemeColor({}, 'text2');

    const modalRef = useRef<any>(null);
    const [error, setError] = useState<{ confirmPassword: string; password: string }>({
        confirmPassword: '',
        password: '',
    });
    const [form, setForm] = useState<{ confirmPassword: string; password: string }>({
        confirmPassword: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const onBack = useCallback(() => {
        modalRef.current?.hide();

        router.push('/login');
    }, []);

    const onChangeForm = useCallback(({ name, value }: { name: 'confirmPassword' | 'password'; value: string }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const onSubmit = useCallback(async () => {
        setError({ confirmPassword: '', password: '' });

        if (form.confirmPassword && form.password) {
            if (form.confirmPassword === form.password) {
                setLoading(true);

                await wait(500);

                setLoading(false);

                modalRef.current?.show();
            } else {
                setError((prev) => ({ ...prev, confirmPassword: 'Password does not match' }));
            }
        } else {
            if (form.confirmPassword === '') {
                setError((prev) => ({ ...prev, confirmPassword: 'Confirm password cannot be blank' }));
            }
            if (form.password === '') {
                setError((prev) => ({ ...prev, password: 'Password cannot be blank' }));
            }
        }
    }, [form]);

    return (
        <Container header={<Header />} keyboard>
            {/** Title & Content */}
            <View style={styles.header}>
                <ThemedText bold style={styles.textCenter} type={'header5'}>
                    Enter New Password
                </ThemedText>
                <ThemedText style={[styles.textCenter, { color: subTitleColor }]} type={'body2'}>
                    Please enter your new password
                </ThemedText>
            </View>

            {/** Image */}
            <Image
                resizeMode={'contain'}
                source={
                    theme === 'light'
                        ? require('@/assets/images/vector/new-password-light.png')
                        : require('@/assets/images/vector/new-password-dark.png')
                }
                style={[styles.image, { height: hp(40) }]}
            />

            {/** Form */}
            <View style={styles.form}>
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

            <View style={{ marginTop: 30 }}>
                <Button loading={loading} onPress={onSubmit} title={'Verify'} />
            </View>

            <Modal ref={modalRef}>
                <View>
                    <View style={{ alignItems: 'center', gap: 20 }}>
                        <Image source={require('@/assets/icons/phone.png')} />

                        <View style={{ width: '70%' }}>
                            <ThemedText bold style={styles.textCenter} type={'header6'}>
                                Password Update Successfully
                            </ThemedText>
                        </View>

                        <View style={{ width: '60%' }}>
                            <ThemedText style={styles.textCenter} type={'body2'}>
                                Your password has been updated successfully
                            </ThemedText>
                        </View>
                    </View>

                    <Button onPress={onBack} title={'Back to Home'} style={{ marginTop: 30 }} />
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    form: {
        gap: 16,
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 40,
    },
    image: {
        marginTop: 24,
        width: '100%',
    },
    resend: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default ChangePasswordScreen;
