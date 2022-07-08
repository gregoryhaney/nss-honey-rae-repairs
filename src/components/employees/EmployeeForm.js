import React, { useState } from "react"
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
    
    const [ employees, updateEmployee ] = useState({
        name: "",
        specialty: ""
    });
    const history = useHistory()

        // The object to send to the API when new form is submitted:
        //  Use the preventDefault to prevent default behavior of the
        //  browser after the form is submitted.
    const hireEmployee = (evt) => {
        evt.preventDefault()

        const newEmployee = {
            name: employees.name,
            specialty: employees.specialty
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        }
        return fetch("http://localhost:8088/employees", fetchOption)
                .then(() => {
                    history.push("/employees")
                })
    }

    return (
        <form className="hireEmployeeForm">
            <h2 className="hireEmployeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                            onChange={
                                (evt) => {
                                    const copy = {...employees}
                                    copy.name = evt.target.value
                                    updateEmployee(copy)
                                }
                            }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full name..."
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = {...employees}
                                copy.specialty = evt.target.value
                                updateEmployee(copy)
                            }
                        } 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Technical specialty..."
                        />
                </div>
            </fieldset>
            <button onClick={hireEmployee} className="btn btn-primary">
                Hire Employee
            </button>
        </form>
    )
}