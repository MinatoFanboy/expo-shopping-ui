import React, { FC } from 'react';

/** React Native */
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

/** Router */
import { useRouter } from 'expo-router';

/** App Components */
import ThemedText from './common/ThemedText';
import Icon from './common/Icon';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Constants */
import { imageMap } from '@/constants/Constants';

/** Dimension */
import { hp } from '@/helpers/common';

interface ProductProps {
    product: { id: number; image: string; price: string; title: string; type: string };
    style?: StyleProp<ViewStyle>;
}

const Product: FC<ProductProps> = ({ product, style }) => {
    const iconColor = useThemeColor({}, 'text2');
    const backgroundColor = useThemeColor({}, 'background1');

    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                router.push({ pathname: '/productDetail', params: { productId: product.id } });
            }}
            style={[styles.container, { backgroundColor }, style]}
        >
            <Image resizeMode={'cover'} source={imageMap[product.image]} style={styles.thumbnail} />

            <View style={{ gap: 5 }}>
                <ThemedText bold type={'body2'}>
                    {product.title}
                </ThemedText>

                <ThemedText color={'text2'} type={'caption'}>
                    {product.type}
                </ThemedText>

                <ThemedText bold type={'body2'}>
                    {product.price}
                </ThemedText>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.favorite}>
                <Icon color={iconColor} name={'heart'} size={18} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        elevation: 24,
        gap: 10,
        padding: 10,
        shadowColor: GlobalColors.black,
        shadowOffset: {
            height: 24,
            width: 16,
        },
        shadowOpacity: 0.1,
        shadowRadius: 24,
    },
    favorite: {
        alignItems: 'center',
        height: 34,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
        width: 34,
    },
    thumbnail: {
        height: hp(22),
        width: '100%',
    },
});

export default Product;
