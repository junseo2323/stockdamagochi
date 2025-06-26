import { useAuth } from "@/contexts/AuthContext";
import { expUp, findPetByNickname } from "@/lib/api";
import { InteractiveType } from "@/types/type";
import { useEffect, useState } from "react";

type Data = {
    number: number;
    comment: string;
    ishidden: boolean;
    type: string;
    answer: string;
    timer: number;
    compensation: number;
}

const dummyData =[
    {
        "number": 1,
        "comment": "주식에서 매수는 \"주식을 구매하는 행위\"를 나타낸다.",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 2,
        "comment": "문제테스트2",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 3,
        "comment": "문제테스트3",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 4,
        "comment": "문제테스트4",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 5,
        "comment": "문제테스트5",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 6,
        "comment": "문제테스트6",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 7,
        "comment": "문제테스트7",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },
    {
        "number": 8,
        "comment": "문제테스트8",
        "ishidden": false,
        "type": "oX",
        "answer": "O",
        "timer": 5,
        "compensation": 5
    },

]
  

const interactiveTest = ({page,row,col} : {page:string,row:number,col:number}) => {
    return(
        <div >
            <p>페이지: {page} row: {row} col: {col}</p>
        </div>
    )
}

const displayControl = ({setControlProps,page,row,col} : 
                        {setControlProps:React.Dispatch<React.SetStateAction<InteractiveType>>,page:string,row:number,col:number}) => {
    

    const {tamagochiInfo} = useAuth();
    const quizGiveExp = async() => {
        const pet = await findPetByNickname(tamagochiInfo?.nickname);
        if (!pet) {return;};
        const newExp = pet.exp+comp;
        expUp(pet._id,newExp,pet.level);
    }
    const goHome = () => {
        setIsplay(false);
        setControlProps({
            page: 'home',
            col: 0,
            row: 0
        });
    };

    //study 개발영역
    const quizlist = [1,3,5,7,8]
    const [answer, setAnswer] = useState<string>('');
    const [comp, setComp] = useState<number>(0);
    const [isplay,setIsplay] = useState<boolean>(false);
    const [playcount, setPlaycount] = useState<number>(0);
    const [data, setData] = useState<Data | undefined>(undefined);
    const [timer, setTimer] = useState<number>(0);
    const [progressWidth, setProgressWidth] = useState<string>('0%');

    useEffect(()=>{ //게임 초기화
        if(!isplay){
            setAnswer('');
            setComp(0);
            setPlaycount(0);
            setData(undefined);
            setTimer(0);
            setProgressWidth('0%');
        }
    },[isplay]);

    useEffect(()=>{//퀴즈 진행 여부
        console.log("page",page , isplay)
        if(page==='study')setIsplay(true);
    },[page]);

    useEffect(()=>{ //타이머 출력
        if (!isplay) return;
        setProgressWidth(`${timer}%`);
    },[timer]);
    useEffect(() => { //타이머 계산
        if (!data?.timer || !isplay) return;
      
        const totalDuration = data.timer * 1000; // 초 → 밀리초
        const tickInterval = 100; // 0.1초마다
        const steps = totalDuration / tickInterval; // 총 단계 수
      
        let currentStep = 0;
      
        const interval = setInterval(() => {
          currentStep += 1;
          const progress = Math.min((currentStep / steps) * 100, 100);
      
          setTimer(progress); // 백분율로 저장
        }, tickInterval);
      
        return () => clearInterval(interval);
      }, [data]);
    useEffect(()=>{ //문제 작동
        console.log(isplay)
        if (!isplay) return;
        if (playcount >= quizlist.length) {
            quizGiveExp();
            setControlProps({
                page: 'study_finish',
                row: 0,
                col: 0
            });
        }
        const res = dummyData;
        const quiz = res.filter(i => quizlist.includes(i.number));
        setData(quiz[playcount]);
    },[playcount,isplay]);
    

    const onclickhandler = (answer: string) => {
        if(isplay) setAnswer(answer);
    }

    useEffect(()=>{ //퀴즈 판단
        if(isplay){
            if(answer === data?.answer){
                setControlProps({
                    page: 'study_yes',
                    row: 0,
                    col: 0
                });
                setTimeout(() => {//3초 대기
                    setComp(comp+data.compensation);
                    setPlaycount(playcount+1);
                    setControlProps({
                        page: 'study',
                        row: 0,
                        col: 0
                    });
                    setAnswer('');
                }, 3000);
            }
            
            else if(answer !== '') {
                setControlProps({
                    page: 'study_no',
                    row: 0,
                    col: 0
                });
                setTimeout(() => {//3초 대기
                    setPlaycount(playcount+1);
                    setControlProps({
                        page: 'study',
                        row: 0,
                        col: 0
                    });
                    setAnswer('');
                }, 3000);
            }
        }
    },[answer]);

    useEffect(() => {
        if (timer === 100 && isplay && answer === '') {
            setControlProps({ page: 'study_no', row: 0, col: 0 });
            setTimeout(() => {
                setPlaycount(prev => prev + 1);
                setControlProps({ page: 'study', row: 0, col: 0 });
                setAnswer('');
            }, 3000);
        }
    }, [timer]);

    

    //study 개발영역 끝
    
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
        {/**공부하기 화면모음 */}
        case 'study':
            return(
                <div className="grid grid-rows-[1fr_1fr_1fr_1fr_1fr] place-items-center">
                    <p className="text-center text-lg text-[#614AD3] font-bold">공부하기😄</p>
                    <div className="w-40 bg-white rounded-full h-2">
                        <div
                        className="h-2 bg-gradient-to-r from-[#837DFF] to-[#FFFFFF] rounded-full transition-all duration-300"
                        style={{ width: progressWidth }}
                        />     
                    </div>    
                    <div>
                        <p className="text-center font-bold text-[#614AD3]">[{(data?.ishidden?<>히든미션</>:<>일반미션</>)}]</p>
                        <p className="text-center text-[#614AD3] text-sm">{data?.comment}</p>
                    </div>           
                    <div className="grid grid-cols-2 place-items-center gap-5 ">
                        <div
                            onClick={()=>{onclickhandler('O')}} 
                            className="place-items-center w-30 h-23 backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white">
                            <p className="text-7xl mt-1 text-[#FF9696] select-none">O</p>
                        </div>
                        <div
                            onClick={()=>{onclickhandler('X')}}  
                            className="place-items-center w-30 h-23 backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white">
                            <p className="text-7xl mt-1 text-[#96B7FF] select-none">X</p>
                        </div>
                    </div>
                </div>
        )
        case 'study_yes':
            return(
                <div className="grid grid-rows-[1fr_1fr_1fr_1fr_1fr] place-items-center">
                    <p className="text-center text-lg text-[#614AD3] font-bold">공부하기😄</p>
                    <p className="text-[#614AD3] text-center">와우! 정답입니다.</p>
                    <p className="text-[#614AD3] text-center">경험치 : +{data?.compensation}Exp</p>
                </div>
        )
        case 'study_no':
            return(
                <div className="grid grid-rows-[1fr_1fr_1fr_1fr_1fr] place-items-center">
                    <p className="text-center text-lg text-[#614AD3] font-bold">공부하기😄</p>
                    <p className="text-[#D34A5C] text-center">땡! 틀렸습니다.</p>
                    <p className="text-[#D34A5C] text-center">정답 : {data?.answer}</p>
                </div>
        )
        case 'study_finish':
            return(
                <div className="grid grid-rows-[1fr_1fr_1fr_1fr_1fr] place-items-center">
                    <p className="text-center text-lg text-[#614AD3] font-bold">공부하기😄</p>
                    <p className="text-[#614AD3] text-center text-lg font-bold">퀴즈가 종료되었습니다.</p>
                    <p className="text-[#614AD3] text-center">총 흭득 Exp : {comp} </p>
                    <div className="select-none" onClick={()=>{goHome()}}>돌아가기</div>
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
                        setControlProps: setControlProps,                        
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