import React, { FC, useCallback, useState } from 'react';

/** React Native */
import { Image, StyleSheet, View, useColorScheme } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import ForgotPasswordInput from '@/components/common/ForgotPasswordInput';
import ThemedText from '@/components/common/Text';

import Header from '@/components/Header';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Dimension */
import { hp, validateEmail, validatePhone, wait } from '@/helpers/common';

const ForgotPasswordScreen: FC = () => {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';

    const subTitleColor = useThemeColor({}, 'text2');

    const [error, setError] = useState<{ email: string; phone: string }>({
        email: '',
        phone: '',
    });
    const [isSelected, setIsSelected] = useState<string | null>(null);
    const [form, setForm] = useState<{ email: string; phone: string }>({ email: '', phone: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const onChangeForm = useCallback(({ name, value }: { name: 'email' | 'phone'; value: string }) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const onSubmit = useCallback(async () => {
        setError({ email: '', phone: '' });

        if (isSelected) {
            if (isSelected === 'email') {
                if (form.email) {
                    if (validateEmail(form.email)) {
                        /** Success */
                        setLoading(true);

                        await wait(500);

                        setLoading(false);

                        router.push('/verification');
                    } else {
                        setError((prev) => ({ ...prev, email: 'Email is not in correct format' }));
                    }
                } else {
                    setError((prev) => ({ ...prev, email: 'Email cannot be blank' }));
                }
            }
            if (isSelected === 'phone') {
                if (form.phone) {
                    if (validatePhone(form.phone)) {
                        /** Success */
                        setLoading(true);

                        await wait(500);

                        setLoading(false);

                        router.push('/verification');
                    } else {
                        setError((prev) => ({ ...prev, phone: 'Phone is not in correct format' }));
                    }
                } else {
                    setError((prev) => ({ ...prev, phone: 'Phone cannot be blank' }));
                }
            }
        } else {
            setError({ email: 'Email cannot be blank', phone: 'Phone cannot be blank' });
        }
    }, [isSelected, form]);

    return (
        <Container header={<Header />} keyboard>
            {/** Title & Content */}
            <View style={styles.header}>
                <ThemedText bold style={styles.textCenter} type={'header5'}>
                    Forgot Password
                </ThemedText>
                <ThemedText style={[styles.textCenter, { color: subTitleColor }]} type={'body2'}>
                    Select which contact details should we use to reset your password.
                </ThemedText>
            </View>

            {/** Image */}
            <Image
                resizeMode={'contain'}
                source={
                    theme === 'light'
                        ? require('@/assets/images/vector/password-light.png')
                        : require('@/assets/images/vector/password-dark.png')
                }
                style={[styles.image, { height: hp(40) }]}
            />

            {/** Form */}
            <View style={styles.form}>
                <ForgotPasswordInput
                    error={error.email}
                    onChangeText={(text) => onChangeForm({ name: 'phone', value: text })}
                    onFocus={() => setIsSelected('phone')}
                    selected={isSelected === 'phone'}
                    value={form.phone}
                    type={'phone'}
                />

                <ForgotPasswordInput
                    error={error.phone}
                    onChangeText={(text) => onChangeForm({ name: 'email', value: text })}
                    onFocus={() => setIsSelected('email')}
                    selected={isSelected === 'email'}
                    value={form.email}
                    type={'email'}
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Button loading={loading} onPress={onSubmit} title={'Continue'} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    form: {
        gap: 16,
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
    textCenter: {
        textAlign: 'center',
    },
});

export default ForgotPasswordScreen;
