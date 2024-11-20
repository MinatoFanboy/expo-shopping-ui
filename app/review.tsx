import React, { FC, Fragment } from 'react';

/** React Native */
import { FlatList, Image, StyleSheet, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Ratings from '@/components/common/Ratings';
import ThemedText from '@/components/common/Text';
import ThemedView from '@/components/common/View';

import Header from '@/components/Header';

const reviews = [
    {
        attachment: [require('@/assets/images/review/review-1.jpg'), require('@/assets/images/review/review-2.jpg')],
        avatar: require('@/assets/images/avatar/avatar-2.jpg'),
        description:
            'It is a long established fact that a reader will be distracted by the readable content of a page whe looking at its layout.',
        date: '05 May, 2021',
        id: 1,
        name: 'Ketty Perry',
        rate: 5,
    },
    {
        attachment: [require('@/assets/images/review/review-3.jpg'), require('@/assets/images/review/review-4.jpg')],
        avatar: require('@/assets/images/avatar/avatar-3.jpg'),
        description:
            'It is a long established fact that a reader will be distracted by the readable content of a page whe looking at its layout.',
        date: '04 May, 2021',
        id: 2,
        name: 'Johnson Mark',
        rate: 5,
    },
    {
        attachment: [require('@/assets/images/review/review-5.jpg')],
        avatar: require('@/assets/images/avatar/avatar-4.jpg'),
        description:
            'It is a long established fact that a reader will be distracted by the readable content of a page whe looking at its layout.',
        date: '04 May, 2021',
        id: 3,
        name: 'Pinakle Mate',
        rate: 5,
    },
];

const ReviewItem: FC<{ review: any }> = ({ review }) => {
    return (
        <View style={styles.reviewItem}>
            <View style={styles.reviewTitle}>
                <Image source={review.avatar} style={styles.avatar} />

                <View style={{ flex: 1, gap: 10 }}>
                    <View style={styles.row}>
                        <View style={{ gap: 5 }}>
                            <ThemedText>{review.name}</ThemedText>
                            <ThemedText color={'text2'} type={'label'}>
                                {review.date}
                            </ThemedText>
                        </View>

                        <Ratings rate={5} showText={false} size={20} />
                    </View>

                    <ThemedText type={'body2'}>{review.description}</ThemedText>

                    <View style={styles.attachment}>
                        {review.attachment.map((item: any, index: number) => (
                            <Image
                                key={`Attachment-${review.id}-${index}`}
                                resizeMode={'cover'}
                                source={item}
                                style={styles.attachmentImage}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const ReviewCreateScreen: FC = () => {
    return (
        <Container header={<Header title={'Reviews'} />} style={{ paddingHorizontal: 0 }}>
            <FlatList
                contentContainerStyle={{ gap: 20, padding: 20 }}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <ThemedText bold style={{ fontSize: 34 }} type={'header3'}>
                            4.2
                        </ThemedText>

                        <View style={styles.headerRight}>
                            <Ratings rate={4.2} showText={false} size={24} solid />

                            <ThemedText color={'text2'} type={'label'}>
                                120 Reviews
                            </ThemedText>
                        </View>
                    </View>
                }
                data={reviews}
                keyExtractor={(item) => `Review-${item.id}`}
                renderItem={({ item }) => (
                    <Fragment>
                        <ReviewItem review={item} />

                        <ThemedView background={'background2'} style={styles.separate} />
                    </Fragment>
                )}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    attachment: {
        flexDirection: 'row',
        gap: 10,
    },
    attachmentImage: {
        borderRadius: 10,
        height: 62,
        width: 70,
    },
    avatar: {
        borderRadius: 10,
        height: 40,
        width: 40,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
    },
    headerRight: {
        flex: 1,
        gap: 5,
    },
    reviewItem: {
        paddingVertical: 11,
    },
    reviewTitle: {
        flexDirection: 'row',
        gap: 10,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separate: {
        height: 1,
        marginTop: 16,
    },
});

export default ReviewCreateScreen;
