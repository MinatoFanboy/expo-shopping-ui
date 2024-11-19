import React, { FC } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/Text';
import TextInput from '@/components/common/TextInput';
import ThemedView from '@/components/common/View';

import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const CheckoutScreen: FC = () => {
    return (
        <Container
            footer={
                <View style={{ paddingHorizontal: 20 }}>
                    <Button title={'Pay Now'} />
                </View>
            }
            header={<Header title={'Checkout'} />}
            keyboard
        >
            <View style={styles.container}>
                <View style={styles.row}>
                    <ThemedText bold>Shipping Address</ThemedText>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={12}>
                        <Icon name={'edit'} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowCenter}>
                    <View style={[styles.icon, { backgroundColor: GlobalColors.primary }]}>
                        <Icon color={GlobalColors.white} name={'location'} size={24} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <ThemedText type={'body2'}>Home</ThemedText>
                        <ThemedText semibold type={'body2'}>
                            1901 Thornridge Cir. Shiloh, Hawaii 81063
                        </ThemedText>
                    </View>
                </View>

                <ThemedView background={'background2'} style={{ height: 1 }} />

                <View style={styles.rowCenter}>
                    <View style={[styles.icon, { backgroundColor: GlobalColors.primary }]}>
                        <Icon color={GlobalColors.white} name={'card'} size={24} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <ThemedText>Dabit/Credit Card</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
                        <Icon color={GlobalColors.primary} name={'add-circle'} size={18} />
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 16 }}>
                    <TextInput
                        containerStyle={{ borderRadius: 999 }}
                        inputMode={'numeric'}
                        keyboardType={'numeric'}
                        placeholder={'Card Number'}
                    />

                    <View style={styles.input}>
                        <TextInput
                            containerStyle={{ borderRadius: 999 }}
                            placeholder={'Expiry Date'}
                            wrapperStyle={{ flex: 1 }}
                        />
                        <TextInput
                            containerStyle={{ borderRadius: 999 }}
                            inputMode={'numeric'}
                            keyboardType={'numeric'}
                            maxLength={3}
                            placeholder={'CVV'}
                            wrapperStyle={{ flex: 1 }}
                        />
                    </View>

                    <ThemedView background={'background2'} style={{ height: 1 }} />

                    <View style={styles.rowCenter}>
                        <ThemedView background={'background2'} style={styles.icon}>
                            <Image
                                resizeMode={'contain'}
                                source={require('@/assets/images/logo/paypal.png')}
                                style={styles.logo}
                            />
                        </ThemedView>

                        <View style={{ flex: 1 }}>
                            <ThemedText>Paypal</ThemedText>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} hitSlop={8}>
                            <Icon color={GlobalColors.primary} name={'add-circle'} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingVertical: 20,
    },
    icon: {
        alignItems: 'center',
        borderRadius: 999,
        height: 44,
        justifyContent: 'center',
        width: 44,
    },
    input: {
        flexDirection: 'row',
        gap: 17,
    },
    logo: {
        height: 28,
        width: 28,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
    },
});

export default CheckoutScreen;
