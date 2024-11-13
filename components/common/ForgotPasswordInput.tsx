import React, { FC, memo, useState } from 'react';

/** React Native */
import { TextInput as RnTextInput, TextInputProps as RnTextInputProps, StyleSheet, View } from 'react-native';

/** Masked Input */
import { TextInputMask } from 'react-native-masked-text';

/** App Components */
import Icon from './Icon';
import ThemedText from './Text';
import ThemedView from './View';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextInputProps = RnTextInputProps & {
    error?: string;
    selected?: boolean;
    type: 'email' | 'phone';
};

const ForgotPasswordInput: FC<TextInputProps> = ({ error, selected, type, ...rest }) => {
    const borderColor = useThemeColor({}, 'border');
    const color = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'placeholder');
    const subTitleColor = useThemeColor({}, 'text2');

    return (
        <View style={{ gap: 8 }}>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: error ? GlobalColors.error : selected ? GlobalColors.primary : borderColor,
                    },
                ]}
            >
                <ThemedView
                    background={'background1'}
                    style={[styles.icon, selected ? { backgroundColor: GlobalColors.primary } : undefined]}
                >
                    <Icon
                        color={selected ? GlobalColors.white : placeholderColor}
                        name={type === 'email' ? 'sms' : 'message'}
                        size={24}
                    />
                </ThemedView>

                <View style={{ flex: 1 }}>
                    <ThemedText style={{ color: subTitleColor }} type={'caption'}>{`Send OTP via ${
                        type === 'email' ? 'SMS' : 'Email'
                    }`}</ThemedText>

                    <View style={styles.wrapper}>
                        {type === 'email' ? (
                            <RnTextInput
                                autoCapitalize={'none'}
                                autoComplete={'email'}
                                hitSlop={{ bottom: 8, top: 8 }}
                                keyboardType={'email-address'}
                                placeholder={'Email'}
                                placeholderTextColor={placeholderColor}
                                selectionColor={GlobalColors.primary}
                                style={[styles.input, { color }]}
                                {...rest}
                            />
                        ) : (
                            <TextInputMask
                                hitSlop={{ bottom: 8, top: 8 }}
                                keyboardType={'numeric'}
                                options={{
                                    mask: '(999) 999-9999',
                                }}
                                placeholder={'Phone'}
                                placeholderTextColor={placeholderColor}
                                selectionColor={GlobalColors.primary}
                                style={[styles.input, { color }]}
                                type={'custom'}
                                {...rest}
                            />
                        )}
                    </View>
                </View>
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
        gap: 12,
        padding: 12,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 999,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    input: {
        fontSize: 14,
        paddingVertical: 0,
        width: '100%',
    },
    wrapper: {
        height: 32,
        justifyContent: 'center',
    },
});

export default memo(ForgotPasswordInput);
