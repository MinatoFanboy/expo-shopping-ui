import React, { FC, memo } from 'react';

/** React Native */
import { TouchableOpacity, View, StyleSheet } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Bottom Tabs */
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

/** Blur */
import { BlurView } from 'expo-blur';

/** Svg */
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

/** Icons */
import Icon from './common/Icon';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const TabBar: FC<BottomTabBarProps> = ({ descriptors, navigation, state }) => {
    const { bottom } = useSafeAreaInsets();
    const paddingBottom = bottom > 0 ? bottom : 24;

    const color = useThemeColor({}, 'text');
    const background = useThemeColor({}, 'tabBar');

    const icons = {
        cart: (props: any) => <Icon color={color} name={'shopping-cart'} size={24} {...props} />,
        favorite: (props: any) => <Icon color={color} name={'heart'} size={24} {...props} />,
        index: (props: any) => <Icon color={color} name={'home'} size={24} {...props} />,
        notification: (props: any) => <Icon color={color} name={'notification-bing'} size={24} {...props} />,
    };

    return (
        <BlurView intensity={10} style={{ backgroundColor: background, flexDirection: 'row', paddingBottom }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        accessibilityRole={'button'}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        key={`TabBar-${index}`}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                        testID={options.tabBarTestID}
                    >
                        {isFocused ? (
                            <View style={[styles.rectangle]}>
                                <Svg fill="none" height="42" viewBox="0 0 33 42" width="33">
                                    <Path
                                        d="M0.591847 12.0953C-0.742108 5.87016 4.00343 0 10.3699 0H22.6301C28.9966 0 33.7421 5.87017 32.4082 12.0953L26 42H7L0.591847 12.0953Z"
                                        fill="url(#paint0_linear_1_6724)"
                                        opacity="0.5"
                                    />
                                    <Defs>
                                        <LinearGradient
                                            gradientUnits="userSpaceOnUse"
                                            id="paint0_linear_1_6724"
                                            x1="17"
                                            x2="17"
                                            y1="-88"
                                            y2="33"
                                        >
                                            <Stop stopColor="#648286" />
                                            <Stop offset="1" stopColor="#648286" stopOpacity="0" />
                                        </LinearGradient>
                                    </Defs>
                                </Svg>
                            </View>
                        ) : null}

                        {isFocused ? (
                            <View style={[styles.indicator, { backgroundColor: GlobalColors.primary }]} />
                        ) : null}

                        {icons[route.name as keyof typeof icons]({ color: isFocused ? GlobalColors.primary : color })}
                    </TouchableOpacity>
                );
            })}
        </BlurView>
    );
};

const styles = StyleSheet.create({
    indicator: {
        height: 2,
        position: 'absolute',
        top: 0,
        width: 20,
    },
    rectangle: {
        position: 'absolute',
        top: 0,
    },
    tabBarItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 50,
    },
});

export default memo(TabBar);
