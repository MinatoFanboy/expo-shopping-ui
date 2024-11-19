import React, { FC } from 'react';

/** React Native */
import { Text } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';

const NotificationScreen: FC = () => {
    return (
        <Container scroll>
            <Text>Notification Page</Text>
        </Container>
    );
};

export default NotificationScreen;
