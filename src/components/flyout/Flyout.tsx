import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteAllSelectedItems } from '../../store/storeSlices/app-reducer';
import { getNumberOfSelectedItems } from '../../common/utils/utils';
import classes from './Flyout.module.scss';

const Flyout = () => {
  const { selectedItems } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const handleUnselectAll = () => {
    dispatch(deleteAllSelectedItems());
  };

  if (selectedItems.length)
    return (
      <div className={classes.flyout}>
        <p className={classes.flyoutText}>
          {getNumberOfSelectedItems(selectedItems.length)}
        </p>
        <button onClick={handleUnselectAll} className={classes.flyoutBtn}>
          Unselect all
        </button>
        <button className={classes.flyoutBtn}>Download</button>
      </div>
    );
};
export default Flyout;
