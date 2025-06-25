import { InteractiveType } from "@/types/type";

const interactiveTest = ({page,row,col} : {page:string,row:number,col:number}) => {
    return(
        <div className="pt-30">
            <p>페이지: {page} row: {row} col: {col}</p>
        </div>
    )
}

//d198ff

const displayControl = ({page,row,col} : {page:string,row:number,col:number}) => {
    switch(page){
        case 'home':
            return(
                <div className="grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-25">
                    <div className={`w-20 h-20 m-auto backdrop-blur-[4px] rounded-2xl border-1 border-white `+
                                    ((row==0&&col==0)?`bg-linear-45 from-[#FFFFFF/0] to-[#e5c5ff]`:`bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF]`)}>
                        <img src='/interactive/play.png' width={40} className='mx-auto mt-5'/>
                    </div>
                    <div className={`w-20 h-20 m-auto backdrop-blur-[4px] rounded-2xl border-1 border-white `+
                                    ((row==0&&col==1)?`bg-linear-45 from-[#FFFFFF/0] to-[#e5c5ff]`:`bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF]`)}>
                        먹이주기
                    </div>
                    <div className={`w-20 h-20 m-auto backdrop-blur-[4px] rounded-2xl border-1 border-white `+
                                    ((row==1&&col==0)?`bg-linear-45 from-[#FFFFFF/0] to-[#e5c5ff]`:`bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF]`)}>
                        뉴스보기
                    </div>
                    <div className={`w-20 h-20 m-auto backdrop-blur-[4px] rounded-2xl border-1 border-white `+
                                    ((row==1&&col==1)?`bg-linear-45 from-[#FFFFFF/0] to-[#e5c5ff]`:`bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF]`)}>
                        공부하기
                    </div>
                </div>
            )
        case 'game':
            return(
                <div>
                    game!
                </div>
            )
        case 'feed':
            return(
                <div>
                    FEED!
                </div>
            )
        case 'news':
            return(
                <div>
                    news!
                </div>
            )
        case 'study':
            return(
                <div>
                    study!
                </div>
        )
    }
    return(<div></div>)
}


export default function InteractiveDisplay({page,row,col,setControlProps} : 
                        {page:string,row:number,col:number,
                        setControlProps:React.Dispatch<React.SetStateAction<InteractiveType>>}){
    return(
        <div className="my-10">
            {/**다마고치 배경 */} 
            <div className="absolute z-0 w-80 h-55 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

            <div className='scrollbar-hide overflow-y-auto relative z-10 w-80 h-55 p-5 grid grid-rows-6 gap-4'>
                {   displayControl({                        
                        page: page,
                        row: row,
                        col: col
                    })}
                {
                    interactiveTest({
                        page: page,
                        row: row,
                        col: col
                    })
                }
            </div>
        </div>
    )
}