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