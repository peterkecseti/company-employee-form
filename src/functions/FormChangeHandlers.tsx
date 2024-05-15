import { ChangeEvent, SetStateAction } from "react";

type setObjectProp = React.Dispatch<SetStateAction<{ [key: string]: string | number }>>
type setFileProp = React.Dispatch<SetStateAction<File[]>>


// Form input update handlers
    // Employee form

export function AgeChange(e: ChangeEvent<HTMLInputElement>, obj: object, setObject: setObjectProp) {
    const age = parseInt(e.target.value);
    setObject(obj => ({ ...obj, age: age }))
}


export function JobTitleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectProp) {
    const jobTitle = e.target.value;
    setObject(obj => ({ ...obj, jobTitle: jobTitle }))
}

export function CompanyChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectProp) {
    const company = parseInt(e.target.value);
    setObject(obj => ({ ...obj, company: company }))
}

    // Company form

export function EmployeeCountChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectProp) {
    const numberOfEmployees = parseInt(e.target.value);
    setObject(obj => ({ ...obj, numberOfEmployees: numberOfEmployees }))
}

export function DescriptionChange(e: ChangeEvent<HTMLTextAreaElement>, obj: object, setObject: setObjectProp) {
    const description = e.target.value;
    setObject(obj => ({ ...obj, description: description }))
}

    // Common

export function NameChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectProp) {
    const name = e.target.value;
    setObject(obj => ({ ...obj, name: name }))
}

export function EmailChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, obj: object, setObject: setObjectProp) {
    const email = e.target.value;
    setObject(obj => ({ ...obj, email: email }))
}

export function FileChange(e: React.ChangeEvent<HTMLInputElement>, files: File[], setFile: setFileProp, id: number){
    const newFile = e.target.files?.[0]
    if(!newFile){
        throw new Error("File not found")
    }

    if(newFile.type !== "application/pdf"){
        throw new Error("File must be in PDF format")
    }

    const newFiles = [...files]
    newFiles[id] = newFile;
    
    setFile(newFiles)
}