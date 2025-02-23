import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlanetCharacteristics } from '../../common/types/types';
import { PlanetsResponse } from '../../services/planetsApi';

export interface IAppState {
  selectedItems: PlanetCharacteristics[];
  searchValue: string;
  itemToShowDetails: PlanetCharacteristics | null;
  pageNumber: number;
  currentPageData: PlanetsResponse;
}

const initialState: IAppState = {
  selectedItems: [],
  searchValue: '',
  itemToShowDetails: null,
  pageNumber: 1,
  currentPageData: {} as PlanetsResponse,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateSelectedItems: (
      state,
      item: PayloadAction<PlanetCharacteristics>
    ) => {
      const selectedItems = state.selectedItems;
      const isSelected = selectedItems.find(
        (el) => el.url === item.payload.url
      );
      if (isSelected) {
        state.selectedItems = selectedItems.filter(
          (element) => element.url !== item.payload.url
        );
        return;
      }
      state.selectedItems.push(item.payload);
    },
    deleteAllSelectedItems: (state) => {
      state.selectedItems = [];
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setItemToShowDetails: (
      state,
      action: PayloadAction<PlanetCharacteristics | null>
    ) => {
      state.itemToShowDetails = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setCurrentPageData: (state, action: PayloadAction<PlanetsResponse>) => {
      state.currentPageData = action.payload;
    },
  },
});

export const {
  updateSelectedItems,
  deleteAllSelectedItems,
  setSearchValue,
  setItemToShowDetails,
  setPageNumber,
  setCurrentPageData,
} = appSlice.actions;

export default appSlice.reducer;
