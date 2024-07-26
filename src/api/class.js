import { baseUrl } from "../utils/api";

export const addClass = async (name, startDate, endDate) => {
    const url = `${baseUrl}/api/classes/create`

    const body = {
        name,
        startDate,
        endDate
    };

    try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log("status is false")
        return { status: false, message: "failed to create class"  }

        }

        const data = await response.json();
        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export const getUserClasses = async() => {
    const url = `${baseUrl}/api/classes/user`

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
            return { status: false, message: "failed to get classes",data : []  }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export const getClassDetails = async (id) => {
    const url = `${baseUrl}/api/classes/${id}`
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
            return { status: false, message: "failed to get class details", data:{} }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export const addStudent = async (classId, name, whatsappNumber)=>{
    const url = `${baseUrl}/api/students/add`

    const body = {
        classId,
        name,
        whatsappNumber
    };

    try {
        const token = localStorage.getItem('jwt');
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
            console.log("status is false")
            return { status: false, message: "failed to add student"  }
        }

        
        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


export const getClassStudents = async (classId)=>{
    const url = `${baseUrl}/api/students/${classId}`

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
            return { status: false, message: "failed to get students", data:[] }
        }

        return { status: true, data: data }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}