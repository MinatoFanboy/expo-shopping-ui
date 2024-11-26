import React, { FC, memo } from 'react';

/** React Native */
import { StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** Components */
import Icon from './common/Icon';
import ThemedText from './common/ThemedText';

const Header: FC<{ title?: string }> = ({ title }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {title ? (
                <ThemedText bold style={styles.header}>
                    {title}
                </ThemedText>
            ) : null}

            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={{ bottom: 12, left: 12, right: 12, top: 12 }}
                onPress={() => router.back()}
                style={styles.back}
            >
                <Icon name={'chevron-left'} size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    back: {
        left: 20,
        position: 'absolute',
    },
    container: {
        alignItems: 'center',
        height: 44,
        justifyContent: 'center',
    },
    header: {
        textAlign: 'center',
    },
});

export default memo(Header);
