import React, { FC } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** App Components */
import Icon from './Icon';
import ThemedText from './Text';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const Ratings: FC<{ rate: number }> = ({ rate }) => {
    const defaultColor = useThemeColor({}, 'text2');

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Icon
                    color={rate > 1 ? GlobalColors.primary : defaultColor}
                    name={rate >= 1 ? 'star-solid' : 'star'}
                    size={18}
                />
                <Icon
                    color={rate > 2 ? GlobalColors.primary : defaultColor}
                    name={rate >= 2 ? 'star-solid' : 'star'}
                    size={18}
                />
                <Icon
                    color={rate > 3 ? GlobalColors.primary : defaultColor}
                    name={rate >= 3 ? 'star-solid' : 'star'}
                    size={18}
                />
                <Icon
                    color={rate > 4 ? GlobalColors.primary : defaultColor}
                    name={rate >= 4 ? 'star-solid' : 'star'}
                    size={18}
                />
                <Icon
                    color={rate > 5 ? GlobalColors.primary : defaultColor}
                    name={rate >= 5 ? 'star-solid' : 'star'}
                    size={18}
                />
            </View>

            <ThemedText>({rate})</ThemedText>
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
