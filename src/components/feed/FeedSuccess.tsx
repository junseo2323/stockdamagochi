export default function FeedSuccess() {
    return (
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-70 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 내용_먹이주기*/}
            <div className='relative z-10 w-80 h-65 p-5 grid grid-rows-[0.1fr_0.2fr_1.5fr_1.5fr_1fr_1fr]'>
              <p className='text-[#614AD3] font-bold text-2xl'>먹이주기😄</p>
              <p className='text-[#614AD3] text-sm'>먹이주기가 성공했습니다!</p>
              <p className='text-[#614AD3] text-sm'>평단가 140$ → 152$</p>
              <p className='text-[#614AD3] text-sm'>경험치 12500px → 13500px</p>
              <p className='text-[#614AD3] font-bold text-sm'>애플이가 즐거워하고 있어요!</p>
              <button
                  className='ml-45 w-23 h-10 font-bold rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    홈으로</button>

            </div>
        </div>
      )
}