import { baseUrl } from "../utils/api";

export const addStudents = async (students, classId) => {
    const url = `${baseUrl}/api/students/add-multiple`;
    const body = {
        students,
        classId,
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
            return { status: false, message: "failed to submit assignment",error:data.error  }
        }

        
        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
