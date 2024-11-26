import React, { FC, useCallback } from 'react';

/** React Native */
import { StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';

import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

const ShippingAddressScreen: FC = () => {
    const router = useRouter();

    const borderColor = useThemeColor({}, 'background2');

    const onNext = useCallback(() => {
        router.push('/orderSummary');
    }, []);

    return (
        <Container
            footer={
                <View style={{ paddingHorizontal: 20 }}>
                    <Button onPress={() => onNext()} title={'Select Address'} />

                    <Button icon={<Icon color={'white'} name={'add'} size={24} />} style={styles.add} />
                </View>
            }
            header={<Header title={'Select Address'} />}
            scroll
        >
            <View style={styles.container}>
                <ThemedText bold>Shipping Address</ThemedText>

                <ThemedView style={styles.shippingItem}>
                    <ThemedView style={[styles.radio, { borderColor: GlobalColors.primary }]}>
                        <View style={[styles.radioActive, { backgroundColor: GlobalColors.primary }]} />
                    </ThemedView>

                    <View style={{ flex: 1, gap: 7 }}>
                        <ThemedText bold>Home</ThemedText>
                        <ThemedText type={'body2'}>1901 Thornridge Cir. Shiloh, Hawaii 81063</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
                        <Icon name={'more'} size={24} style={{ transform: [{ rotate: '90deg' }] }} />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.shippingItem}>
                    <ThemedView style={[styles.radio, { borderColor }]} />

                    <View style={{ flex: 1, gap: 7 }}>
                        <ThemedText bold>Work</ThemedText>
                        <ThemedText type={'body2'}>2118 Thornridge Cir. Syracuse, Connectiut 35624</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
                        <Icon name={'more'} size={24} style={{ transform: [{ rotate: '90deg' }] }} />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedView style={styles.shippingItem}>
                    <ThemedView style={[styles.radio, { borderColor }]} />

                    <View style={{ flex: 1, gap: 7 }}>
                        <ThemedText bold>Other</ThemedText>
                        <ThemedText type={'body2'}>2972 Westheimer Rd. Santa Ana, Illinois 8486</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
                        <Icon name={'more'} size={24} style={{ transform: [{ rotate: '90deg' }] }} />
                    </TouchableOpacity>
                </ThemedView>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    add: {
        borderRadius: 999,
        right: 20,
        position: 'absolute',
        top: -87,
        width: 56,
    },
    container: {
        flex: 1,
        gap: 20,
        paddingVertical: 20,
    },
    radio: {
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 2,
        height: 24,
        justifyContent: 'center',
        width: 24,
    },
    radioActive: {
        borderRadius: 999,
        height: 16,
        width: 16,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shippingItem: {
        borderRadius: 12,
        flexDirection: 'row',
        elevation: 24,
        gap: 12,
        padding: 12,
        shadowColor: GlobalColors.black,
        shadowOffset: {
            height: 24,
            width: 16,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
    },
});

export default ShippingAddressScreen;
