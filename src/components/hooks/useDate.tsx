  import { useEffect, useState } from "react"

const useDate = (d:any) => { // type for method toDate() === "Timestamp" in firebase

  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [mouthName, setMouthName] = useState("")
  const [year, setYear] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const [dateAgo,setDateAgo] = useState("")

  useEffect(() => {
    const monthWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const dy = d?.toDate().getDate().toString().padStart(2,"0")
    const m = (d?.toDate().getMonth() + 1).toString().padStart(2,"0")
    const monthIndex = d?.toDate().getMonth()
    const y = d?.toDate().getFullYear().toString()
    const h = d?.toDate().getHours().toString().padStart(2,"0")
    const min = d?.toDate().getMinutes().toString().padStart(2,"0")

    setDay(dy)
    setMonth(m)
    setMouthName(monthWords[monthIndex])
    setYear(y)
    setHours(h)
    setMinutes(min)

    setDate(`${dy} ${monthWords[monthIndex]} ${y}`)
    setTime(`${h}:${min}`)
  }, [d])

  return {
    day,month,year,hours,minutes,date,time
  }
}

// export default useDate