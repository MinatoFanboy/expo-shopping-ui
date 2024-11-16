import React, { FC } from 'react';

/** React Native */
import { StyleSheet, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import ThemedText from '@/components/common/Text';
import TextButton from '@/components/common/TextButton';
import TextInput from '@/components/common/TextInput';

import Header from '@/components/Header';
import PopularProduct from '@/components/PopularProduct';
import Tag from '@/components/Tag';

const SearchPage: FC = () => {
    return (
        <Container header={<Header />} scroll>
            {/** Greeting */}
            <View style={{ marginTop: 20 }}>
                <TextInput icon={'search-normal'} placeholder={'Search'} />
            </View>

            {/** Recently */}
            <View style={styles.recently}>
                <ThemedText bold>Recently Search</ThemedText>

                <TextButton hitSlop={8} title={'Clear'} />
            </View>

            {/** Search Recently */}
            <View style={styles.tags}>
                <Tag title={'Fancy T-shirt'} />
                <Tag title={'Danim Jacket'} />
                <Tag title={'One Piece'} />
                <Tag title={'Marks & Spencer'} />
            </View>

            {/** Popular Products */}
            <View style={{ marginTop: 32 }}>
                <PopularProduct limit={2} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    recently: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
});

export default SearchPage;
