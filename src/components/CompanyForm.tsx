import { useEffect, useState } from "react";
import Company from "../classes/Company";
import { DescriptionChange, EmailChange, EmployeeCountChange, NameChange } from "../functions/FormChangeHandlers";
// import SubmitHandler from "../classes/SubmitHandler";

type CompanyProps = {
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
    companies: Company[]
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

function CompanyForm({companies, setCompanies, setErrorMessage}: CompanyProps) {

    const [company, setCompany] = useState<{ [key: string]: string | number }>({ name: "", email: "", numberOfEmployees: 0, description: ""})

    function SubmitForm() {
        try {
            const newCompany: Company = new Company(
                String(company.name),
                String(company.email),
                Number(company.numberOfEmployees),
                String(company.description),
                companies.length)
            setCompanies(companies => [...(companies ?? []), newCompany])
        }
        catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    return (
            <div className="form">
                <h3>Add a company</h3>
                <input type="text" name="companyName" id="companyName" placeholder="Name" onChange={(e) => { NameChange(e, companies, setCompany) }} />
                <br />
                <input type="text" name="companyEmail" id="companyEmail" placeholder="Email address" onChange={(e) => { EmailChange(e, companies, setCompany) }} />
                <br />
                <input type="number" name="companyNumberOfEmployees" placeholder="Number of employees" onChange={(e) => { EmployeeCountChange(e, companies, setCompany) }} />
                <br />
                <textarea name="companyDescription" id="companyDescription" placeholder="Give a brief description of your company" onChange={(e) => { DescriptionChange(e, companies, setCompany) }}>
                </textarea>
                <br />
                <button className="form-button" id="submit" onClick={() => { SubmitForm() }}>Submit</button>
            </div>
    )
}

export default CompanyForm;