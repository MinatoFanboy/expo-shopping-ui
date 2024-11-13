/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { ThemeColors } from '@/constants/Colors';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof ThemeColors.light & keyof typeof ThemeColors.dark,
) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return ThemeColors[theme][colorName];
    }
}
