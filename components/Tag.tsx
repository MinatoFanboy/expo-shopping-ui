import React, { FC } from 'react';

/** React Native */
import { StyleSheet, TouchableOpacity } from 'react-native';

/** App Components */
import ThemedText from './common/ThemedText';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';
import Icon from './common/Icon';

interface TagProps {
    onPress?: () => void;
    title: string;
}

const Tag: FC<TagProps> = ({ onPress, title }) => {
    const borderColor = useThemeColor({}, 'background2');
    const iconColor = useThemeColor({}, 'text2');

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.container, { borderColor }]}>
            <Icon color={iconColor} name={'rotate-left'} size={18} />

            <ThemedText color={'text2'} type={'caption'}>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        height: 32,
        marginTop: 10,
        paddingHorizontal: 10,
    },
});

export default Tag;
