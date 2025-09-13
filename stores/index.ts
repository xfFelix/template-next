'use client';
import { createContext, useContext } from 'react';
import SliderInfo from './Slider';
import UserInfo from './UserInfo';
import RightsInfo from './Rights';

export interface Stores {
  sliderInfo: SliderInfo;
  userInfo: UserInfo;
  rightsInfo: RightsInfo;
}

export const sliderInfo = new SliderInfo();
export const userInfo = new UserInfo();
export const rightsInfo = new RightsInfo();

const storeContext = createContext<Stores>({
  sliderInfo,
  userInfo,
  rightsInfo,
});

export function useStores() {
  return useContext<Stores>(storeContext);
}
