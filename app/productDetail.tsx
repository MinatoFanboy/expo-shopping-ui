import React, { FC, useState } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useLocalSearchParams } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import Ratings from '@/components/common/Ratings';

import AnimatedText from '@/components/AnimatedText';
import ParallaxContainer from '@/components/ParallaxContainer';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const ProductDetailPage: FC = () => {
    const { productId } = useLocalSearchParams();

    const backgroundColor = useThemeColor({}, 'background3');
    const borderColor = useThemeColor({}, 'border');

    const [startLoading, setStartLoading] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);

    if (startLoading) {
        return (
            <View style={styles.center}>
                <Loading />
            </View>
        );
    }

    return (
        <ParallaxContainer
            footer={
                <ThemedView style={styles.footer}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.favorite, { backgroundColor }]}>
                        <Icon color={GlobalColors.primary} name={'heart'} size={24} />
                    </TouchableOpacity>

                    <Button
                        icon={<Icon color={GlobalColors.white} name={'shopping-cart'} size={24} />}
                        style={{ flex: 1 }}
                        title={'Add to Cart'}
                    />
                </ThemedView>
            }
            style={{ paddingHorizontal: 0 }}
            title={'Product Detail'}
        >
            {/** Image */}
            <ThemedView background={'background3'} style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Image
                        resizeMode={'contain'}
                        source={require('@/assets/images/product/product-1.png')}
                        style={styles.avatar}
                    />
                </View>
            </ThemedView>

            <ThemedView style={{ padding: 20 }}>
                {/** Ratings & Add to cart */}
                <View style={styles.row}>
                    <Ratings rate={4.5} />

                    <View style={[styles.addToCart, { borderColor: GlobalColors.primary }]}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            hitSlop={4}
                            onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        >
                            <Icon color={GlobalColors.primary} name={'minus'} size={24} />
                        </TouchableOpacity>

                        <View style={styles.quantity}>
                            <ThemedText bold type={'body2'}>
                                {quantity}
                            </ThemedText>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            hitSlop={4}
                            onPress={() => setQuantity((prev) => prev + 1)}
                        >
                            <Icon color={GlobalColors.primary} name={'add'} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ThemedText bold type={'header6'} style={{ marginTop: 8 }}>
                    Dennis Lingo
                </ThemedText>

                <ThemedText bold type={'header6'} style={{ marginTop: 5 }}>
                    $250
                </ThemedText>

                <ThemedView background={'background2'} style={styles.separate} />

                <ThemedText bold>Description</ThemedText>

                <AnimatedText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae scelerisque sem, et accumsan
                    quam. Etiam non dolor et lectus lacinia tincidunt in ut tellus. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia curae; Aliquam mollis consequat nulla, sed aliquet
                    est gravida a. Nunc ultricies turpis eget lectus iaculis, eget maximus lacus convallis. Duis euismod
                    est id diam tristique, a pharetra elit euismod. Sed aliquam, nibh sed fermentum congue, justo augue
                    ullamcorper tellus, vitae euismod velit mi id ipsum. Aenean vel turpis facilisis erat tempus semper
                    eu vel urna. Duis quis ultricies sapien, non luctus urna. Curabitur hendrerit tortor ut elit laoreet
                    ultricies. Praesent non varius mi. Sed vel aliquam felis.
                </AnimatedText>

                <ThemedView background={'background2'} style={styles.separate} />

                <ThemedText bold>Select Size</ThemedText>

                <View style={styles.size}>
                    {['S', 'M', 'L', 'XL'].map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={`Size-${index}`}
                            style={[
                                styles.sizeItem,
                                { borderColor },
                                index === 2 && {
                                    backgroundColor: GlobalColors.primary,
                                    borderColor: GlobalColors.primary,
                                },
                            ]}
                        >
                            <ThemedText style={index === 2 && { color: GlobalColors.white }}>{item}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ThemedView>
        </ParallaxContainer>
    );
};

const styles = StyleSheet.create({
    addToCart: {
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        height: 32,
        paddingHorizontal: 4,
    },
    avatar: {
        height: '100%',
        bottom: -36,
    },
    center: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    favorite: {
        alignItems: 'center',
        borderRadius: 999,
        height: 56,
        justifyContent: 'center',
        width: 56,
    },
    footer: {
        flexDirection: 'row',
        gap: 10,
        paddingBottom: 34,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        aspectRatio: 1,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: 'hidden',
        width: '100%',
    },
    quantity: {
        alignItems: 'center',
        height: 24,
        justifyContent: 'center',
        width: 24,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separate: {
        height: 1,
        marginVertical: 16,
    },
    size: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 12,
    },
    sizeItem: {
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
});

export default ProductDetailPage;
