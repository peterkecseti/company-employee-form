export default class Company {

    private name: string;
    private email: string;
    private numberOfEmployees: number;
    private description: string;
    private id: number;

    constructor(name: string, email: string, numberOfEmployees: number, description: string, id: number) {
        const emailRegex : RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if(name === ""){
            throw new Error("Provide a valid company name");
        }

        if(!emailRegex.test(email)){
            throw new Error("Provide a valid email address");
        }

        if(numberOfEmployees < 1 || numberOfEmployees > 100){
            throw new Error("Employee count must be between 1 and 100");
        }

        this.name = name;
        this.email = email;
        this.numberOfEmployees = numberOfEmployees;
        this.description = description;
        this.id = id;
    }

    public GetName(): string{
        return this.name;
    }

    public GetId(): number{
        return this.id;
    }

    public GetEmployeeCount(): number{
        return this.numberOfEmployees;
    }
}