import React, { FC, memo, useState } from 'react';

/** React Native */
import {
    TextInput as RnTextInput,
    TextInputProps as RnTextInputProps,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

/** App Components */
import ThemedText from './ThemedText';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextInputProps = RnTextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;
    error?: string;
    length?: number;
    wrapperStyle?: StyleProp<ViewStyle>;
};

const TextArea: FC<TextInputProps> = ({ containerStyle, error, length = 250, style, value, wrapperStyle, ...rest }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const borderColor = useThemeColor({}, 'border');
    const color = useThemeColor({}, 'text1');
    const placeholderColor = useThemeColor({}, 'placeholder');

    return (
        <View style={[{ gap: 8 }, wrapperStyle]}>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: error
                            ? GlobalColors.error
                            : isFocused || value
                            ? GlobalColors.primary
                            : borderColor,
                    },
                    containerStyle,
                ]}
            >
                <RnTextInput
                    hitSlop={{ bottom: 16, top: 16 }}
                    multiline
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    placeholderTextColor={placeholderColor}
                    selectionColor={GlobalColors.primary}
                    style={[styles.input, { color }, style]}
                    value={value}
                    {...rest}
                />
            </View>

            <View style={styles.helper}>
                <ThemedText style={{ color: GlobalColors.error }} type={'caption'}>
                    {error || ''}
                </ThemedText>

                <ThemedText color={'text2'} type={'caption'}>{`${
                    length - (value?.length || 0)
                } characters remaining`}</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        borderWidth: 1,
        height: 140,
        padding: 19,
    },
    helper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24,
    },
    input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        paddingVertical: 0,
        textAlignVertical: 'top',
    },
});

export default memo(TextArea);
