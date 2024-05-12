import Employee from "../classes/Employee";
import Company from "../classes/Company";
// import SubmitHandler from "../classes/SubmitHandler";

type EmployeeFormProps = {
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>
    employees: Employee[]

    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
    companies: Company[]

    setErrorMessage : React.Dispatch<React.SetStateAction<string>>
}

function EmployeeForm({setEmployees, employees, setCompanies, companies, setErrorMessage}: EmployeeFormProps) {
    const JobTitles = ["Accountant", "Software Developer", "Software Tester", "Manager"]

    let employee = {
        "name": "",
        "email": "",
        "jobTitle": "",
        "age": 0,
        "CV": "",
        "id": 1,
        "company": 0
    }

    async function SubmitForm() {
        try {
            if(companies.length === 0){
                setErrorMessage("You must create a company before hiring an employee!")
            }

            const newEmployee: Employee = new Employee(employee.name, employee.email, employee.jobTitle, employee.age, "", employee.id, employee.company)
            setEmployees(employees => [...(employees ?? []), newEmployee])
            // SubmitHandler(employee, "employee")
        }
        catch (e: any) {
             //TODO: ebbol hibauzenetet avanzsalni
            setErrorMessage(e.message)
        }
    }

    return (
            <div className="form employee-form">
                <h3>Hire an employee</h3>
                <input type="text" name="employeeName" id="employeeName" placeholder="Name" onChange={(e) => { employee.name = e.target.value }} />
                <br />
                <input type="text" name="employeeEmail" id="employeeEmail" placeholder="Email" onChange={(e) => { employee.email = e.target.value }} />
                <br />
                <input type="number" name="employeeAge" id="employeeAge" placeholder="Age" onChange={(e) => { employee.age = parseInt(e.target.value) }}>
                </input>
                <br />
                <select name="employeeJobTitle" id="employeeJobTitle" onChange={(e) => { employee.jobTitle = e.target.value }}>
                    {JobTitles.map((jobTitle)=>{return <option value={jobTitle} key={jobTitle}>{jobTitle}</option>})}
                </select>
                <br />
                <select name="selectCompany" id="selectCompany" onChange={(e)=>{ employee.company = parseInt(e.target.value) }}>
                    {companies.map((company)=> {return <option value={company.GetId()} key={company.GetId()}>{company.GetName()}</option>})}
                </select>

                {/* <input type="file" accept="application/pdf" onChange={(e)=>{ employeeFormData.append("CV", e.target.files?[0])}}/> */}
                <br />
                <button className="form-button" id="submit" onClick={() => { SubmitForm() }}>submit</button>
            </div>
    )
}

export default EmployeeForm;