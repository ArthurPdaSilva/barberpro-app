import { signOut } from "@/context/Auth";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";
import { AuthTokenError } from "./errors/AuthTokenError";

function setupApiClient(ctx: undefined |  GetServerSidePropsContext<ParsedUrlQuery, PreviewData> = undefined) {
    const cookies = parseCookies(ctx);
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: `Bearer ${cookies['@auth.token']}`
        }
    })

    api.interceptors.response.use(r => { return r }, (err: AxiosError) => {
        if(err.response?.status === 401) {
            if(typeof window !== undefined) signOut(); 
            else return Promise.reject(new AuthTokenError());
        }
        
        return Promise.reject(err);
    })

    return api;
}

export default setupApiClient();