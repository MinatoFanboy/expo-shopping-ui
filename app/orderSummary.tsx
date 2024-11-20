import React, { FC, useCallback, useRef } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import Modal from '@/components/common/Modal';
import ThemedText from '@/components/common/Text';
import ThemedView from '@/components/common/View';

import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Colors */
import { useThemeColor } from '@/hooks/useThemeColor';

const orders = [
    {
        id: 1,
        image: require('@/assets/images/product/product-1.png'),
        price: '$250',
        quantity: 1,
        title: 'Dennis Lingo',
    },
    {
        id: 2,
        image: require('@/assets/images/product/product-5.png'),
        price: '$200',
        quantity: 1,
        title: 'Red Cotton Shirt',
    },
    {
        id: 3,
        image: require('@/assets/images/product/product-8.png'),
        price: '$280',
        quantity: 1,
        title: 'Leather Jacket',
    },
];

const OrderSummaryScreen: FC = () => {
    const backgroundColor = useThemeColor({}, 'background3');

    const router = useRouter();

    const modalRef = useRef<any>(null);

    const onBack = useCallback(() => {
        modalRef.current?.hide();

        router.push('/orderDetail');
    }, []);

    const onSubmit = useCallback(() => {
        modalRef.current?.show();
    }, []);

    return (
        <Container
            footer={
                <View style={styles.footer}>
                    <Button onPress={onSubmit} title={'Pay Now'} />
                </View>
            }
            header={<Header title={'Order Review'} />}
            scroll
        >
            <View style={styles.container}>
                <ThemedText bold>Item Details</ThemedText>

                {orders.map((order) => (
                    <View key={`OrderSummary-${order.id}`} style={styles.orderItem}>
                        <ThemedView background={'background2'} style={styles.orderImage}>
                            <Image resizeMode={'contain'} source={order.image} style={styles.orderImage} />
                        </ThemedView>

                        <View style={{ flex: 1, gap: 7 }}>
                            <ThemedText bold type={'body2'}>
                                {order.title}
                            </ThemedText>
                            <ThemedText type={'body2'}>{order.price}</ThemedText>
                            <ThemedText type={'body2'}>{`QTY: ${order.quantity}`}</ThemedText>
                        </View>
                    </View>
                ))}

                <ThemedView background={'background2'} style={styles.separate} />

                <ThemedText bold>Delivery Address</ThemedText>

                <ThemedView style={styles.shippingItem}>
                    <View style={{ flex: 1, gap: 7 }}>
                        <ThemedText bold>Smith Watson</ThemedText>
                        <ThemedText type={'body2'}>1901 Thornridge Cir. Shiloh, Hawaii 81063</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8} style={[styles.edit, { backgroundColor }]}>
                        <Icon name={'edit'} size={24} />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedText bold>Payment Detail</ThemedText>

                <ThemedView style={styles.shippingItem}>
                    <ThemedView background={'background2'} style={[styles.edit, styles.payment]}>
                        <Image
                            resizeMode={'contain'}
                            source={require('@/assets/images/logo/mastercard.png')}
                            style={styles.paymentIcon}
                        />
                    </ThemedView>

                    <View style={{ flex: 1, gap: 7 }}>
                        <ThemedText type={'body2'}>Smith Watson</ThemedText>
                        <ThemedText type={'body2'}>6895 7852 5898 4200</ThemedText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} hitSlop={8} style={[styles.edit, { backgroundColor }]}>
                        <Icon name={'edit'} size={24} />
                    </TouchableOpacity>
                </ThemedView>

                <ThemedText bold>Order Summary</ThemedText>

                <View style={styles.shipping}>
                    <View style={styles.row}>
                        <ThemedText type={'body2'}>Item Total</ThemedText>
                        <ThemedText type={'body2'}>$730</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText type={'body2'}>Discount</ThemedText>
                        <ThemedText type={'body2'}>$50</ThemedText>
                    </View>
                    <View style={styles.row}>
                        <ThemedText style={{ color: GlobalColors.primary }} type={'body2'}>
                            Delivery Time
                        </ThemedText>
                        <ThemedText style={{ color: GlobalColors.primary }} type={'body2'}>
                            Free
                        </ThemedText>
                    </View>
                </View>

                <ThemedView background={'background2'} style={styles.separate} />

                <View style={styles.row}>
                    <ThemedText bold type={'body1'}>
                        Grand Total
                    </ThemedText>
                    <ThemedText bold type={'body1'}>
                        $680
                    </ThemedText>
                </View>
            </View>

            <Modal ref={modalRef}>
                <View>
                    <View style={{ alignItems: 'center', gap: 20 }}>
                        <ThemedView background={'background3'} style={styles.circle}>
                            <ThemedView
                                style={[
                                    styles.circle,
                                    { backgroundColor: GlobalColors.primary, height: 90, width: 90 },
                                ]}
                            >
                                <Icon color={GlobalColors.white} name={'shopping-cart'} size={32} />
                            </ThemedView>
                        </ThemedView>

                        <View style={{ width: '70%' }}>
                            <ThemedText bold style={styles.textCenter} type={'header6'}>
                                Order Place Successfully
                            </ThemedText>
                        </View>

                        <View>
                            <ThemedText style={styles.textCenter} type={'body2'}>
                                You have successfully made order
                            </ThemedText>
                        </View>
                    </View>

                    <Button onPress={onBack} title={'View Order Status'} style={{ marginTop: 30 }} />
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingVertical: 20,
    },
    circle: {
        alignItems: 'center',
        borderRadius: 999,
        height: 130,
        justifyContent: 'center',
        width: 130,
    },
    edit: {
        alignItems: 'center',
        borderRadius: 9,
        height: 34,
        justifyContent: 'center',
        width: 34,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    orderItem: {
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',
        gap: 12,
    },
    orderImage: {
        borderRadius: 10,
        height: 77,
        width: 77,
    },
    payment: {
        height: 40,
        width: 40,
    },
    paymentIcon: {
        width: 24,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separate: {
        height: 1,
    },
    shippingItem: {
        borderRadius: 12,
        flexDirection: 'row',
        elevation: 24,
        gap: 12,
        padding: 20,
        shadowColor: GlobalColors.black,
        shadowOffset: {
            height: 24,
            width: 16,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
    },
    shipping: {
        gap: 10,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default OrderSummaryScreen;
