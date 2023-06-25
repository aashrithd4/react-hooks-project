import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext ={
    openCart:() =>void
    closeCart:() => void
    getItemQuantity:(id:number)=>number
    increaseCartQuantity: (id:number) =>void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id:number) => void
    cartQuantity:number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart () {
    return(
        useContext(ShoppingCartContext)
    )
}

export function ShoppingCartProvider ({children}: ShoppingCartProviderProps) {
    
    // const [cartItems, setCartItems] = useState<CartItem[]>([])

    // const [isOpen, setisOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    const [isOpen, setisOpen] = useState(false)
    const openCart = () => setisOpen(true)
    const closeCart = () => setisOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity (id:number){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id)==null){
                return [...currItems,{id, quantity:1}]
            }else{
                return currItems.map(item =>{
                    if(item.id===id)
                    {
                        return {...item,quantity:item.quantity+1}
                    }
                    else{
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity (id:number){
        setCartItems(currItems =>{
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !==id)
            }else{
                return currItems.map(item =>{
                    if(item.id===id)
                    {
                        return {...item,quantity:item.quantity-1}
                    }
                    else{
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !==id)
        })
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity+quantity,0
    )

    return(
        <ShoppingCartContext.Provider value={{getItemQuantity, 
                                              increaseCartQuantity, 
                                              decreaseCartQuantity, 
                                              removeFromCart,
                                              openCart,closeCart, 
                                              cartQuantity,
                                              cartItems}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

//using for applying logic

//useShoppingCart is a hook

// provider : it gives all the values you need, and code for rendering all the shopping cart, take in children and re render it providers needs objects and children in it 
//ReactNode ; type what you gave to the children property inside the react
//increaseCartQuantity: (id:number) =>void acts like a hook take id and returns nothing
// ShoppingCartContext = createContext({} as ShoppingCartContext) contains "getItemQuantity:(id:number)=>number increaseCartQuantity: (id:number) =>void
// decreaseCartQuantity: (id: number) => void removeFromCart: (id:number) => void" this values as a type