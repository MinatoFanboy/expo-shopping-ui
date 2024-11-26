import React, { FC, memo, useEffect, useRef } from 'react';

/** React Native */
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface SwitchProps {
    active?: boolean;
    onChange?: (value: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ active = false, onChange }) => {
    const toggleAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(toggleAnim, { duration: 300, toValue: active ? 1 : 0, useNativeDriver: true }).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onChange?.(!active)} style={styles.container}>
            <Animated.View
                style={{
                    backgroundColor: toggleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [GlobalColors.gray80, GlobalColors.primary],
                    }),
                    borderRadius: 999,
                    height: 31,
                    width: 51,
                }}
            >
                <Animated.View
                    style={{
                        backgroundColor: GlobalColors.white,
                        borderRadius: 999,
                        height: 27,
                        left: 2,
                        position: 'absolute',
                        top: 2,
                        transform: [
                            {
                                translateX: toggleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 20],
                                }),
                            },
                        ],
                        width: 27,
                    }}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default memo(Switch);
