import React, { FC } from 'react';

/** React Native */
import { View } from 'react-native';

/** App Components */
import Container from '@/components/common/Container';
import Header from '@/components/Header';
import ThemedText from '@/components/common/ThemedText';

/** App Colors */
import { GlobalColors } from '@/constants/Colors';

const TermScreen: FC = () => {
    return (
        <Container header={<Header title={'Terms & Conditions'} />} scroll style={{ gap: 28, paddingVertical: 20 }}>
            <View style={{ gap: 12 }}>
                <ThemedText color={'text2'} type={'body2'}>
                    Last update: 05/02/2023
                </ThemedText>
                <ThemedText>
                    Please read these terms of service, carefully before using our app operated by us.
                </ThemedText>
            </View>

            <View style={{ gap: 12 }}>
                <ThemedText bold style={{ color: GlobalColors.primary }}>
                    Conditions of Uses
                </ThemedText>
                <ThemedText type={'body2'}>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using ‘Content here, content here, making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for ‘lorem ipsum’ will uncover many websites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
                    (injected humour and the like).
                </ThemedText>
            </View>
        </Container>
    );
};

export default TermScreen;
