import { RefObject } from "react"
import Employee from "../classes/Employee"
import Company from "../classes/Company"

type EmployeeListProps = {
    companyListRef: RefObject<HTMLDivElement>
    employeeListRef: RefObject<HTMLDivElement>
    executeScroll: (destination: RefObject<HTMLDivElement>) => void
    employees: Employee[]
    companies: Company[]
    selectedCompany: number
}

export default function EmployeeList({ companyListRef, executeScroll, employeeListRef, companies, employees, selectedCompany }: EmployeeListProps) {
    return (
        <div className="container" ref={employeeListRef}>
            <div className="employees-container">
                <i className="gg-chevron-double-up-o scroll-button" onClick={() => { executeScroll(companyListRef) }}></i>
                <h1>Employees of {companies.filter((company) => selectedCompany === company.GetId())[0]?.GetName()}</h1>

                <div className="card-container">
                    {employees.filter((employee) => selectedCompany === employee.GetCompanyId()).map((employee) => {
                        return <div className="employee-card">
                            <h3>{employee.GetName()}</h3>
                            <p>Age: {employee.GetAge()}</p>
                            <p>Contact: {employee.GetEmail()}</p>
                            <p>Role at company: {employee.GetJobTitle()}</p>
                        </div>
                    })}
                </div>

            </div>
        </div>
    )
}