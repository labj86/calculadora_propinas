import { tipOptions } from "../data/constants"

type TipPercentageFormProps = {
   setTip: React.Dispatch<React.SetStateAction<number>>,
   tip: number
}

export default function TipPercentageForm({setTip, tip} : TipPercentageFormProps) {
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
                     onChange={ e => setTip(Number(e.target.value))}
                     checked={tipOption.value === tip}
                  />
               </div>
            ))}
         </form>
      </div>
   )
}