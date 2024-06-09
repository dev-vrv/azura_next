'use client';

import { createContext, useState } from 'react';

interface ContextType {
    context: IContext;
    setContext: React.Dispatch<React.SetStateAction<IContext>>;
}

export interface IContext {
    api: {
        host: string;
        name: string;
        description: string;
        version: string;
    };
    apps: string[];
    endpoints: { [key: string]: any };
    actions: { [key: string]: string };
}

const initialContext: IContext = {
    api: {
        host: '',
        name: '',
        description: '',
        version: '',
    },
    apps: [],
    endpoints: {},
    actions: {},
};

export const Context = createContext<ContextType>({
    context: initialContext,
    setContext: () => {},
});

export default function ContextProvider({ children }: {children: React.ReactNode}) {
    const [context, setContext] = useState<IContext>(initialContext);
    return (
        <Context.Provider value={{ context, setContext }}>
            {children}
        </Context.Provider>
    );
};
