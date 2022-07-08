import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Employee = () => {
    // new state variable to hold individual employee
    // after employee has been retrieved via the API
    // by default, it will be an empty object
    const [ employee, assignEmp ] = useState({})
    const { employeeId } = useParams()

            // want this FN to run when the value of 'employeeId' changes
            // it will get the employee details for the particular employeeId

    useEffect(
        () => {
            return fetch(`http://localhost:8088/employees/${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    assignEmp(data)
                })
        },
        [ employeeId ]
    )

    return (
        <>
            <h2>Employee {employeeId} Details</h2>
                <section className="employee">
                    <h3 className="employee__name">{ employee?.name }</h3>
                    <div className="employee__specialty">Specialty is { employee?.specialty }</div>
                </section>
        </>
    )
}
