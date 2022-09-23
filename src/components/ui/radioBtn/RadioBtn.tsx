import { FC,memo } from 'react'
import { TypeSetState } from '../../types/data'
import './RadioBtn.scss'

interface propsRadioBtn{
  id:string,
  name:string,
  value:string,
  title:string,
  setValue:TypeSetState<string>
  defCheck:boolean
}
const RadioBtn:FC<propsRadioBtn> = memo(({id,name,title,value,setValue,defCheck}) => {
  return (
    <div className="relative">
      <input defaultChecked={defCheck} onChange={()=>setValue(value)} className='input-radio' type="radio" value={value} name={name} id={id} />
      <label className='custom-radio__btn' htmlFor={id}>
        {title}
      </label>
  </div>
  )
})

export default RadioBtn