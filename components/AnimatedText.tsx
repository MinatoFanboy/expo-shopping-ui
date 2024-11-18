import React, { FC, PropsWithChildren, memo, useRef, useState } from 'react';

/** React Native */
import { Animated, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View } from 'react-native';

/** App Components */
import ThemedText from './common/Text';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedText: FC<PropsWithChildren> = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded((prev) => !prev);
    };

    return (
        <View>
            <Animated.View style={{ height: isExpanded ? null : 60, overflow: 'hidden' }}>
                <ThemedText numberOfLines={isExpanded ? undefined : 3} type={'body2'}>
                    {children}
                </ThemedText>
            </Animated.View>
            <TouchableOpacity onPress={toggleExpand}>
                <ThemedText style={[styles.readMoreText, { color: GlobalColors.primary }]} type={'body2'}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    readMoreText: {
        marginTop: 5,
    },
});

export default memo(AnimatedText);
