import React, { FC } from 'react';

/** React Native */
import { SectionList, StyleSheet, View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Header from '@/components/Header';
import Icon from '@/components/common/Icon';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

/** DATA */
import notificationData from '@/mocks/notification.json';

const NotificationScreen: FC = () => {
    const getIcon = (icon: string) => {
        switch (icon) {
            case 'discount':
                return 'receipt-disscount';

            case 'notify':
                return 'timer';

            case 'sale':
                return 'discount-circle';

            default:
                return '';
        }
    };

    return (
        <Container header={<Header title={'Notifications'} />} style={{ paddingHorizontal: 0 }}>
            <SectionList
                contentContainerStyle={{ gap: 15, padding: 20 }}
                sections={notificationData}
                keyExtractor={(item, index) => `Notificaton-${item.id + index}`}
                renderItem={({ item }) => (
                    <View style={{ gap: 15 }}>
                        <View style={styles.item}>
                            <ThemedView background={'background3'} style={styles.icon}>
                                <Icon color={GlobalColors.primary} name={getIcon(item.type)} size={24} />
                            </ThemedView>

                            <View style={{ flex: 1, gap: 6 }}>
                                <ThemedText>{item.title}</ThemedText>
                                <ThemedText color={'text2'} type={'body2'}>
                                    {item.desc}
                                </ThemedText>
                            </View>
                        </View>

                        <ThemedView background={'background2'} style={{ height: 1 }} />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => <ThemedText type={'body2'}>{title}</ThemedText>}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        borderRadius: 999,
        height: 55,
        justifyContent: 'center',
        width: 55,
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },
});

export default NotificationScreen;
