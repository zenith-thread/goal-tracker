import {
  createSlice,
  createEntityAdapter,
  createSelector,
  nanoid,
} from "@reduxjs/toolkit";

const quartersAdaptor = createEntityAdapter({
  selectId: (quarter) => quarter.id,
  sortComparer: (a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.qtr - b.qtr;
  },
});

const INITIAL_STATE = quartersAdaptor.getInitialState();

const quartersSlice = createSlice({
  name: "quarters",
  initialState: INITIAL_STATE,
  reducers: {
    addQuarter: {
      reducer: quartersAdaptor.addOne,
      prepare: ({ year, qtr }) => {
        // map quarter index to dates
        const ranges = {
          1: ["01-01", "03-31"],
          2: ["04-01", "06-30"],
          3: ["07-01", "09-30"],
          4: ["10-01", "12-31"],
        };
        const [startSuffix, endSuffix] = ranges[qtr];
        const startDate = `${year}-${startSuffix}`;
        const endDate = `${year}-${endSuffix}`;

        return {
          payload: {
            id: nanoid(),
            year,
            qtr,
            title: `Q${qtr} ${year}`,
            startDate,
            endDate,
          },
        };
      },
    },
    updateQuarter: quartersAdaptor.updateOne,
    removeQuarter: quartersAdaptor.removeOne,
  },
});

export const { addQuarter, updateQuarter, removeQuarter } =
  quartersSlice.actions;

export const quartersReducer = quartersSlice.reducer;

export const {
  selectAll: selectAllQuarters,
  selectById: selectQuarterById,
  selectIds: selectQuarterIds,
  selectEntities: selectQuarterEntities,
} = quartersAdaptor.getSelectors((state) => state.quarters);

/** helpers: list quarters for a given year */
export const selectQuartersByYear = createSelector(
  [selectAllQuarters, (state, year) => year],
  (quarters, year) => quarters.filter((q) => q.year === year)
);
