import React, { FC, memo } from 'react';

/** React Native */
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

/** App Components */
import ThemedText from './ThemedText';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface TextButtonProps extends TouchableOpacityProps {
    title: string;
}

const TextButton: FC<TextButtonProps> = ({ title, ...rest }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} {...rest}>
            <ThemedText style={{ color: GlobalColors.primary }} type={'body2'}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
};

export default memo(TextButton);
