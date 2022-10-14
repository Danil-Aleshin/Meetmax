import { Timestamp } from "firebase/firestore";

export const timeToTimeAgo = (date?:Timestamp) =>{
  if (date) {
    const dateToUnix = Math.floor(new Date(date.toDate()).getTime() / 1000)
    const nowDate = Math.floor(new Date().getTime() / 1000)

    const seconds = nowDate - dateToUnix

    switch (true) {
      case (seconds > 86400 * 180): 
        return convertDate("dd/month",date) + "."
      break;
      case (seconds > 2 * 24 * 3600): 
        return convertDate("dd/month",date) + "."
      break;
      case (seconds > 24 * 3600): 
        return 'yesterday'
      break;
      case (seconds > 3600): 
        return Math.floor(seconds / 3600).toString() + ' hours ago'
      break;
      case (seconds > 60): 
        return Math.floor(seconds / 60).toString() + ' min ago'
      break;
      case (seconds < 60): 
      return  'right now'
    break;
      default:
        return ""
      break;
    }
  }
}

export const convertDate = (
  dateType:"dd/MM/yyyy" | "dd/MM/yy" | "dd/month" | "hours/min",
  date?:Timestamp,
) =>{
  if (date) {
    
    const monthWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep",   "Oct", "Nov", "Dec"];

    const day = date.toDate().getDate().toString()
    const month = (date.toDate().getMonth() + 1).toString().padStart(2,"0")
    const monthIndex = date.toDate().getMonth()
    const year = date.toDate().getFullYear().toString()
    const hours = date.toDate().getHours().toString().padStart(2,"0")
    const min = date.toDate().getMinutes().toString().padStart(2,"0")

    switch (dateType) {
      case "dd/MM/yyyy":
        return `${day.padStart(2,"0")}.${month}.${year}`
      break;
      case "dd/MM/yy":
        return `${day.padStart(2,"0")}.${month}.${year.slice(0,2)}`
      break;
      case "dd/month":
        return `${day} ${monthWords[monthIndex]}`
      break;
      case "hours/min":
        return `${hours}:${min}`
      break;
      default:
        return ""
      break;
    }
  }
}