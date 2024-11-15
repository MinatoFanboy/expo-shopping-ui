import React, { FC, useEffect } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useNavigation } from 'expo-router';

/** App Components */
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/Text';

/** Home Components */
import Brands from '@/components/Brands';
import Categories from '@/components/Categories';
import PopularProduct from '@/components/PopularProduct';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

const HomeScreen: FC = () => {
    const navigation = useNavigation();

    const backgroundColor = useThemeColor({}, 'input');
    const placeholderColor = useThemeColor({}, 'placeholder');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({ gestureEnabled: false });
        });

        return unsubscribe;
    }, []);

    return (
        <Container scroll>
            {/** Greeting */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <ThemedText type={'body2'}>Hey 👋</ThemedText>

                    <ThemedText bold type={'header4'}>
                        Let's find your Exclusive Outfit
                    </ThemedText>
                </View>

                <Image
                    resizeMode={'cover'}
                    source={require('@/assets/images/avatar/avatar-1.jpg')}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.search}>
                <TouchableOpacity activeOpacity={0.7} style={[styles.searchButton, { backgroundColor }]}>
                    <Icon color={placeholderColor} name={'search-normal'} size={24} />

                    <ThemedText style={{ color: placeholderColor }}>{'Search'}</ThemedText>
                </TouchableOpacity>

                {/** Filter */}
                <Button icon={<Icon color={'white'} name={'setting-1'} size={24} />} style={styles.filter} />
            </View>

            <View style={{ marginTop: 20 }}>
                <Categories />
            </View>

            <View style={{ marginTop: 30 }}>
                <Brands />
            </View>

            <View style={{ marginTop: 32 }}>
                <PopularProduct />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 999,
        height: 40,
        width: 40,
    },
    filter: {
        borderRadius: 12,
        width: 56,
    },
    header: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: 30,
    },
    headerLeft: {
        flex: 1,
        gap: 16,
    },
    search: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 12,
    },
    searchButton: {
        alignItems: 'center',
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        gap: 12,
        height: 56,
        paddingHorizontal: 20,
    },
});

export default HomeScreen;
