import React, { FC } from 'react';

/** React Native */
import { StyleProp, ViewStyle } from 'react-native';

/** Vector Icons */
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

/** Config Icomoon Icon */
import icoMoonConfig from '@/assets/config/selection.json';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

type IconProps = {
    color?: string;
    name: string;
    size: number;
    style?: StyleProp<ViewStyle>;
};

const Icon: FC<IconProps> = ({ color, name, size, style }) => {
    const defaultColor = useThemeColor({}, 'text1');

    const FontIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon', 'icomoon');

    return <FontIcon color={color ?? defaultColor} name={name} size={size} style={style} />;
};

export default Icon;
