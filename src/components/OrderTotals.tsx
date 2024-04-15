import { useMemo } from "react"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
   tip: number,
   subtotalAmount: number,
   placeOrder: () => void
}

export default function OrderTotals({ tip, subtotalAmount, placeOrder }: OrderTotalsProps) {
   // TODO: Mover a hook de useOrder
   const tipAmount = useMemo(() => subtotalAmount * tip, [tip,subtotalAmount])
   const totalAmount = useMemo(() => subtotalAmount + tipAmount,[tipAmount,subtotalAmount])
   // useCallback es muy parecido, pero genera una función en lugar de una variable

   return (
      <>
         <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y propina</h2>

            <p>Subtotal a pagar: {''}
               <span className="font-bold">{ formatCurrency(subtotalAmount) }</span>
            </p>

            <p>Propina: {''}
               <span className="font-bold">{ formatCurrency(tipAmount) }</span>
            </p>

            <p>Total a pagar: {''}
               <span className="font-bold">{ formatCurrency(totalAmount) }</span>
            </p>
         </div>

         <button
            className="w-full bg-black p-3 text-white uppercase font-bold mt-10 disabled:opacity-10"
            disabled={totalAmount === 0}
            onClick={placeOrder}
         >
            Guardar Orden
         </button>
      </>
   )
}