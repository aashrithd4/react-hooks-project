// used when refrshing the page and after refresh it should store the data

import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue:T | (()=>T)){
    const[value,setValue] = useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue !=null) return JSON.parse(jsonValue)

        if(typeof initialValue === "function"){
            return(initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])

    return [value,setValue] as [typeof value, typeof setValue]
}

//CartItem[] is of type T

//use Effect that needs to be run every time when ever we changes key or value 