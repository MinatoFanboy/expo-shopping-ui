import React, { FC, memo, useState } from 'react';

/** React Native */
import {
    TextInput as RnTextInput,
    TextInputProps as RnTextInputProps,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

/** App Components */
import Icon from './Icon';
import ThemedText from './Text';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextInputProps = RnTextInputProps & {
    error?: string;
    secureTextEntry?: boolean;
    icon?: string;
};

const TextInput: FC<TextInputProps> = ({ error, icon, secureTextEntry, value, ...rest }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(true);

    const backgroundColor = useThemeColor({}, 'input');
    const color = useThemeColor({}, 'text1');
    const placeholderColor = useThemeColor({}, 'placeholder');

    return (
        <View style={{ gap: 8 }}>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor,
                        borderColor: error
                            ? GlobalColors.error
                            : isFocused || value
                            ? GlobalColors.primary
                            : backgroundColor,
                    },
                ]}
            >
                {icon && (
                    <Icon color={value || isFocused ? GlobalColors.primary : placeholderColor} name={icon} size={24} />
                )}

                <RnTextInput
                    hitSlop={{ bottom: 16, top: 16 }}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    placeholderTextColor={placeholderColor}
                    secureTextEntry={secureTextEntry ? isShowPassword : false}
                    selectionColor={GlobalColors.primary}
                    style={[styles.input, { color }]}
                    value={value}
                    {...rest}
                />

                {/** Password Icon */}
                {secureTextEntry && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        onPress={() => setIsShowPassword((prev) => !prev)}
                    >
                        <Icon
                            color={value || isFocused ? GlobalColors.primary : placeholderColor}
                            name={isShowPassword ? 'eye-slash' : 'eye'}
                            size={24}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <ThemedText style={{ color: GlobalColors.error }} type={'caption'}>
                    {error}
                </ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        paddingVertical: 0,
    },
});

export default memo(TextInput);
