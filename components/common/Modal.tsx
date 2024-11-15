import React, { ReactNode, forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';

/** React Native */
import { Animated, Modal as RnModal, StyleSheet } from 'react-native';

/** Blur */
import { BlurView } from 'expo-blur';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

interface ModalRef {
    hide: () => void;
    show: () => void;
}

const Modal = forwardRef<ModalRef, { children?: ReactNode }>(({ children }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);

    const translateAnimate = useRef<Animated.Value>(new Animated.Value(0)).current;

    const blurColor = useThemeColor({ dark: 'rgba(231, 153, 85, 0.2)', light: 'rgba(0, 0, 0, 0.07)' }, 'background');
    const backgroundColor = useThemeColor({}, 'background');

    useImperativeHandle(ref, () => ({
        hide: () => {
            Animated.timing(translateAnimate, { duration: 250, toValue: 0, useNativeDriver: true }).start(() =>
                setVisible(false),
            );
            setVisible(false);
        },
        show: () => {
            setVisible(true);
            Animated.timing(translateAnimate, { duration: 250, toValue: 1, useNativeDriver: true }).start();
        },
    }));

    return (
        <RnModal statusBarTranslucent transparent onRequestClose={() => {}} visible={visible}>
            <BlurView intensity={20} style={[styles.container, { backgroundColor: blurColor }]}>
                <Animated.View
                    style={{
                        backgroundColor: backgroundColor,
                        borderRadius: 20,
                        padding: 20,
                        transform: [
                            {
                                translateY: translateAnimate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1000, 0],
                                }),
                            },
                        ],
                    }}
                >
                    {children}
                </Animated.View>
            </BlurView>
        </RnModal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default memo(Modal);
