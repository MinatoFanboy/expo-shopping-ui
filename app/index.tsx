import React, { FC } from 'react';

/** React Native */
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/** App Components */
import ThemedView from '@/components/common/View';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const index: FC = () => {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.center}>
                <ActivityIndicator color={GlobalColors.primary} size={'large'} />
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});

export default index;
