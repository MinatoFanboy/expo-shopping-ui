import React, { FC } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** App Components */
import Icon from './Icon';
import ThemedText from './ThemedText';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

interface RatingsProps {
    rate: number;
    showText?: boolean;
    size?: number;
    solid?: boolean;
}

const Ratings: FC<RatingsProps> = ({ rate, showText = true, size = 18, solid }) => {
    const defaultColor = useThemeColor({}, 'text2');
    const defaultColor1 = useThemeColor({}, 'background3');

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Icon
                    color={rate >= 1 ? GlobalColors.primary : solid ? defaultColor1 : defaultColor}
                    name={rate >= 1 ? 'star-solid' : solid ? 'star-solid' : 'star'}
                    size={size}
                />
                <Icon
                    color={rate >= 2 ? GlobalColors.primary : solid ? defaultColor1 : defaultColor}
                    name={rate >= 2 ? 'star-solid' : solid ? 'star-solid' : 'star'}
                    size={size}
                />
                <Icon
                    color={rate >= 3 ? GlobalColors.primary : solid ? defaultColor1 : defaultColor}
                    name={rate >= 3 ? 'star-solid' : solid ? 'star-solid' : 'star'}
                    size={size}
                />
                <Icon
                    color={rate >= 4 ? GlobalColors.primary : solid ? defaultColor1 : defaultColor}
                    name={rate >= 4 ? 'star-solid' : solid ? 'star-solid' : 'star'}
                    size={size}
                />
                <Icon
                    color={rate >= 5 ? GlobalColors.primary : solid ? defaultColor1 : defaultColor}
                    name={rate >= 5 ? 'star-solid' : solid ? 'star-solid' : 'star'}
                    size={size}
                />
            </View>

            {showText && <ThemedText>({rate})</ThemedText>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    wrapper: {
        flexDirection: 'row',
        gap: 2,
    },
});

export default Ratings;
