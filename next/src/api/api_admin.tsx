"use client";

import { useState, useEffect, useContext } from "react";
import { Context } from "@/context/context";

type TypeApiActions = "list" | "retrieve" | "create" | "update" | "delete";  

interface IEndPoint {
    method: string;
    url: string;
}

const useAdminApi = (appName: string, action: TypeApiActions): IEndPoint => {
    const { context } = useContext(Context);
    const [endPoint, setEndPoint] = useState<IEndPoint>({ method: "", url: "" });
    
    useEffect(() => {
        if (context.apps && context.apps[appName]) {
            setEndPoint({
                method: '',
                url: ''
            } as IEndPoint);
        }
    }, [context, appName, action]);

    return endPoint;
};

export { useAdminApi }