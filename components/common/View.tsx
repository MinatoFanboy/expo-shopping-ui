import React, { FC } from 'react';

/** React Native */
import { View as RnView, ViewProps as RnViewProps } from 'react-native';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

type ViewProps = RnViewProps & {
    background?: 'background1' | 'background2' | 'background3';
    darkColor?: string;
    lightColor?: string;
};

const View: FC<ViewProps> = ({ background = 'background1', darkColor, lightColor, style, ...rest }) => {
    const backgroundColor = useThemeColor({ dark: darkColor, light: lightColor }, background);

    return <RnView style={[{ backgroundColor }, style]} {...rest} />;
};

export default View;
