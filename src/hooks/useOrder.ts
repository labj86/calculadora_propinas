import { useState, useMemo } from "react";
import type { MenuItem, OrderItem } from "../types";

export default function useOrder() {

   const [order, setOrder] = useState<OrderItem[]>([]) //generic
   const [tip, setTip] = useState(0)

   const addItem = (item: MenuItem) => {
      const itemExist = order.find( orderItem => orderItem.id === item.id )
      if (itemExist) {
         const updatedOrder = order.map( orderItem => orderItem.id === item.id ?
            {...orderItem, quantity: orderItem.quantity + 1} :
            orderItem
         )
         setOrder(updatedOrder)
      } else {
         const newItem = {...item, quantity: 1}
         setOrder([...order, newItem])
      }
   }

   const removeItem = (id: OrderItem['id']) => {
      const updatedOrder = order.filter( item => item.id !== id)
      setOrder(updatedOrder)
   }

   const subtotalAmount = useMemo(
      () => order.reduce( (total, item) => total + (item.quantity * item.price), 0),
      [order]
   )

   const placeOrder = () => {
      setOrder([])
      setTip(0)
   }

   return {
      order,
      tip,
      setTip,
      addItem,
      removeItem,
      subtotalAmount,
      placeOrder
   }
}