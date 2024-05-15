import axios from "axios"

export default async function SubmitHandler(postData: any, endpoint: string, CV?: File) {
    const formData = new FormData();
    formData.append('data', postData);
    if (CV) {
        formData.append('CV', CV)
    }

    const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        body: formData
    })
    return response.status;
}