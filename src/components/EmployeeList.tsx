import { RefObject, useEffect, useReducer, useRef, useState } from "react"
import Employee from "../classes/Employee"
import Company from "../classes/Company"

type EmployeeListProps = {
    companyListRef: RefObject<HTMLDivElement>
    employeeListRef: RefObject<HTMLDivElement>
    executeScroll: (destination: RefObject<HTMLDivElement>) => void
    employees: Employee[]
    companies: Company[]
    selectedCompany: number
    files: File[]
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function EmployeeList({ companyListRef, executeScroll, employeeListRef, companies, employees, selectedCompany, files, setAlertMessage: setAlertMessage}: EmployeeListProps) {
    const downloadRef = useRef<HTMLAnchorElement>(null);



    function DownloadCV(id: number){
        if(!files[id]){
            setAlertMessage("This employee hasn't uploaded a CV yet!")
            return
        }
        const selectedFile = files[id]
        const fileUrl = URL.createObjectURL(new Blob([selectedFile]))
        const link = downloadRef.current!
        link.href = fileUrl;
        link.download = selectedFile.name
        link.click()
        URL.revokeObjectURL(fileUrl)
    }

    return (
        <div className="container" ref={employeeListRef}>
            <div className="employees-container">
                <i className="gg-chevron-double-up-o scroll-button" onClick={() => { executeScroll(companyListRef) }}></i>
                <h1>Employees of {companies.filter((company) => selectedCompany === company.GetId())[0]?.GetName()}</h1>

                <div className="card-container">
                    {employees.filter((employee) => selectedCompany === employee.GetCompanyId()).map((employee) => {
                        return <div className="employee-card" key={employee.GetId()}>
                            <h3>{employee.GetName()}</h3>
                            <p>Age: {employee.GetAge()}</p>
                            <p>Contact: {employee.GetEmail()}</p>
                            <p>Role at company: {employee.GetJobTitle()}</p>
                            <button onClick={()=>{DownloadCV(employee.GetId())}}>Download CV</button>
                        </div>
                    })}
                </div>
                <a ref={downloadRef}></a>

            </div>
        </div>
    )
}