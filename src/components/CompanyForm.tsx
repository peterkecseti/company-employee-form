import { useEffect, useState } from "react";
import Company from "../classes/Company";
import { DescriptionChange, EmailChange, EmployeeCountChange, NameChange } from "../functions/FormChangeHandlers";
import SubmitHandler from "../functions/SubmitHandler";
// import SubmitHandler from "../classes/SubmitHandler";

type CompanyProps = {
    setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
    companies: Company[]
    setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

function CompanyForm({ companies, setCompanies, setAlertMessage: setAlertMessage }: CompanyProps) {

    const [company, setCompany] = useState<{ [key: string]: string | number }>({ name: "", email: "", numberOfEmployees: 0, description: "" })

    function SubmitForm() {
        try {
            const newCompany: Company = new Company(
                String(company.name),
                String(company.email),
                Number(company.numberOfEmployees),
                String(company.description),
                companies.length)
            SubmitHandler(company, "company").then((code) => {
                code = 200; // Endpoint hiányában mindig hibát adna, ezért felülírásra kerül
                if (code != 200) {
                    setAlertMessage("Something went wrong")
                    return
                }
                setCompanies(companies => [...(companies ?? []), newCompany])
                setAlertMessage("Company registered successfully")
            })
        }
        catch (e: any) {
            setAlertMessage(e.message)
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