import React, { FC, memo } from 'react';

/** React Native */
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

/** App Components */
import ThemedText from './Text';

/** Global Colors */
import { GlobalColors } from '@/constants/Colors';

interface ButtonProps {
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    title?: string;
    titleStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = ({ loading, onPress = () => {}, style, title = 'Title', titleStyle }) => {
    return (
        <Pressable
            disabled={loading}
            onPress={onPress}
            style={({ pressed }) => [
                { backgroundColor: pressed ? GlobalColors.primary600 : GlobalColors.primary },
                styles.button,
                style,
            ]}
        >
            {loading && <ActivityIndicator color={GlobalColors.white} size={16} />}

            <ThemedText style={[{ color: GlobalColors.white }, titleStyle]}>{title}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 999,
        flexDirection: 'row',
        gap: 12,
        height: 56,
        justifyContent: 'center',
        width: '100%',
    },
});

export default memo(Button);