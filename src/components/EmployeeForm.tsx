import Employee from "../classes/Employee";
import Company from "../classes/Company";
import SubmitHandler from "../functions/SubmitHandler";
import { useRef, useState } from "react";
import { AgeChange, CompanyChange, EmailChange, FileChange, JobTitleChange, NameChange } from "../functions/FormChangeHandlers";

type EmployeeFormProps = {
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
    employees: Employee[]

    companies: Company[]

    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    files: File[];

    setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}


function EmployeeForm({ setEmployees, employees, companies, setAlertMessage: setAlertMessage, setFiles, files }: EmployeeFormProps) {
    const JobTitles = ["Accountant", "Software Developer", "Software Tester", "Manager"]
    const fileSelectRef = useRef<HTMLInputElement>(null);

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
                setAlertMessage("You must create a company before hiring an employee!")
                return
            }
            if(files[employees.length] == undefined){
                setAlertMessage("You must upload your CV")
                return
            }
            const newEmployee: Employee = new Employee(

                String(employee.name),
                String(employee.email),
                (employee.jobTitle),
                Number(employee.age),
                files[employees.length].name,
                employees.length,
                Number(employee?.company))

            SubmitHandler(employee, "employee", files[employees.length]).then((code)=>{
                code = 200; // Endpoint hiányában mindig hibát adna, ezért felülírásra kerül
                if(code != 200){
                    setAlertMessage("Something went wrong")
                    return
                }
                setEmployees(employees => [...(employees ?? []), newEmployee])
                setAlertMessage("Employee hired successfully")
            })
            
        }
        catch (e: any) {
            setAlertMessage(e.message)
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
            <br />
            <button className="" onClick={()=>{fileSelectRef.current?.click()}}>Select CV</button>
            <input type="file" accept="application/pdf" ref={fileSelectRef} onChange={(e) => { FileChange(e, files, setFiles, employees.length) }} />
            <br />
            <button className="form-button" id="submit" onClick={() => { SubmitForm() }}>Submit</button>
        </div>
    )
}

export default EmployeeForm;