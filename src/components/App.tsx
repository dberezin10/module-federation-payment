import React from 'react';
import Payment from "@/components/Payment";
import { CurrentPage, Layout } from "@dberezin10/packages/shared/src/components";

const App = () => {
    return (
        <>
            <Layout>
                <CurrentPage />
                <Payment />
            </Layout>
        </>
    );
};

export default App;