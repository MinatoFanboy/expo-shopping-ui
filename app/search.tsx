import React, { FC } from 'react';

/** App Components */
import Container from '@/components/common/Container';
import Header from '@/components/Header';
import TextInput from '@/components/common/TextInput';

const SearchPage: FC = () => {
    return (
        <Container header={<Header />} scroll>
            {/** Greeting */}
            <TextInput icon={'search-normal'} placeholder={'Search'} />
        </Container>
    );
};

export default SearchPage;
