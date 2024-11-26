import React, { FC, useCallback } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import Ratings from '@/components/common/Ratings';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';

import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Constants */
import { imageMap } from '@/constants/Constants';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** DATA */
import orderData from '@/mocks/order.json';

const OrderDetailScreen: FC = () => {
    const backgroundColor = useThemeColor({}, 'background1');
    const reviewButtonColor = useThemeColor({}, 'background2');

    const router = useRouter();

    const handleCreateReview = useCallback(() => {
        router.push('/reviewCreate');
    }, []);

    const handleShowReview = useCallback(() => {
        router.push('/review');
    }, []);

    return (
        <Container
            footer={
                <View style={styles.footer}>
                    <Button
                        icon={<Icon color={GlobalColors.white} name={'import'} size={24} />}
                        title={'Download Invoice'}
                    />
                </View>
            }
            header={<Header title={'Order Details'} />}
            scroll
        >
            <View style={styles.container}>
                <View style={{ gap: 7 }}>
                    <ThemedText bold>Order ID: 89782345900</ThemedText>
                    <ThemedText type={'body2'}>Order Date: March 21, 2023</ThemedText>
                </View>

                {orderData.map((order) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={`OrderDetail-${order.id}`}
                        onPress={handleShowReview}
                        style={[styles.orderItem, { backgroundColor }]}
                    >
                        <View style={styles.rowCenter}>
                            <ThemedView background={'background2'} style={styles.orderImage}>
                                <Image
                                    resizeMode={'contain'}
                                    source={imageMap[order.image]}
                                    style={styles.orderImage}
                                />
                            </ThemedView>

                            <View style={{ flex: 1, gap: 7 }}>
                                <ThemedText bold type={'body2'}>
                                    {order.title}
                                </ThemedText>
                                <ThemedText type={'body2'}>{order.price}</ThemedText>
                                <View style={styles.row}>
                                    <ThemedText type={'body2'}>{`QTY: ${order.quantity}`}</ThemedText>

                                    <ThemedView background={'background3'} style={styles.status}>
                                        <ThemedText style={{ color: GlobalColors.primary }} type={'caption'}>
                                            Delivered
                                        </ThemedText>
                                    </ThemedView>
                                </View>
                            </View>
                        </View>

                        <View style={styles.rowCenter}>
                            <Button
                                style={styles.button}
                                title={'Reorder'}
                                titleStyle={{ fontSize: 14, lineHeight: 20 }}
                            />

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleCreateReview}
                                style={[styles.button, { backgroundColor: reviewButtonColor }]}
                            >
                                <ThemedText type={'body2'}>Write a Review</ThemedText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <ThemedText bold type={'body2'}>
                                Your Ratings
                            </ThemedText>

                            <Ratings rate={5} showText={false} size={24} />
                        </View>
                    </TouchableOpacity>
                ))}

                <ThemedView background={'background2'} style={styles.separate} />

                <View style={{ gap: 12 }}>
                    <ThemedText bold>Delivery Address</ThemedText>

                    <ThemedText type={'body2'}>1901 Thornridge Cir. Shiloh, Hawaii 81063</ThemedText>
                </View>

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
        </Container>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderRadius: 7,
        flex: 1,
        justifyContent: 'center',
        height: 40,
    },
    circle: {
        alignItems: 'center',
        borderRadius: 999,
        height: 130,
        justifyContent: 'center',
        width: 130,
    },
    container: {
        flex: 1,
        gap: 20,
        paddingVertical: 20,
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
        borderRadius: 12,
        elevation: 24,
        gap: 19,
        padding: 16,
        shadowColor: GlobalColors.black,
        shadowOffset: {
            height: 24,
            width: 16,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
    },
    orderImage: {
        borderRadius: 10,
        height: 72,
        width: 72,
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
    rowCenter: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
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
    status: {
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    textCenter: {
        textAlign: 'center',
    },
});

export default OrderDetailScreen;
