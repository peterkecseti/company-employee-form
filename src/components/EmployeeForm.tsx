import Employee from "../classes/Employee";
import Company from "../classes/Company";
import SubmitHandler from "../functions/SubmitHandler";
import { useState } from "react";
import { AgeChange, CompanyChange, EmailChange, JobTitleChange, NameChange } from "../functions/FormChangeHandlers";

type EmployeeFormProps = {
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
    employees: Employee[]

    companies: Company[]

    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    files: File[];

    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}


function EmployeeForm({ setEmployees, employees, companies, setErrorMessage, setFiles, files }: EmployeeFormProps) {
    const JobTitles = ["Accountant", "Software Developer", "Software Tester", "Manager"]

    const [employee, setEmployee] = useState<{ [key: string]: string | number }>(
        {
        name: "",
        email: "",
        JobTitle: "",
        age: 0,
        CV: "",
        id: -1,
        company: -1 })

    async function SubmitForm() {
        try {
            if (companies.length === 0) {
                setErrorMessage("You must create a company before hiring an employee!")
                return;
            }

            const newEmployee: Employee = new Employee(

                String(employee.name),
                String(employee.email),
                (employee.jobTitle),
                Number(employee.age),
                "",
                employees.length,
                Number(employee?.company))

            console.log(newEmployee)

            setEmployees(employees => [...(employees ?? []), newEmployee])


            // SubmitHandler(employee, "employee", files[employee.id])
            // console.log(typeof(files[employee.id]))
        }
        catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    function HandleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (files && files[0].type === "application/pdf") {
            setFiles((prevFiles) => [...prevFiles, files[0]])
            console.log(files)
        }
        else {
            setErrorMessage("The CV must be in PDF format")
        }
    }

    return (
        <div className="form">
            <h3>Hire an employee</h3>
            <input type="text" name="employeeName" id="employeeName" placeholder="Name" onChange={(e) => { NameChange(e, employees, setEmployee) }} />
            <br />
            <input type="text" name="employeeEmail" id="employeeEmail" placeholder="Email" onChange={(e) => { EmailChange(e, employees, setEmployee) }} />
            <br />
            <input type="number" name="employeeAge" id="employeeAge" placeholder="Age" onChange={(e) => { AgeChange(e, employees, setEmployee) }}>
            </input>
            <br />
            <select name="employeeJobTitle" id="employeeJobTitle" onChange={(e) => { JobTitleChange(e, employees, setEmployee) }}>
                <option value="">Select a job title</option>
                {JobTitles.map((jobTitle) => { return <option value={jobTitle} key={jobTitle}>{jobTitle}</option> })}
            </select>
            <br />

            {companies.length === 0 ?
                <select>
                    <option value="">No companies on record</option>
                </select>
                :
                <select name="selectCompany" id="selectCompany" onChange={(e) => { CompanyChange(e, employees, setEmployee) }}>
                    <option value="">Select a company</option>
                    {companies.map((company) => { return <option value={company.GetId()} key={company.GetId()}>{company.GetName()}</option> })}
                </select>}

            <input type="file" accept="application/pdf" onChange={(e) => { HandleFileChange(e) }} />
            <br />
            <button className="form-button" id="submit" onClick={() => { SubmitForm() }}>Submit</button>
        </div>
    )
}

export default EmployeeForm;