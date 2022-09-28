import {CommandLineIcon, UserIcon } from "@heroicons/react/24/outline";
import EditProfile from "./pages/EditProfile";
import Theme from "./pages/AppSettings";


export const settingsList = [
  {title:"Edit Profile", Icon:UserIcon, to:"edit-profile"},
  {title:"App", Icon:CommandLineIcon, to:"app"}
]

export const settingsRoutes = [
  {
    path:"edit-profile",
    component:EditProfile,
  },
  {
    path:"app",
    component:Theme,
  },
]