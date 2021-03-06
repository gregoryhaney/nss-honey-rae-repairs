
 // These imports allow us to use all the features
 // that come with the React library.
 import React, { useEffect, useState } from "react"

 /* Define and export a component named for the module. 
      Whatever this FN returns will be the HTML
      generated in the browser. 
    In React components, the HTML that we write
        is called JSX (a language that looks much
        like HTML but with some differences). 
    React takes JSX, converts it to JavaScript
        code, and renders the HTML from that.
 */
 export const CustomerList = () => {
 
     const [ customers, setCustomers ] = useState([])
     const [ totalCustomerMessage, updateMessage ] = useState("")
 
     // instructions on useEffect are below this entire FN
     useEffect(
         () => {
             fetch("http://localhost:8088/customers")
             .then(res => res.json())
             .then((customerArray) => {
                 setCustomers(customerArray)
             })
         },
         []
     )
 

    useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage ("You have 1 customer")
            } else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        [customers]
    )
 
     // Required is 'return' with parenthesis with the
     // HTML we want to see in browser within the parenthesis

     // Adding the 'key' below in the return is necessary to clear a 
     // warning error in DevTools about uniqueness of items. React
     // won't use the "id" from each record to show uniqueness. It
     // uses its 'key' for this, so we're assigning the 'id' from each
     // record to the 'key' for each record.
     return (
         <>
            <div>{totalCustomerMessage}</div>

         {
             customers.slice(0, 5).map(
                 (customerObject) => {
                     return <h3 key={`customer--${customerObject.id}`}>{customerObject.name}</h3>
                 }
             )
         }
         </>
     )
 }
 
 
 /* 
     explanation for the line of code:
 
     const [ customers, setCustomers ] = useState([])
 
     it takes one argument.
         want to render list of customers from API.
     1. Go get the state from the API, pull
     it into the application state, and render
     it as HTML. However, we do not have the
     database.json or dataAccess.js modules that
     we've used before React.
 
     We'll be keeping state for customers inside
     this component. To set up a state variable:
 
     The FN 'useState()' is called a hook (it starts
     with 'use').
     useState([]) returns an array, which is why
     there is an array on the left side of the
     expression:
 
             const [ customers, setCustomers ] = useState([])
 
     In the array that it returns, it gives you the initial
     value (an empty array). The variable "customers"
     will be used to hold the returned value.
     The 2nd thing it returns is a FN to set the value
     of 'customers' later in the code (Modify the
     state) - so 'setCustomers' in this case
 
     Ee have established a state variable to hold the
     state of 'customers' from the API in our 
     application state. We now need to go get it.
 
 */
 
 
 /*
         Next is another built-in FN of React. This
     is another 'hook' (starts with the word 'use').
     this FN is 'useEffect()'. 
     This FN takes two arguments:
         1. is a FN
         2. is an array
     The sole purpose is to run code when some
     certain state changes. It is basically just
     an event listener.
     In this case, when the state variable of 
     'customers' changes, React will, under the
     hood, broadcast an event saying that the 
     state has changed. We are using useEffect
     as the eventListener
         1. for now, the array will remain empty
     because we only want the code to run the
     1st time this component is rendered.
         2. in the FN part, we wanna get the data
     from the API and pull it into the application
     state (variable called 'customers'). This will
     be the familiar 'fetch'.
             a. when it comes back, we'll need to
             convert the JSON-encoded string to 
             JS.
             b. when we have the final array of 
             customers, we want it to end up in the
             'customers' variable; we need to invoke
             the 'setCustomers' FN to set the value
             of 'customers'
 
 */
 
 /*
     So, we now have state data on customers sitting
     in the 'customers' variable and living in this
     component.
     We can iterate through the customers and 
     generate the HTML, which goes above inside the
     parenthesis following 'return'.
     Still doing string interpolation, but without
     the dollar sign before curly braces for a 
     literal.
     We're going to iterate through customers, 
     converting them from objects to HTML using JSX.
     We need the array method '.map()' as the conversion
     tool
     A limitation with JSX is that we can return
     ONLY one thing. The return above is already doing
     the <h1>:
 
     return(
         <h1>Honey Rae's Repair Shoppe</h1>
     )
        
     So it cannot also return the customers
     in a list of <h2> tags as desired. 
         To combat this, we'll take all the headings 
     and put them into a single element, and that's
     what will get returned by JSX. React provides
     something called a 'fragment' to do this, so we
     don't have to create a DIV or ARTICLE or 
     anything else to put these customers as children
     underneath some other piece.
     A 'fragment' is denoted with empty open and
     closed angle brackets: <></>
 
     NEW RETURN BLOCK:
 
     return (
         <>
             <h1>Honey Rae's Repair Shoppe</h1>
             {
                 customers.map(
                     (customerObject) => {
                         return <h2>{customerObject.name}</h2>
                     }
                 )
             }
         </>
     )
 
 */