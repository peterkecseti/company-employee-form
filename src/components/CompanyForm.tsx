import { useEffect } from "react";
import Company from "../classes/Company";
// import SubmitHandler from "../classes/SubmitHandler";

type CompanyProps = {
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
    companies: Company[]
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

function CompanyForm({companies, setCompanies, setErrorMessage}: CompanyProps) {
    useEffect(() => {
        console.log(companies)
    }, [companies])

    let company = {
        "name": "",
        "email": "",
        "numberOfEmployees": 0,
        "description": ""
    }

    function SubmitForm() {
        try {
            const newCompany: Company = new Company(company.name, company.email, company.numberOfEmployees, company.description, companies.length)
            setCompanies(companies => [...(companies ?? []), newCompany])
        }
        catch (e: any) {
            setErrorMessage(e.message)
        }
    }

    return (
            <div className="form company-form">
                <h3>Add a company</h3>
                <input type="text" name="companyName" id="companyName" placeholder="Name" onChange={(e) => { company.name = e.target.value }} />
                <br />
                <input type="text" name="companyEmail" id="companyEmail" placeholder="Email address" onChange={(e) => { company.email = e.target.value }} />
                <br />
                <input type="number" name="companyNumberOfEmployees" placeholder="Number of employees" onChange={(e) => { company.numberOfEmployees = parseInt(e.target.value) }} />
                <br />
                <textarea name="companyDescription" id="companyDescription" placeholder="Give a brief description of your company" onChange={(e) => { company.description = e.target.value }}>
                </textarea>
                <br />
                <button className="form-button" id="submit" onClick={() => { SubmitForm() }}>Submit</button>
            </div>
    )
}

export default CompanyForm;