import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Tickets.css"


export const TicketList = () => {
    const [active, setActive] = useState("")
    const history = useHistory()
    const [tickets, updateTickets] = useState([])

    const getTickets = () => {
        fetch("http://localhost:8088/serviceTickets?_expand=customer&_expand=employee")
                .then(res => res.json())
                .then((data) => {
                    updateTickets(data)
                })
    }

    
    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })  
        .then(getTickets())           
    }

        useEffect(
            () => {
                // fetch("http://localhost:8088/serviceTickets?_expand=customer&_expand=employee")
                // .then(res => res.json())
                // .then((data) => {
                //     updateTickets(data)
                getTickets()
                
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
                                    {ticket.emergency ? "🚑" : ""} <Link to={`/tickets/${ticket.id}`}>{ticket.description}</Link> submitted by customer# {ticket.customerId} 
                                    <button onClick={() => {
                                        deleteTicket(ticket.id)
                                    }}>Delete Ticket</button>
                                    
                                </p>
                                </div>
                           
                        }
                    )
                }
            </>
            )
        }