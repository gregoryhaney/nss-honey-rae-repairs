/* the sole responsibility of this module is to 
    pattern match - to listen for when the URL is 
    changed. When it finds a change, it will evaluate
    each route below. When it finds a match, it will
    render the appropriate component
*/

import React from "react";
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList";
import { EmployeeList } from "./employees/EmployeeList";
import { TicketList } from "./serviceTickets/TicketList";

export const ApplicationViews = () => {
    return (
        <>
            
            
            <Route exact path="/customers">
                <CustomerList />
            </Route>

            <Route path="/employees">
                <EmployeeList />
            </Route>
            
            <Route path="/tickets">
                <TicketList />
            </Route>
            
        </>
    )
}

// the routes above are listening for the event of when
// a URL change happens in the browser
// when the URL matches whatever is in the path above,
// we tell it to make the call to the appropriate FN