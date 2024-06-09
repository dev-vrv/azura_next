"use client";

import React from 'react';
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function ThemeProvider({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="data-bs-theme" defaultTheme="dark" >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}