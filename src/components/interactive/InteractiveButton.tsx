import { InteractiveType } from "@/types/type";
import { useEffect, useState } from "react";

const KeyButtons = ({keys,page,row,col,setControlProps} : {keys: string,page: string,row: number,col: number,setControlProps:React.Dispatch<React.SetStateAction<InteractiveType>>}) => {
    const [maxrow, setMaxrow] = useState<number>(1);
    const [maxcol, setMaxcol] = useState<number>(2);

    const controlMax = () => {
        switch(page){
            case 'home':
                setMaxrow(1);
                setMaxcol(1);
            break;
            case 'feed':
                setMaxrow(1);
                setMaxcol(1);
            break;
        }
    }

    useEffect(()=>{
        controlMax();
    },[page]);

    const onClickHandler = () => {
        switch(keys){
            case 'up':
                setControlProps({
                    page: page,
                    row: row!=0?row-1:0,
                    col: col
                });
            break;
            case 'down':
                setControlProps({
                    page: page,
                    row: row!=maxrow?row+1:maxrow,
                    col: col
                });
            break;
            case 'right':
                setControlProps({
                    page: page,
                    row: row,
                    col: col!=maxcol?col+1:maxcol
                });
            break;
            case 'left':
                setControlProps({
                    page: page,
                    row: row,
                    col: col!=0?col-1:0
                });
            break;
        }
    }
    
    switch(keys){
        case 'up':
            return(
                <div 
                    onClick={()=>{onClickHandler()}}
                    className="select-none col-start-2 bg-[#ffffff]/50 w-10 h-10 rounded-3xl drop-shadow-2xl backdrop-blur-[5px]">
                    <img src='/keys/arrow.png' width={10} className='mx-auto my-3.5 rotate-270'/>
                </div>
            )
        case 'down':
            return(
                <div 
                    onClick={()=>{onClickHandler()}}
                    className="select-none col-start-2 bg-[#ffffff]/50 w-10 h-10 rounded-3xl drop-shadow-2xl backdrop-blur-[5px]">
                    <img src='/keys/arrow.png' width={10} className='mx-auto my-3.5 rotate-90'/>
                </div>
            )
        case 'right':
            return(
                <div 
                    onClick={()=>{onClickHandler()}}
                    className="select-none row-start-2 col-start-3 bg-[#ffffff]/50 w-10 h-10 rounded-3xl drop-shadow-2xl backdrop-blur-[5px]">
                    <img src='/keys/arrow.png' width={10} className='mx-auto my-3.5'/>
                </div>
            )
        case 'left':
            return(
                <div 
                    onClick={()=>{onClickHandler()}}
                    className="select-none row-start-2 col-start-1 bg-[#ffffff]/50 w-10 h-10 rounded-3xl drop-shadow-2xl backdrop-blur-[5px]">
                    <img src='/keys/arrow.png' width={10} className='mx-auto my-3.5 rotate-180'/>
                </div>
            )
        default:
            return(
                <div>

                </div>
            )
    }
    
}


const EnterButton = ({page,row,col,setControlProps} : {page: string,row: number,col: number,setControlProps:React.Dispatch<React.SetStateAction<InteractiveType>>}) => {
    const onClickHandler = () => {
        switch(page){
            //Home 컨트롤 case
            case 'home':
                if(row==0 && col==0){
                    setControlProps({
                        page: 'game',
                        row: 0,
                        col: 0
                    });
                }
                if(row==0 && col==1){
                    setControlProps({
                        page: 'feed',
                        row: 0,
                        col: 0
                    });
                }
                if(row==1 && col==0){
                    setControlProps({
                        page: 'news',
                        row: 0,
                        col: 0
                    });
                }
                if(row==1 && col==1){
                    setControlProps({
                        page: 'study',
                        row: 0,
                        col: 0
                    });
                }
            break;

            //Feed 컨트롤 case
            case 'feed':
                
            break;
        };
    }
    return(
        <div 
            onClick={onClickHandler}
            className="select-none row-span-3 row-start-3 bg-[#ffffff]/50 w-35 h-10 rounded-3xl drop-shadow-2xl backdrop-blur-[5px]">
            <img src='/keys/enter.png' width={10} className='mx-auto my-4'/>
        </div>
    )
}

export default function InteractiveButton({page,row,col,setControlProps} : 
                                            {page:string,row:number,col:number,
                                            setControlProps:React.Dispatch<React.SetStateAction<InteractiveType>>}){
return(
        <div>
            {/**다마고치 배경 */} 
            <div className="absolute z-0 w-80 h-40 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-40 p-5 grid grid-cols-2 gap-1'>
                <div className="grid grid-cols-3 grid-rows-3 gap-1 my-auto">
                    <EnterButton page={page} row={row} col={col} setControlProps={setControlProps}/>
                    <KeyButtons keys="up" setControlProps={setControlProps} page={page} row={row} col={col}/>
                    <KeyButtons keys="down" setControlProps={setControlProps} page={page} row={row} col={col}/>
                    <KeyButtons keys="left" setControlProps={setControlProps} page={page} row={row} col={col}/>
                    <KeyButtons keys="right" setControlProps={setControlProps} page={page} row={row} col={col}/>
                </div>
            </div>
        </div>
    )
}