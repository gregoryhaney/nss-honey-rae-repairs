import React, { useEffect, useState } from "react"

export const TicketList = () => {
    const [tickets, updateTickets] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=customer&_expand=employee")
            .then(res => res.json())
            .then((data) => {
                updateTickets(data)
            })
        },
        []
    )


    return (
    <>
        {
            tickets.map(
                (ticket) => {
                    return <div key={`ticket--${ticket.id}`}>
                        <p>{ticket.description} Submitted by {ticket.customer.name}
                        and worked on by {ticket.employee.name}       
                        </p>
                        </div>
                }
            )
        }
    </>
    )
}