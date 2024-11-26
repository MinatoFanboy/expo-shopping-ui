import React, { FC, useEffect } from 'react';

/** React Native */
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

/** Router */
import { useNavigation, useRouter } from 'expo-router';

/** App Components */
import Container from '@/components/common/Container';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/ThemedText';

/** Home Components */
import Brands from '@/components/Brands';
import Categories from '@/components/Categories';
import Filter from '@/components/Filter';
import PopularProduct from '@/components/PopularProduct';

/** Hook App Theme */
import { useThemeColor } from '@/hooks/useThemeColor';

const HomeScreen: FC = () => {
    const navigation = useNavigation();
    const router = useRouter();

    const backgroundColor = useThemeColor({}, 'input');
    const placeholderColor = useThemeColor({}, 'placeholder');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            navigation.setOptions({ gestureEnabled: false });
        });

        return unsubscribe;
    }, []);

    return (
        <Container scroll style={{ paddingBottom: 20 }}>
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
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/search')}
                    style={[styles.searchButton, { backgroundColor }]}
                >
                    <Icon color={placeholderColor} name={'search-normal'} size={24} />

                    <ThemedText style={{ color: placeholderColor }}>{'Search'}</ThemedText>
                </TouchableOpacity>

                {/** Filter */}
                <Filter />
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
