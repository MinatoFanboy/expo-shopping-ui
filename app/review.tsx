import React, { FC, Fragment } from 'react';

/** React Native */
import { FlatList, Image, StyleSheet, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Ratings from '@/components/common/Ratings';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';

import Header from '@/components/Header';

/** Constants */
import { imageMap } from '@/constants/Constants';

/** DATA */
import reviewData from '@/mocks/review.json';

const ReviewItem: FC<{ review: any }> = ({ review }) => {
    return (
        <View style={styles.reviewItem}>
            <View style={styles.reviewTitle}>
                <Image source={imageMap[review.avatar]} style={styles.avatar} />

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
                                source={imageMap[item]}
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
                data={reviewData}
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
