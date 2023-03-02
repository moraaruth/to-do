//hook that allows you to perform side effects in functional components
import React, { useEffect } from 'react'

//alert takes in four props: type, msg, removeAlert and list
const Alert = ({ type, msg, removeAlert, list }) => {
  //useEffect takes a callback function as its first argument and an array of dependencies
  useEffect(() => {
    //`setTimeout` function calls `removeAlert` function after 3000 milliseconds
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)
    //returns a cleanup function that runs before the next call to the callback function
    return () => clearTimeout(timeout)
  }, [list])
  //`alert` class  to style elements that display alert messages
  //`alert-${type}` to apply different styles depending on the value of the `type` prop
  //e.g `alert-success` to make alert message green
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert