'use client';

import { useEffect, useState, useRef } from 'react';
import {useAuth} from "@/contexts/AuthContext";
import { AnimatePresence, motion } from 'framer-motion';
import api from '@/lib/api';
import {Pet} from '@/types/type';
import { fetchPets } from '@/lib/api';

import HomeList from './home/HomeList';
import HomeModify from './home/HomeModify';
import Feed from './feed/Feed';
import Add from './add/Add';
import AddSuccess from './add/AddSuccess';
import FeedSuccess from './feed/FeedSuccess';

export default function Command(props: {}) {
    const {command} = useAuth()

    const page = command?.page;
    const index = command?.index;

    const [pets, setPets] = useState<Pet[]>([]);
    const [addedpets, setAddedpets] = useState<Pet>();
    const [modifypet,setModifypet] = useState<Pet>();
    const [animationKey, setAnimationKey] = useState(`${page}-${index}`);

    useEffect(() => {
      setAnimationKey(`${page}-${index}`);

      if (page === 1 && index === '홈_리스트') {
        const fetchData = async () => {
          try {
            const res = await fetchPets();
            setPets(res);
          } catch (error) {
            console.error('Failed to fetch pets:', error);
          }
        };
        fetchData();
      }
      if (page === 3 && index === '추가하기_성공') {
        const fetchData = async () => {
          try {
            const res = await fetchPets();
            const petdata = res[res.length - 1];
            setAddedpets(petdata);
          } catch (error) {
            console.error('Failed to fetch pets:', error);
          }
        };
        fetchData();
      }
    }, [page, index]);
      
    const renderComponents = {
        1: {
          '홈_리스트': () => <HomeList pets={pets} setModifypet={setModifypet} />,
          '홈_수정': () => <HomeModify modifypet={modifypet} />,
        },
        2: {
          '먹이주기': () => <Feed />,
          '먹이주기_성공': () => <FeedSuccess />,
        },
        3: {
          '추가하기': () => <Add />,
          '추가하기_성공': () => <AddSuccess addedpets={addedpets} />,
        }
    };  

    const toggleCommand = () => {
        const componentRenderer = renderComponents[page]?.[index];
        return componentRenderer ? componentRenderer() : <div />;
    };
  
    return(
        <div   className="
        fixed
        bottom-1/6
        left-1/2
        transform -translate-x-1/2
        flex justify-center items-center w-full
      "
    >
          <AnimatePresence mode="wait">
              <motion.div
                  key={animationKey}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                  {toggleCommand()}
              </motion.div>
          </AnimatePresence>
        </div>

    )
}
