import {createBrowserRouter} from "react-router-dom";

import Payment from "../components/Payment.tsx";


const routes = [
  {
    path: '/payment',
    element: <Payment/>,
  }
]

export const router = createBrowserRouter(routes);

export default routes
