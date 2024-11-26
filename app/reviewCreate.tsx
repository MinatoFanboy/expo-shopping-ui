import React, { FC, useCallback } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import Textarea from '@/components/common/Textarea';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';

import Header from '@/components/Header';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const ReviewCreateScreen: FC = () => {
    const borderColor = useThemeColor({}, 'border');

    const onSubmit = useCallback(() => {}, []);

    return (
        <Container
            footer={
                <View style={styles.footer}>
                    <Button onPress={onSubmit} title={'Submit Review'} />
                </View>
            }
            header={<Header title={'Write a Review'} />}
            keyboard
        >
            <View style={styles.container}>
                <ThemedView background={'background3'} style={styles.thumbnail}>
                    <Image
                        resizeMode={'contain'}
                        source={require('@/assets/images/product/product-1.png')}
                        style={styles.image}
                    />

                    <View style={{ flex: 1, gap: 5 }}>
                        <ThemedText bold>Dennis Lingo</ThemedText>
                        <ThemedText type={'body2'}>Dennis Lingo</ThemedText>
                        <ThemedText bold type={'body2'}>
                            $250
                        </ThemedText>
                    </View>
                </ThemedView>

                <View style={{ gap: 10 }}>
                    <ThemedText bold>Add Photo or View</ThemedText>

                    <TouchableOpacity activeOpacity={0.7} style={[styles.buttonUpload, { borderColor }]}>
                        <Icon color={GlobalColors.primary} name={'export'} size={48} />

                        <ThemedText type={'body2'}>Click here to upload</ThemedText>
                    </TouchableOpacity>
                </View>

                <View style={{ gap: 10 }}>
                    <ThemedText bold>Write your Review</ThemedText>

                    <Textarea length={250} placeholder={'Write something about this product'} />
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    buttonUpload: {
        alignItems: 'center',
        borderStyle: 'dashed',
        borderRadius: 12,
        borderWidth: 2,
        borderCurve: 'circular',
        gap: 10,
        height: 119,
        justifyContent: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        gap: 20,
        paddingVertical: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    image: {
        height: 89,
        width: 89,
    },
    thumbnail: {
        alignItems: 'center',
        borderRadius: 16,
        flexDirection: 'row',
        gap: 9,
        padding: 10,
    },
});

export default ReviewCreateScreen;
