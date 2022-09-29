import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, UserGroupIcon, RectangleGroupIcon, UsersIcon } from "@heroicons/react/24/outline";

interface INavOptions{
  icon:any,
  title:string,
  path:string
}

export const navOptions:INavOptions[] = [
  {
    icon:RectangleGroupIcon,
    title:"Feed",
    path:"/feed"
  },
  {
    icon:ChatBubbleOvalLeftIcon,
    title:"Messages",
    path:"/messages"
  },
  {
    icon:UsersIcon,
    title:"Friends",
    path:"/friends",
  },
  {
    icon:UserGroupIcon,
    title:"My community",
    path:"/my-community"
  },
  {
    icon:Cog6ToothIcon,
    title:"Settings",
    path:"/settings"
  },

]