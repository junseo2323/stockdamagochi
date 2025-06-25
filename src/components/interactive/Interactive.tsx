'use client'

import { InteractiveType } from "@/types/type";
import { useState } from "react";
import InteractiveButton from "./InteractiveButton";
import InteractiveDisplay from "./InteractiveDisplay";

export default function Interactive() {
    const [controlProps,setControlProps] = useState<InteractiveType>({
        page: 'home',
        row: 0,
        col: 0,
    });
    
    return(
        <div className="h-80 my-20">
            <InteractiveDisplay 
                page={controlProps.page}  
                row={controlProps.row}
                col={controlProps.col}
                setControlProps={setControlProps}/>
            <InteractiveButton 
                page={controlProps.page}  
                row={controlProps.row}
                col={controlProps.col}
                setControlProps={setControlProps}/>
        </div>
    )
}
/**
 A B C D
 E F G I
 */