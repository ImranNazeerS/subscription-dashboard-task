import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 100) => {
    const [debounce, setDebounce] = useState()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay)

        return () => clearTimeout(timer)
    }, [value, delay])

    return debounce
}