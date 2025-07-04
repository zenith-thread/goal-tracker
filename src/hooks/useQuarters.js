import { useDispatch, useSelector } from "react-redux";
import {
  addQuarter,
  updateQuarter,
  removeQuarter,
  selectAllQuarters,
  selectQuarterById,
  selectQuartersByYear,
} from "../store/quarters/quarters.reducer";

export function useQuarters() {
  const dispatch = useDispatch();
  const all = useSelector(selectAllQuarters);

  const createQuarter = ({ year, qtr }) => dispatch(addQuarter({ year, qtr }));

  const editQuarter = ({ id, changes }) =>
    dispatch(updateQuarter({ id, changes }));

  const deleteQuarter = (id) => dispatch(removeQuarter(id));

  const getQuarter = (id) =>
    useSelector((state) => selectQuarterById(state, id));

  const getById = (id) => useSelector((state) => selectQuarterById(state, id));

  const getByYear = (year) =>
    useSelector((state) => selectQuartersByYear(state, year));

  return {
    quarters: all,
    createQuarter,
    editQuarter,
    deleteQuarter,
    getQuarter,
    getById,
    getByYear,
  };
}
