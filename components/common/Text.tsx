import React, { FC } from 'react';

/** React Native */
import { StyleSheet, Text as RnText, TextProps as RnTextProps } from 'react-native';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = RnTextProps & {
    bold?: boolean;
    color?: 'text1' | 'text2';
    darkColor?: string;
    lightColor?: string;
    semibold?: boolean;
    type?:
        | 'default'
        | 'header1'
        | 'header2'
        | 'header3'
        | 'header4'
        | 'header5'
        | 'header6'
        | 'header7'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'label';
};

const Text: FC<TextProps> = ({
    bold,
    color = 'text1',
    darkColor,
    lightColor,
    semibold,
    style,
    type = 'default',
    ...rest
}) => {
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, color);

    return (
        <RnText
            style={[
                { color: textColor, fontFamily: 'Poppins-Regular' },
                bold ? styles.bold : undefined,
                semibold ? styles.semibold : undefined,
                /** Font Style */
                type === 'default' ? styles.default : undefined,
                /** Header */
                type === 'header1' ? styles.header1 : undefined,
                type === 'header2' ? styles.header2 : undefined,
                type === 'header3' ? styles.header3 : undefined,
                type === 'header4' ? styles.header4 : undefined,
                type === 'header5' ? styles.header5 : undefined,
                type === 'header6' ? styles.header6 : undefined,
                type === 'header7' ? styles.header7 : undefined,
                /** Body */
                type === 'body1' ? styles.body1 : undefined,
                type === 'body2' ? styles.body2 : undefined,
                /** Caption */
                type === 'caption' ? styles.caption : undefined,
                /** Label */
                type === 'label' ? styles.label : undefined,
                style,
            ]}
            {...rest}
        />
    );
};

const styles = StyleSheet.create({
    body1: {
        fontSize: 18,
        lineHeight: 28,
    },
    body2: {
        fontSize: 14,
        lineHeight: 20,
    },
    bold: {
        fontFamily: 'Poppins-Bold',
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
    },
    default: {
        fontSize: 16,
        lineHeight: 22,
    },
    header1: {
        fontSize: 80,
    },
    header2: {
        fontSize: 60,
    },
    header3: {
        fontSize: 40,
    },
    header4: {
        fontSize: 30,
        lineHeight: 36,
    },
    header5: {
        fontSize: 24,
        lineHeight: 32,
    },
    header6: {
        fontSize: 20,
        lineHeight: 28,
    },
    header7: {
        fontSize: 18,
        lineHeight: 28,
    },
    label: {
        fontSize: 11,
        lineHeight: 16,
    },
    semibold: {
        fontFamily: 'Poppins-Semibold',
    },
});

export default Text;
