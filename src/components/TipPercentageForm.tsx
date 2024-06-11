import { Dispatch } from "react"
import { tipOptions } from "../data/constants"
import { OrderActions } from "../reducers/order-reducer"

type TipPercentageFormProps = {
   dispatch: Dispatch<OrderActions>,
   tip: number
}

export default function TipPercentageForm({dispatch, tip} : TipPercentageFormProps) {
   return (
      <div>
         <h3 className="font-black text-2xl">Propina:</h3>

         <form>
            {tipOptions.map( tipOption => (
               <div key={tipOption.id} className="flex gap-2">
                  <label htmlFor={tipOption.id}>{tipOption.label}</label>
                  <input
                     id={tipOption.id}
                     type="radio"
                     name="tip"
                     value={tipOption.value}
                     onChange={ e => dispatch({type: 'add-tip', payload: {value: Number(e.target.value)}})}
                     checked={tipOption.value === tip}
                  />
               </div>
            ))}
         </form>
      </div>
   )
}