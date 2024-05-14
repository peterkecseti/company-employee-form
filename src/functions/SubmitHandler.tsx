import axios from "axios"

export default async function SubmitHandler(postData : any, endpoint : string, CV?: File){
    const formData = new FormData();
    formData.append('data', postData);
    formData.append('test', 'roman')
    if(CV){
        formData.append('CV', CV)
    }

    console.log(formData.get('CV'))
    try{
        const response = await fetch(`˙/api/${endpoint}`,{
            method: 'POST',
            body: formData
        })
    }
    catch(e){
        console.log(e)
    }
    
}