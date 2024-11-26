import React, { FC, memo } from 'react';

/** React Native */
import { Image, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

/** App Components */
import ThemedText from './ThemedText';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

interface SocialButtonProps {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    type: 'facebook' | 'google';
}

const SocialButton: FC<SocialButtonProps> = ({ onPress = () => {}, style, type, titleStyle }) => {
    const backgroundColor = useThemeColor({}, 'input');
    const backgroundFocusedColor = useThemeColor({}, 'buttonFocused');

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                { backgroundColor: pressed ? backgroundFocusedColor : backgroundColor },
                styles.button,
                style,
            ]}
        >
            <Image
                resizeMode={'contain'}
                source={
                    type === 'facebook' ? require('@/assets/icons/facebook.png') : require('@/assets/icons/google.png')
                }
                style={{ height: 24, width: 24 }}
            />

            <ThemedText style={titleStyle}>{`Login with ${type === 'facebook' ? 'Facebook' : 'Google'}`}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 16,
        flexDirection: 'row',
        gap: 10,
        height: 56,
        justifyContent: 'center',
        width: '100%',
    },
    icon: {
        height: 24,
        width: 24,
    },
});

export default memo(SocialButton);
