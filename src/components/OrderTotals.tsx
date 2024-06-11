import { Dispatch, useMemo } from "react"
import { formatCurrency } from "../helpers"
import { OrderItem } from "../types"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
   order: OrderItem[]
   tip: number,
   dispatch: Dispatch<OrderActions>
}

export default function OrderTotals({order, tip, dispatch }: OrderTotalsProps) {
   // TODO: Mover a hook de useOrder
   const subtotalAmount = useMemo(
      () => order.reduce( (total, item) => total + (item.quantity * item.price), 0),
      [order]
   )
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
            onClick={() => dispatch({type: 'place-order'})}
         >
            Guardar Orden
         </button>
      </>
   )
}