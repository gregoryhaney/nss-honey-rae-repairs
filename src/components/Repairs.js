
 // this allows us to use all the features
 // that come with the React library
 import React from "react";
 import { Route, Redirect } from "react-router-dom";
 import { ApplicationViews } from "./ApplicationViews";
 import { NavBar } from "./nav/NavBar";
 import { Login } from "./auth/Login";
 import { Register } from "./auth/Register";
 import "./Repairs.css";

 /* Define and export a component named for the module 
        whatever this FN returns will be the HTML
        generated in the browser. 
    In React components, the HTML that we write
        is called JSX (a language that looks much
        like HTML but with some differences). 
    React takes JSX, converts it to JavaScript
        code, and renders the HTML from that.
 */


     // Required is 'return' with parenthesis with the
     //     HTML we want to see in browser within the parenthesis
export const Repairs = () => (
    <>
        <Route
        render={() => {
            if (localStorage.getItem("honey_customer")) {
            return (
                <>
                <NavBar />
                <ApplicationViews />
                </>
            );
            } else {
            return <Redirect to="/login" />;
            }
        }}
        />

        <Route path="/login">
        <Login />
        </Route>
        <Route path="/register">
        <Register />
        </Route>
    </>
) 