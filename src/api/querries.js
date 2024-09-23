import { baseUrl } from "../utils/api";

export const getQuerries = async(classId)=>{
    const url = `${baseUrl}/api/chat/class/${classId}`
    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (!response.ok) {
            console.log("status is false")
            return { status: false, message: "failed to user details", data:{} }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }



  export const replyToQuerry = async (messageId, message) => {
    const url = `${baseUrl}/api/chat/reply`;
    const body = {
        messageId,
        message
    };
    const token = localStorage.getItem('jwt');
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log("the response", data)
        if (!response.ok) {
            return { status: false, message: "failed to reply to messae",error:data.error  }
        }

        
        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};