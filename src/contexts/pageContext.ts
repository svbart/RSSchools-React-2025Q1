import { createContext, Dispatch, SetStateAction } from 'react';

export interface IPageContext {
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageNumber: number;
  thereIsNext: boolean;
}

export const PageContext = createContext<IPageContext | null>(null);
