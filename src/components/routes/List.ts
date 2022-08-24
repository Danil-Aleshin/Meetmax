import MyCommunity from "../pages/myCommunity/MyCommunity";
import Home from "../pages/home/Home";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";
import Authentication from "../pages/signIn/Authentication";
import Registration from "../pages/signIn/Registration";
import Friends from "../pages/friends/Friends";
import Notification from "../pages/notification/Notification";



interface IRoute{
  path: string,
  component: React.FC,
  auth: boolean,
}

export const routes:IRoute[] = [
  {
    path:'/',
    component:Home,
    auth:true,
  },
  {
    path:"/login",
    component:Authentication,
    auth:false,
  },
  {
    path:"/registration",
    component:Registration,
    auth:false,
  },
  {
    path:"/messages",
    component:Messages,
    auth:true,
  },
  {
    path:"/:id",
    component:Profile,
    auth:true,
  },
  {
    path:"/my-community",
    component:MyCommunity,
    auth:true,
  },
  {
    path:"/notification",
    component:Notification,
    auth:true,
  },
  {
    path:"*",
    component:Home,
    auth:true,
  },
]