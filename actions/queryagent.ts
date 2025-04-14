"use server"
import axios from 'axios'
import { revalidateTag } from 'next/cache'


export const queryagent = async (query: string) => {
    try {
        if (query == '') {
            throw new Error("query should not be empty")
        }
        const res = await axios.post("https://finagent-api.onrender.com/api/v1/ask", {
            query
        })
        revalidateTag('gethistory')

        return [res.status, res.data]
    } catch (e: any) {

        return [500, e?.message]

    }
}


export const gethistory = async () => {
    try {
        const res = await fetch("https://finagent-api.onrender.com/api/v1/history", {
            method: "GET",
            next: {
                tags: ['gethistory']
            }
        })
        const data = await res.json()

        return [res.status, data]
    } catch (e: any) {
        return [500, e?.message]
    }
}
