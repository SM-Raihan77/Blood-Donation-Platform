"use client";

import { Switch } from '@heroui/react';
import React from 'react';

import { Sun } from "@gravity-ui/icons";
import { Moon } from '@gravity-ui/icons';
import { useTheme } from 'next-themes';



const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>

            <Switch onChange={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {({ isSelected }) => (
                    <div>

                        <Switch.Control
                            className={`h-[31px] w-[51px] bg-[#773617] ${isSelected ? "bg-[#3f0910]" : ""}`}
                        >
                            <Switch.Thumb
                                className={`size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
                            >
                                <Switch.Icon>
                                    {isSelected ? (
                                        <Sun className="size-4 text-black" />
                                    ) : (
                                        <Moon className="size-4 text-[#e9dcca]" />
                                    )}
                                </Switch.Icon>
                            </Switch.Thumb>
                        </Switch.Control>

                    </div>
                )}
            </Switch>
        </>

    );
};


export default ThemeSwitch;