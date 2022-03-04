import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const Ticket = () => {
    // new state variable to hold individual ticket
    // after it has been retrieved via the API
    // by default, it will be an empty object
    const [ ticket, assignTicket ] = useState({})
    const { ticketId } = useParams()

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
        [ ticketId ]
    )

    return (
        <>
            <h2>Ticket {ticketId} Details</h2>
                <section className="ticket">
                    <h3 className="ticket__description">{ ticket.description }</h3>
                    <div className="ticket__customer">Customer: { ticket.customer?.name } </div>
                    <div className="ticket__employee">Employee: { ticket.employee?.name }</div>
                </section>
        </>
    )
}