export default function Feed() {
    return (
        <div>
          {/**다마고치 배경 */} 
          <div className="absolute z-0 w-80 h-70 m-auto backdrop-blur-[4px] rounded-4xl bg-linear-45 from-[#FFFFFF/0] to-[#FFFFFF] border-1 border-white"></div>

          {/**다마고치 내용_먹이주기*/}
            <div className='relative z-10 w-80 h-65 p-5 grid grid-rows-[0.1fr_0.2fr_1.5fr_1.5fr_1fr]'>
              <p className='text-[#614AD3] font-bold text-2xl'>먹이주기😄</p>
              <p className='text-[#614AD3] text-sm'>매수는 먹이주기, 매도는 다이어트 입니다.</p>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='text-center m-auto'>가격</p>
                <input type='text'
                      placeholder='가격을 입력해주세요'
                      className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
              </div>
              <div className='grid grid-cols-[0.3fr_1fr]'>
                <p className='text-center m-auto'>수량</p>
                <input type='text'
                        placeholder='수량을 입력해주세요'
                        className='m-auto h-10 rounded-xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'/>
                        
              </div>
              <div className='grid grid-cols-[0.4fr_0.5fr]'>
                <button
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    먹이주기</button>
                <button
                  className='w-23 h-10 rounded-2xl backdrop-blur-[4px] bg-linear-45 from-[#FFFFFF/30] to-[#FFFFFF]'>
                    다이어트</button>
              </div>
          </div>
        </div>
      )
}