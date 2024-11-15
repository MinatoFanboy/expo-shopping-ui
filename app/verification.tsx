import React, { FC, useEffect, useState } from 'react';

/** React Native */
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
const { width } = Dimensions.get('window');

/** Router */
import { useRouter } from 'expo-router';

/** OTP Input */
import OTPInputView from '@twotalltotems/react-native-otp-input';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import ThemedText from '@/components/common/Text';
import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Dimension */
import { hp, wait } from '@/helpers/common';

const Verification: FC = () => {
    const router = useRouter();
    const theme = useColorScheme() ?? 'light';

    const inputColor = useThemeColor({}, 'input');
    const subTitleColor = useThemeColor({}, 'text2');

    const [isTimerActive, setIsTimerActive] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleResendPin = () => {
        if (!isTimerActive) {
            setTimeLeft(30);
            setIsTimerActive(true);
        }
    };

    const onFinishCode = async (code: string) => {
        setLoading(true);

        await wait(500);

        setLoading(false);

        router.push('/changePassword');
    };

    useEffect(() => {
        if (timeLeft === 0) {
            return;
        }

        if (isTimerActive) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft, isTimerActive]);

    return (
        <Container header={<Header />} keyboard>
            {/** Title & Content */}
            <View style={styles.header}>
                <ThemedText bold style={styles.textCenter} type={'header5'}>
                    Enter Verification Code
                </ThemedText>
                <ThemedText style={[styles.textCenter, { color: subTitleColor }]} type={'body2'}>
                    We have sent the code verification to your mobile number
                </ThemedText>
            </View>

            {/** Image */}
            <Image
                resizeMode={'contain'}
                source={
                    theme === 'light'
                        ? require('@/assets/images/vector/verification-light.png')
                        : require('@/assets/images/vector/verification-dark.png')
                }
                style={[styles.image, { height: hp(40) }]}
            />

            <View style={{ marginTop: 20 }}>
                <OTPInputView
                    codeInputFieldStyle={{
                        backgroundColor: inputColor,
                        borderRadius: 20,
                        borderColor: inputColor,
                        borderWidth: 3,
                        color: GlobalColors.primary,
                        fontWeight: 'bold',
                        fontSize: 20,
                        height: width / 5.5,
                        width: width / 5.5,
                    }}
                    codeInputHighlightStyle={{
                        borderColor: GlobalColors.primary,
                    }}
                    onCodeFilled={(code) => onFinishCode(code)}
                    pinCount={4}
                    style={{ height: width / 5.5 }}
                />
            </View>

            <View style={styles.resend}>
                <ThemedText type={'body2'}>{formatTime(timeLeft)}</ThemedText>

                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{ bottom: 8, left: 4, right: 8, top: 8 }}
                    onPress={handleResendPin}
                >
                    <ThemedText style={{ color: GlobalColors.primary }} type={'body2'}>
                        Resend
                    </ThemedText>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
                <Button loading={loading} title={'Verify'} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
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

export default Verification;
