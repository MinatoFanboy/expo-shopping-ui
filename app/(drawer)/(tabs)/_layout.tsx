import React from 'react';

/** Animated */
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

/** Drawer */
import { useDrawerProgress } from '@react-navigation/drawer';

/** Router */
import { Tabs } from 'expo-router';

/** Tab Component */
import TabBar from '@/components/TabBar';
import { GlobalColors } from '@/constants/Colors';

export default function TabLayout() {
    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.82]);

        const borderRadius = interpolate(progress.value, [0, 1], [0, 32]);

        const rotate = interpolate(progress.value, [0, 1], [0, -15]);

        const translateX = interpolate(progress.value, [0, 1], [0, 60]);

        return {
            borderRadius,
            transform: [{ rotateZ: `${rotate}deg` }, { scale }, { translateX }],
        };
    }, []);

    const animatedWrapperStyle = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [1, 0.8]);

        const borderRadius = interpolate(progress.value, [0, 1], [0, 32]);

        const rotate = interpolate(progress.value, [0, 1], [0, -8]);

        const translateX = interpolate(progress.value, [0, 1], [0, 60]);

        return {
            borderRadius,
            transform: [{ rotateZ: `${rotate}deg` }, { scale }, { translateX }],
        };
    }, []);

    return (
        <>
            <Animated.View
                style={[
                    {
                        backgroundColor: GlobalColors.primary20p,
                        bottom: 0,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    },
                    animatedWrapperStyle,
                ]}
            />
            <Animated.View style={[animatedStyle, { flex: 1, overflow: 'hidden', zIndex: 2 }]}>
                <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
                    <Tabs.Screen name="index" options={{ title: 'Home' }} />
                </Tabs>
            </Animated.View>
        </>
    );
}
