import { BellIcon, ChatAlt2Icon, CogIcon, GlobeIcon, UserGroupIcon, UserIcon, UsersIcon, ViewGridIcon } from "@heroicons/react/outline";

interface INavOptions{
  icon:any,
  title:string,
  path:string
}
export const navOptions:INavOptions[] = [
  {
    icon:ViewGridIcon,
    title:"Feed",
    path:"/"
  },
  {
    icon:UsersIcon,
    title:"Friends",
    path:"/friends"
  },
  {
    icon:ChatAlt2Icon,
    title:"Messages",
    path:"/messages"
  },
  {
    icon:UserGroupIcon,
    title:"My community",
    path:"/my-community"
  },
  {
    icon:BellIcon,
    title:"Notification",
    path:"/notification"
  },
  {
    icon:GlobeIcon,
    title:"Explore",
    path:"/explore"
  },
  {
    icon:UserIcon,
    title:"Profile",
    path:"/profile"
  },
  {
    icon:CogIcon,
    title:"Settings",
    path:"/settings"
  },

]