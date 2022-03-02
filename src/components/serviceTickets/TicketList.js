import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Tickets.css"

export const TicketList = () => {
    const [active, setActive] = useState("")
    const history = useHistory()
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

        useEffect(() => {
            const activeTicketCount = tickets.filter(t => t.dateCompleted === "").length
            setActive(`There are ${activeTicketCount} open tickets`)
        }, [tickets])


        return (
            <>
                <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
                    {active}
                    {
                    tickets.map(
                        (ticket) => {
                            return <div key={`ticket--${ticket.id}`}>
                                <p className={`ticket ${ticket.emergency ? 'emergency' : ''}`}>
                                    {ticket.emergency ? "🚑" : ""} {ticket.description} submitted by customer# {ticket.customerId}     
                                </p>
                                </div>
                           
                        }
                    )
                }
            </>
            )
        }