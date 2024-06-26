import './css/App.css';
import './css/Responsivity.css'
import { useEffect, useRef, useState } from 'react';
import CompanyForm from './components/CompanyForm';
import EmployeeForm from './components/EmployeeForm';
import Employee from './classes/Employee';
import Company from './classes/Company';
import CompanyList from './components/CompanyList';
import EmployeeList from './components/EmployeeList';

function App() {

  const [initFinished, setInitFinished] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("initial message");

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [selectedCompany, setSelectedCompany] = useState<number>(-1);

  const [files, setFiles] = useState<File[]>([]);

  const companyListRef = useRef<HTMLDivElement>(null);
  const employeeListRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);

  function GenerateDummyData() {
    let dummycompanies = []
    let dummyemployees = []

    for (let i = 0; i < 10; i++) {
      dummycompanies.push(
        new Company(`Company${i}`, `email@company${i}.com`, 100, "description...", i)
      )
    }

    for (let i = 0; i < 200; i++) {
      dummyemployees.push(
        new Employee(`Employee${i}`, `email@employee${i}.com`, "Accountant", Math.floor(Math.random() * 99) + 18, "", i, Math.floor(Math.random() * 10))
      )
    }

    setCompanies(dummycompanies);
    setEmployees(dummyemployees);
  }

  useEffect(() => {
    if (initFinished && alertMessage != "") {
      setError(true)
    }
    else {
      setInitFinished(true)
    }
  }, [alertMessage])


  function ExecuteScroll(destination: React.RefObject<HTMLDivElement>) {
    if (companyListRef) {
      destination.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  return (
    <div>
      <div className={`error-overlay ${error ? 'visible' : 'hidden'}`}>
        <div className="error-popup">
          <p>{alertMessage}</p>
          <button className='form-button' onClick={() => { setAlertMessage(""); setError(false) }}>OK</button>
        </div>
      </div>
      
      
      <div className='container' ref={formsRef}>
        <button onClick={GenerateDummyData}>Dummy data</button>
          <h1>Company Employee form</h1>
          <div className="forms-container">
            <CompanyForm companies={companies} setCompanies={setCompanies} setAlertMessage={setAlertMessage} />
            <EmployeeForm employees={employees} setEmployees={setEmployees} companies={companies} setAlertMessage={setAlertMessage} setFiles={setFiles} files={files} />
            <i className="gg-chevron-double-down-o scroll-button" onClick={() => { ExecuteScroll(companyListRef) }}></i>
          </div>
      </div>

      <div className="container" ref={companyListRef}>
        <div className="employees-container">
          <i className="gg-chevron-double-up-o scroll-button" onClick={() => { ExecuteScroll(formsRef) }}></i>
          {employees.length === 0 ? <h1>No hired employees yet.</h1> : <CompanyList 
                                                                          employees={employees}
                                                                          companies={companies}
                                                                          executeScroll={ExecuteScroll}
                                                                          employeeListRef={employeeListRef}
                                                                          setSelectedCompany={setSelectedCompany} />}
        </div>
      </div>
      {selectedCompany === -1 ? '' : <EmployeeList executeScroll={ExecuteScroll} employeeListRef={employeeListRef} companyListRef={companyListRef} employees={employees} companies={companies} selectedCompany={selectedCompany} files={files} setAlertMessage={setAlertMessage}></EmployeeList>}
    </div>
  );
}

export default App;
