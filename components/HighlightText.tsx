import React, { FC } from 'react';

/** React Native */
import { StyleProp, TextStyle } from 'react-native';

/** App Components */
import Text, { TextProps } from './Text';

/** Global Colors */
import { GlobalColors } from '@/constants/Colors';

export type HighlightTextProps = TextProps & {
    highlightStyle?: StyleProp<TextStyle>;
};

const HighlightText: FC<HighlightTextProps> = ({ children = '', highlightStyle, ...rest }) => {
    const renderText = () => {
        const parts = children ? `${children}`.split(/(<highlight>.*?<\/highlight>)/g) : [];

        return parts.map((part, index) => {
            if (part.startsWith('<highlight>') && part.endsWith('</highlight>')) {
                const content = part.replace(/<\/?highlight>/g, '');

                return (
                    <Text
                        darkColor={GlobalColors.primary}
                        key={index}
                        lightColor={GlobalColors.primary}
                        style={highlightStyle}
                        {...rest}
                    >
                        {content}
                    </Text>
                );
            }

            return (
                <Text key={index} {...rest}>
                    {part}
                </Text>
            );
        });
    };

    return <Text>{renderText()}</Text>;
};

export default HighlightText;
