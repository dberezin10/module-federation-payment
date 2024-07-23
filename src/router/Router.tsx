import {createBrowserRouter} from "react-router-dom";
import App from "@/components/App";

const routes = [
  {
    path: '/payment',
    element: <App/>,
  }
]

export const router = createBrowserRouter(routes);

export default routes
