import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"



export const Ticket = () => {
    // new state variable to hold individual ticket
    // after it has been retrieved via the API
    // by default, it will be an empty object
    const [ ticket, assignTicket ] = useState({})
    const [ employees, setEmployees ] = useState([])
    const { ticketId } = useParams()
    const history = useHistory()

            // want this FN to run when the value of 'ticketId' changes
            // it will get the ticket details for the particular ticketId

    useEffect(
        () => {
            return fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                .then(response => response.json())
                .then((data) => {
                    assignTicket(data)
                })
        },
        [ ticketId ]    // the FN above runs when value of 'ticketId' changes
    )

            /*
            this useEffect will get all employees.
            it runs immediately on JSX render, so the dependency array
            is empty.
            it will get the data and put it into a state variable
            because we want employees to render in JSX, it must be in 
            state (Everything in JSX get rendered from State)  
            */

    useEffect(
        () => {
            return fetch("http://localhost:8088/employees")
            .then(res => res.json())
            .then((data) => {
                setEmployees(data)
            })
        },    // empty dependency array that will
        [ ]   // only run when initial JSX rendering has finished
    )


            // this is to create the new object that will replace the
            // existing obj in the DB when the new employee is selected.
            // in the PUT below, this object will be stringified.
        const assignEmployee = (changeEvent) => {
            const newServiceTicketObject = {
                "customerId": parseInt(localStorage.getItem("honey_customer")),
                "employeeId": parseInt(changeEvent.target.value),
                "description": ticket.description,
                "emergency": ticket.emergency,
                "dateCompleted": ticket.dateCompleted
            }
        
            

            return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newServiceTicketObject)
            })
            // because JSON does not give us any response for a PUT operation,
            // we don't need the normal 'response' line with a .then
                .then(() => {

                    // we can use the useHistory hook to take the user back
                    // to the list of tickets upon making the update to the DB
                    // this is done with the 'history' variable that is set up top
                    history.push("/tickets") 
                })
            }




    return (
        <>
            <h2>Ticket {ticketId} Details</h2>
                <section className="ticket">
                    <h3 className="ticket__description">{ ticket.description }</h3>
                    <div className="ticket__customer">Customer: { ticket.customer?.name } </div>
                    <div className="ticket__employee">
                        <select id="employee" onChange={ assignEmployee }>
                            {
                                employees.map(
                                    (employee) => {
                                        return <option value={employee.id} key={`employee--${employee.id}`}>
                                            {employee.name}
                                            </option>
                                    }
                                )
                            }
                        </select>
                    </div>
                </section>
        </>
    )
}



/*
    In the debugger, getting the following:
    "Warning: Each child in a list should have a unique "key" prop."
        -this can be solved by adding a unique key anytime there
        is iteration of objects:
        return <option key={`employee--${employee.id}`}>

*/