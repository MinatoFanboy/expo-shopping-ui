import React, { FC } from 'react';

/** React Native */
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** Swipe List */
import { SwipeListView } from 'react-native-swipe-list-view';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/Text';
import ThemedView from '@/components/common/View';

import Header from '@/components/Header';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Colors */
import { useThemeColor } from '@/hooks/useThemeColor';

const carts = [
    {
        id: 1,
        image: require('@/assets/images/product/product-1.png'),
        key: 0,
        price: '$250',
        quantity: 1,
        size: 'L',
        title: 'Dennis Lingo',
        type: 'Hazy Rose',
    },
    {
        id: 2,
        image: require('@/assets/images/product/product-5.png'),
        key: 1,
        price: '$200',
        quantity: 1,
        size: 'L',
        title: 'Red Cotton Shirt',
        type: 'Hazy Rose',
    },
    {
        id: 3,
        image: require('@/assets/images/product/product-8.png'),
        key: 2,
        price: '$280',
        quantity: 1,
        size: 'L',
        title: 'Leather Jacket',
        type: 'Hazy Rose',
    },
];

const CartScreen: FC = () => {
    const placeholderColor = useThemeColor({}, 'placeholder');

    const router = useRouter();

    const onRemoveCart = (rowMap: any, rowKey: any) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    return (
        <Container header={<Header title={'My Cart'} />} keyboard style={{ paddingHorizontal: 0 }}>
            <SwipeListView
                contentContainerStyle={styles.container}
                data={carts}
                leftOpenValue={0}
                renderItem={(data, rowMap) => (
                    <ThemedView style={styles.cartItem}>
                        <ThemedView background={'background2'} style={styles.cartImage}>
                            <Image resizeMode={'contain'} source={data.item.image} style={styles.cartImage} />
                        </ThemedView>

                        <View style={{ flex: 1, gap: 2 }}>
                            <ThemedText bold type={'body2'}>
                                {data.item.title}
                            </ThemedText>
                            <ThemedText type={'body2'}>{`Size: ${data.item.size}`}</ThemedText>

                            <View style={styles.row}>
                                <ThemedText bold type={'body2'}>{`Size: ${data.item.price}`}</ThemedText>

                                <View style={styles.changeCart}>
                                    <TouchableOpacity activeOpacity={0.7} hitSlop={4}>
                                        <Icon color={GlobalColors.primary} name={'minus-cirlce'} size={22} />
                                    </TouchableOpacity>

                                    <View style={styles.quantity}>
                                        <ThemedText bold type={'caption'}>
                                            {data.item.quantity}
                                        </ThemedText>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.7} hitSlop={4}>
                                        <Icon color={GlobalColors.primary} name={'add-circle'} size={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ThemedView>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.hidden}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => onRemoveCart(rowMap, data.item.key)}
                            style={styles.delete}
                        >
                            <Icon color={GlobalColors.white} name={'trash'} size={24} />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-44}
                style={{ flex: 1 }}
            />

            <View style={styles.info}>
                {/** Coupon */}
                <ThemedView background={'background2'} style={styles.coupon}>
                    <View style={styles.inputWrapper}>
                        <Icon name={'discount-circle'} size={24} />

                        <TextInput
                            hitSlop={{ bottom: 12, top: 12 }}
                            placeholder={'Enter Promocode'}
                            placeholderTextColor={placeholderColor}
                            style={styles.input}
                        />
                    </View>

                    <Button style={styles.apply} title={'Apply'} />
                </ThemedView>

                {/** Info */}
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

                <Button onPress={() => router.push('/checkout')} style={{ marginTop: 33 }} title={'Checkout'} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    apply: {
        paddingHorizontal: 31,
        width: undefined,
    },
    cartItem: {
        alignItems: 'center',
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
    cartImage: {
        borderRadius: 10,
        height: 72,
        width: 72,
    },
    changeCart: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        gap: 20,
        padding: 20,
    },
    coupon: {
        borderRadius: 999,
        flexDirection: 'row',
    },
    delete: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: 44,
    },
    hidden: {
        backgroundColor: GlobalColors.error,
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        height: 96,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    info: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    inputWrapper: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 13,
    },
    quantity: {
        alignItems: 'center',
        height: 22,
        justifyContent: 'center',
        width: 22,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separate: {
        height: 1,
        marginVertical: 17,
    },
    shipping: {
        gap: 10,
        marginTop: 20,
    },
});

export default CartScreen;
