
export async function processCommand(input: string): Promise<string> {

    if (input.startsWith('펫 추가')) {
      const match = input.match(/^펫 추가\s+(\S+)\s+(\S+)\s+(\d+)\s+([\d.]+)$/);
      if (match) {
        const [, ticker, nickname, quantityStr, buyAvgPriceStr] = match;
        
        
        const body = {
          ticker,
          nickname,
          avgBuyPrice: Number(buyAvgPriceStr),
          quantity: Number(quantityStr),
        };
  
        try {
          const res = await fetch('/api/pet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
  
          if (!res.ok) {
            const error = await res.text();
            return `❌ 등록 실패: ${error}`;
          }
  
          return `✅ ${nickname} 펫 등록 완료!`;
        } catch (err) {
          return `🚨 에러 발생: ${(err as Error).message}`;
        }
      }
  
      return '❗ 잘못된 형식이에요. 예: 펫 추가 AAPL 애플이 3 198.5';
    }
  
    if (input.match('펫 목록')){
        try {
            const res = await fetch('/api/pet')
    
            if (!res.ok) {
              const error = await res.text();
              return `❌ 등록 실패: ${error}`;
            }
            const pets = await res.json(); 
            console.log(pets)
            if (pets.pets.length === 0) return '😿 등록된 펫이 없어요!';
            const list = pets.pets.map((p: any) => `${p.nickname} (${p.ticker})`).join(', ');
            return `✅ 펫 목록: ${list}`;
    
          } catch (err) {
            return `🚨 에러 발생: ${(err as Error).message}`;
          }
    }
    
    if (input.startsWith('펫 정보')){
        const match = input.match(/^펫 정보\s+(\S+)$/);
        if(match){
            const [, nickname] = match;
            const res = await fetch('/api/pet')
    
            if (!res.ok) {
              const error = await res.text();
              return `❌ 등록 실패: ${error}`;
            }
            const pets = await res.json(); 

            if (pets.pets.length === 0) return '😿 등록된 펫이 없어요!';
            const findedPet = pets.pets.find((e: any) => e.nickname == nickname)

            const ress = await fetch(`/api/price?ticker=${findedPet.ticker}`);
            const { price: currentPrice } = await ress.json();
            
            const profit = (currentPrice - findedPet.avgBuyPrice) * findedPet.quantity;
            
            const resss = await fetch(`/api/pet/${findedPet._id}/emotion`, {
              method: 'PATCH',
            });
            const data = await resss.json();

            const Pet = pets.pets.find((e: any) => e.nickname == nickname)

            return [
              `🐶 이름: ${Pet.nickname}`,
              `💹 티커: ${Pet.ticker}`,
              `📦 수량: ${Pet.quantity}주`,
              `💰 평단: ${Pet.avgBuyPrice}`,
              `💰 현재가: ${currentPrice}`,
              `💰 손익: ${profit}`,
              `😊 기분: ${Pet.emotion}`
            ].join('\n');
    
        }

        return '❗ 잘못된 형식이에요. 예: 펫 정보 애플이'
    }
    
    if (input.startsWith('펫 삭제')){
      const match = input.match(/^펫 삭제\s+(\S+)$/);
      if(match){
        const [, ticker] = match;

        const ress = await fetch('/api/pet')
    
        if (!ress.ok) {
          const error = await ress.text();
          return `❌ 등록 실패: ${error}`;
        }
        const pets = await ress.json(); 

        if (pets.pets.length === 0) return '😿 등록된 펫이 없어요!';
        const findedPet = pets.pets.find((e: any) => e.ticker == ticker);
        const _id = findedPet._id;

        const res = await fetch('/api/pet/'+_id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const error = await res.text();
          return `❌ 등록 실패: ${error}`;
        }

        return `✅ ${_id} 펫 삭제 완료!`;      
    }

      return '❗ 잘못된 형식이에요. 예: 펫 삭제 AAPL'
    }



    return '❓ 알 수 없는 명령입니다.';
  }
  