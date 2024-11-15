import React, { FC } from 'react';

/** React Native */
import { Image, ImageRequireSource, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

/** App Components */
import ThemedText from './common/Text';
import Icon from './common/Icon';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** Hook Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** Dimension */
import { hp } from '@/helpers/common';

interface ProductProps {
    product: { image: ImageRequireSource; price: string; title: string; type: string };
    style?: StyleProp<ViewStyle>;
}

const Product: FC<ProductProps> = ({ product, style }) => {
    const iconColor = useThemeColor({}, 'text2');
    const backgroundColor = useThemeColor({}, 'background2');

    return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.container, { backgroundColor }, style]}>
            <Image resizeMode={'cover'} source={product.image} style={styles.thumbnail} />

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
        shadowOpacity: 0.15,
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
        height: hp(24),
        width: '100%',
    },
});

export default Product;
