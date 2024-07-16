
import { CurrentPage, Layout } from "@dberezin10/packages/shared/src/components";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Payment from "./Payment.tsx";

function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/payment" element={ <Layout>
                <CurrentPage />
                <Payment />
            </Layout>} />


        </Routes>

    </BrowserRouter>
  )
}

export default App
