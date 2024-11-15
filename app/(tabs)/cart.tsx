import React, { FC } from 'react';

/** React Native */
import { Text } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';

const CartScreen: FC = () => {
    return (
        <Container scroll>
            <Text>Cart Page</Text>
        </Container>
    );
};

export default CartScreen;
