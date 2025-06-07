'use client';

import api from "@/lib/api";

type Pet = {
  _id: string;
  ticker: string;
  nickname: string;
  quantity: number;
  avgBuyPrice: number;
  emotion: string;
  level: number;
};

async function fetchPets(): Promise<Pet[]> {
  const res = await api.get('/pet');
  return res.data.pets;
}

//닉네임을 활용해서 펫 정보 검색 
async function findPetByNickname(nickname: string): Promise<Pet | undefined> { 
  const pets = await fetchPets();
  return pets.find(p => p.nickname === nickname);
}

//TICKER을 활용해서 펫 정보 검색
async function findPetByTicker(ticker: string): Promise<Pet | undefined> {
  const pets = await fetchPets();
  return pets.find(p => p.ticker === ticker);
}

//TICKER을 활용해서 해당 주가 검색
async function fetchCurrentPrice(ticker: string): Promise<number> {
  const res = await api.get(`/price`, { params: { ticker } });
  return res.data.price;
}

export async function processCommand(
  input: string,
  tamagochiSetting: (ticker: string, emotion: string, nickname: string, level: number, avgBuyPrice: number ) => void,
  tamagochiMessageSetting: (message: string) => void
): Promise<string> {
  try {
    if (input.includes('메세지테스트')) {
      tamagochiMessageSetting('안녕하세요?');
      return 'TEST';
    }
    
    //** 뉴스 관련 명령어 */
    if (input.startsWith('뉴스')) {
      const match = input.match(/^뉴스\s+(\S+)$/);
      if (!match) return '❗ 잘못된 형식이에요. 예: 뉴스 AAPL';
    
      const [, ticker] = match;
    
      try {
        // API 호출 (fetch 예시, 너가 쓰는 api.get 대신 바꾸면 됨)
        const res = await api.get('/news', { params: { ticker } });
        const data = res.data

        if (!data.news || !Array.isArray(data.news) || data.news.length === 0) {
          return `❗ ${ticker} 관련 뉴스가 없어요.`;
        }
    
        // 뉴스 배열을 포맷팅
        const formatted = data.news
          .map((item: any, idx: number) => {
            return `${idx + 1}. 제목: ${item.title || '제목 없음'}
       감성: ${item.sentiment || '알 수 없음'}`;
          })
          .join('\n\n');
    
        return formatted;
    
      } catch (error) {
        console.error('뉴스 API 호출 에러:', error);
        return '❗ 뉴스 정보를 불러오는 중 오류가 발생했어요.';
      }
    }
    

    //**펫 관련 명령어 */

    if (input.startsWith('펫 추가')) {
      const match = input.match(/^펫 추가\s+(\S+)\s+(\S+)\s+(\d+)\s+([\d.]+)$/);
      if (!match) return '❗ 잘못된 형식이에요. 예: 펫 추가 AAPL 애플이 3 198.5';

      const [, ticker, nickname, quantityStr, avgBuyPriceStr] = match;
      await api.post('/pet', {
        ticker,
        nickname,
        avgBuyPrice: Number(avgBuyPriceStr),
        quantity: Number(quantityStr),
      });

      const pet = await findPetByNickname(nickname);
      if (!pet) return '❌ 펫 등록 후 찾을 수 없습니다.';

      await api.patch(`/pet/${pet._id}/emotion`);

      return `✅ ${nickname} 펫 등록 완료!`;
    }

    if (input.startsWith('펫 목록')) {
      const pets = await fetchPets();
      if (pets.length === 0) return '😿 등록된 펫이 없어요!';
      const list = pets.map(p => `${p.nickname} (${p.ticker})`).join(', ');
      return `✅ 펫 목록: ${list}`;
    }

    if (input.startsWith('펫 정보')) {
      const match = input.match(/^펫 정보\s+(\S+)$/);
      if (!match) return '❗ 잘못된 형식이에요. 예: 펫 정보 애플이';

      const [, nickname] = match;
      const pet = await findPetByNickname(nickname);
      if (!pet) return '😿 해당 펫을 찾을 수 없어요.';

      const currentPrice = await fetchCurrentPrice(pet.ticker);
      const profit = (currentPrice - pet.avgBuyPrice) * pet.quantity;

      await api.patch(`/pet/${pet._id}/emotion`);

      tamagochiSetting(pet.ticker, pet.emotion, pet.nickname, pet.level, pet.avgBuyPrice);
      
      return [
        `🐶 이름: ${pet.nickname}`,
        `💹 티커: ${pet.ticker}`,
        `📦 수량: ${pet.quantity}주`,
        `💰 평단: ${pet.avgBuyPrice}`,
        `💰 현재가: ${currentPrice}`,
        `💰 손익: ${profit}`,
        `😊 기분: ${pet.emotion}`,
      ].join('\n');
    }

    if (input.startsWith('펫 삭제')) {
      const match = input.match(/^펫 삭제\s+(\S+)$/);
      if (!match) return '❗ 잘못된 형식이에요. 예: 펫 삭제 AAPL';

      const [, ticker] = match;
      const pet = await findPetByTicker(ticker);
      if (!pet) return '😿 해당 펫을 찾을 수 없어요.';

      await api.delete(`/pet/${pet._id}`);
      return `✅ ${pet.nickname} (${pet.ticker}) 펫 삭제 완료!`;
    }

    return '❓ 알 수 없는 명령입니다.';
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요.';
    return `🚨 에러 발생: ${message}`;
  }
}
