import React, { FC } from 'react';

/** React Native */
import { View as RnView, ViewProps as RnViewProps } from 'react-native';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

type ViewProps = RnViewProps & {
    background?: 'background' | 'background1';
    darkColor?: string;
    lightColor?: string;
};

const View: FC<ViewProps> = ({ background = 'background', darkColor, lightColor, style, ...rest }) => {
    const backgroundColor = useThemeColor({ dark: darkColor, light: lightColor }, background);

    return <RnView style={[{ backgroundColor }, style]} {...rest} />;
};

export default View;
