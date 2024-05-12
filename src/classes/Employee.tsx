export default class Employee {

    private name: string;
    private email: string;
    private jobTitle: string;
    private age: number;
    private CV: string;
    private id: number;
    private companyId: number;

    constructor(name: string, email: string, jobTitle: string, age: number, CV: string, id: number, companyId: number) {
        if(name === ""){
            throw new Error("Provide a valid name");
        }

        if(email === ""){
            throw new Error("Provide a valid email address"); //TODO: ezt megcsinalni normalisan
        }

        if(jobTitle === ""){
            throw new Error("Set a valid job title");
        }

        if(age < 18){
            throw new Error("The employee must be over 18");
        }
        
        this.name = name;
        this.email = email;
        this.jobTitle = jobTitle;
        this.age = age;
        this.CV = CV;
        this.id = id;
        this.companyId = companyId;
    }

    GetCompanyId(): number{
        return this.companyId;
    }

    GetName(): string {
        return this.name;
    }

    GetId(): number{
        return this.id;
    }

    GetEmail(): string{
        return this.email;
    }

    GetJobTitle(): string{
        return this.jobTitle;
    }

    GetAge(): number{
        return this.age;
    }
}