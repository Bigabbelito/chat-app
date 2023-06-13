import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddNewChannel from "./routes/AddChannel";
import ChatWindow from "./routes/Chat";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                path: '/',
                
            },
            {
                path: '/signin',
                element: <LoginForm/>
                
            },
            {
                path: '/signup',
                element: <SignupForm/>
                
            },
            {
                path: '/new-channel',
                element: <AddNewChannel/>
                
            },
            {
                path: 'channel/:id',
                element: <ChatWindow/>
                
            },

        ]
    }
])

export { router }