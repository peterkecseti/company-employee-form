import { ChangeEvent, SetStateAction } from "react";
import Company from "../classes/Company";
import Employee from "../classes/Employee";

type setObjectType = React.Dispatch<SetStateAction<{ [key: string]: string | number }>>


// Form input update handlers
    // Employee form

export function AgeChange(e: ChangeEvent<HTMLInputElement>, obj: object, setObject: setObjectType) {
    const age = parseInt(e.target.value);
    setObject(obj => ({ ...obj, age: age }))
}


export function JobTitleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectType) {
    const jobTitle = e.target.value;
    setObject(obj => ({ ...obj, jobTitle: jobTitle }))
}

export function CompanyChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectType) {
    const company = parseInt(e.target.value);
    setObject(obj => ({ ...obj, company: company }))
}

    // Company form

export function EmployeeCountChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectType) {
    const numberOfEmployees = parseInt(e.target.value);
    setObject(obj => ({ ...obj, numberOfEmployees: numberOfEmployees }))
}

export function DescriptionChange(e: ChangeEvent<HTMLTextAreaElement>, obj: object, setObject: setObjectType) {
    const description = e.target.value;
    setObject(obj => ({ ...obj, description: description }))
}

    // Common

export function NameChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectType) {
    const name = e.target.value;
    setObject(obj => ({ ...obj, name: name }))
}

export function EmailChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectType) {
    const email = e.target.value;
    setObject(obj => ({ ...obj, email: email }))
}