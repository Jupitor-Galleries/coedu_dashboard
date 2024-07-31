import { baseUrl } from "../utils/api";

export const sendWaitList = async(email)=>{
    const url = `${baseUrl}/api/waitlist`
    const body = {
        email
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (!response.ok) {
            console.log("status is false")
            return { status: false, message: data?.message }
        }

        return { status: true, message:data.message }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { status: false, message: "could not add to the list, contact support" }

    }
  }