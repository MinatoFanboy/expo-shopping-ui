import React, { FC, PropsWithChildren, ReactNode } from 'react';

/** React Native */
import { ScrollView, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

/** Safe Area */
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Animated */
import Animated, {
    interpolateColor,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Icon from './common/Icon';
import ThemedText from './common/Text';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

interface ContainerProps {
    footer?: ReactNode;
    style?: StyleProp<ViewStyle>;
    title?: string;
}

const HEADER_HEIGHT = 250;

const ParallaxContainer: FC<PropsWithChildren<ContainerProps>> = ({ children, footer, style, title }) => {
    const { bottom, top } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top : 24;
    const paddingBottom = bottom > 0 ? bottom : 24;

    const router = useRouter();

    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                scrollOffset.value,
                [0, HEADER_HEIGHT],
                ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
            ),
        };
    });

    const backgroundColor = useThemeColor({}, 'background1');

    return (
        <Animated.View style={[styles.container, { paddingTop }, headerAnimatedStyle]}>
            <View style={[styles.headerContainer]}>
                {title ? (
                    <ThemedText bold style={styles.header}>
                        {title}
                    </ThemedText>
                ) : null}

                <TouchableOpacity
                    activeOpacity={0.7}
                    hitSlop={{ bottom: 12, left: 12, right: 12, top: 12 }}
                    onPress={() => router.back()}
                    style={styles.back}
                >
                    <Icon name={'chevron-left'} size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[{ flexGrow: 1, paddingBottom, paddingHorizontal: 20 }, style]}
                ref={scrollRef}
                scrollEventThrottle={16}
                style={[styles.container, { backgroundColor }]}
            >
                {children}
            </ScrollView>

            {footer}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    back: {
        left: 20,
        position: 'absolute',
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
    },
});

export default ParallaxContainer;
