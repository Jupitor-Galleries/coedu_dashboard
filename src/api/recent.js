import { baseUrl } from "../utils/api";

export const getRecentData = async(classId)=>{
    const url = `${baseUrl}/api/recentactivity/class/${classId}`
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
        console.log(data);
        if (!response.ok) {
            console.log("status is false")
            return { status: false, message: "failed to user details", data:{} }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }