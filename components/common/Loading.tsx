import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { GlobalColors } from '@/constants/Colors';

const Loading: FC<{ color?: string; size?: 'small' | 'large' | number }> = ({
    color = GlobalColors.primary,
    size = 'large',
}) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={color} size={size} />
        </View>
    );
};

export default Loading;
