import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

/** React Native */
import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/** Status Bar */
import { setStatusBarStyle } from 'expo-status-bar';

/** Blur */
import { BlurView } from 'expo-blur';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import HighlightText from '@/components/common/HighlightText';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/ThemedText';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Constants */
import { GlobalColors } from '@/constants/Colors';
import { dimension, imageMap } from '@/constants/Constants';

/** DATA */
import onboardingData from '@/mocks/onboarding.json';

const OnboardingScreen: FC = () => {
    const router = useRouter();

    const blurColor = useThemeColor({ dark: 'rgba(0, 0, 0, 0.56)', light: 'rgba(255, 255, 255, 0.56)' }, 'background1');
    const dotDefaultColor = useThemeColor({}, 'dot');
    const subTitleColor = useThemeColor({}, 'text2');

    const [isLastItem, setIsLastItem] = useState<boolean>(false);

    /** Animated */
    const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
    const dotPosition = Animated.divide(scrollX, dimension.WIDTH);

    /** FlatList */
    const currentIndex = useRef(0);
    const screenFlatListRef = useRef<FlatList>(null);
    const titleFlatListRef = useRef<FlatList>(null);

    const handleNextPress = useCallback(() => {
        if (currentIndex.current < onboardingData.length - 1) {
            currentIndex.current += 1;
            const nextIndex = currentIndex.current;
            const offset = nextIndex * dimension.WIDTH;
            const titleOffset = nextIndex * (dimension.WIDTH - 80);

            screenFlatListRef.current?.scrollToOffset({ animated: true, offset });
            titleFlatListRef.current?.scrollToOffset({ animated: true, offset: titleOffset });

            if (currentIndex.current === onboardingData.length - 1) {
                setIsLastItem(true);
            }
        } else {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        setStatusBarStyle('dark');

        return () => {
            setStatusBarStyle('auto');
        };
    }, []);

    return (
        <Container white>
            {/** Image Background */}
            <FlatList
                data={onboardingData}
                decelerationRate={'fast'}
                horizontal
                keyExtractor={(item) => `Onboarding-${item.id}`}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                pagingEnabled
                ref={screenFlatListRef}
                renderItem={({ item }) => {
                    return (
                        <Image
                            resizeMode={'contain'}
                            source={imageMap[item.image]}
                            style={{ width: dimension.WIDTH }}
                        />
                    );
                }}
                scrollEnabled={false}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={'center'}
                snapToInterval={dimension.WIDTH}
                style={{ flex: 1 }}
            />

            {/** Title */}
            <BlurView intensity={100} style={[styles.footer, { backgroundColor: blurColor }]}>
                {/** Title & Content */}
                <FlatList
                    data={onboardingData}
                    decelerationRate={'fast'}
                    horizontal
                    keyExtractor={(item) => `OnboardingTitle-${item.id}`}
                    pagingEnabled
                    ref={titleFlatListRef}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.titleWrapper, { width: dimension.WIDTH - 80 }]}>
                                <HighlightText bold style={styles.textCenter} type={'header5'}>
                                    {item.title}
                                </HighlightText>

                                <ThemedText style={[{ color: subTitleColor }, styles.textCenter]} type={'body2'}>
                                    {item.subTitle}
                                </ThemedText>
                            </View>
                        );
                    }}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment={'center'}
                    snapToInterval={dimension.WIDTH - 80}
                />

                {/** Indicator */}
                <View style={styles.indicator}>
                    {onboardingData.map((_, index) => {
                        const dotColor = dotPosition.interpolate({
                            extrapolate: 'clamp',
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [dotDefaultColor, GlobalColors.primary, dotDefaultColor],
                        });
                        const dotWidth = dotPosition.interpolate({
                            extrapolate: 'clamp',
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [7, 31, 7],
                        });

                        return (
                            <Animated.View
                                key={`OnboardingDot-${index}`}
                                style={[styles.indicatorDot, { backgroundColor: dotColor, width: dotWidth }]}
                            />
                        );
                    })}
                </View>

                {/** Button */}
                <Button
                    onPress={handleNextPress}
                    style={{ marginTop: 30 }}
                    title={isLastItem ? 'Get Started' : 'Next'}
                />
            </BlurView>

            {!isLastItem && (
                <TouchableOpacity activeOpacity={0.7} style={styles.nextWrapper} onPress={() => router.push('/login')}>
                    <Text style={[styles.nextText, { color: GlobalColors.primary }]}>Skip</Text>

                    <View style={[styles.nextIcon, { backgroundColor: GlobalColors.primary }]}>
                        <Icon color={GlobalColors.white} name={'arrow-right'} size={18} />
                    </View>
                </TouchableOpacity>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        borderRadius: 20,
        bottom: 40,
        left: 20,
        padding: 20,
        overflow: 'hidden',
        position: 'absolute',
        right: 20,
    },
    indicator: {
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 5,
        marginTop: 20,
    },
    indicatorDot: {
        borderRadius: 999,
        height: 7,
    },
    nextIcon: {
        alignItems: 'center',
        borderRadius: 999,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    nextText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 20,
    },
    nextWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        position: 'absolute',
        right: 20,
        top: 0,
    },
    textCenter: {
        textAlign: 'center',
    },
    titleWrapper: {
        gap: 10,
        paddingHorizontal: 20,
    },
});

export default OnboardingScreen;
