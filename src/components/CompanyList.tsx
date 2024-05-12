import { RefObject } from "react"
import Company from "../classes/Company"
import Employee from "../classes/Employee"

type CompanyListProps = {
    employees: Employee[]
    companies: Company[]
    setSelectedCompany: React.Dispatch<React.SetStateAction<number>>
    executeScroll: (destination: RefObject<HTMLDivElement>) => void
    employeeListRef: RefObject<HTMLDivElement>
}

export default function CompanyList({ employees, companies, executeScroll, employeeListRef, setSelectedCompany}: CompanyListProps) {
    return (
        <div>
            <h1>Select a company</h1>
            <div className="card-container">
                {companies.map((company) => {
                    return <div className="employee-card" key={company.GetId()} onClick={()=>{executeScroll(employeeListRef); setSelectedCompany(company.GetId())}}>
                        <h3>{company.GetName()}</h3>
                        <p>Number of employees: {company.GetEmployeeCount()}</p>
                        <p>Employees in registry: {employees.filter((employee) => employee.GetCompanyId() === company.GetId()).length}</p>
                    </div>
                })}
            </div>
        </div>
    )
}