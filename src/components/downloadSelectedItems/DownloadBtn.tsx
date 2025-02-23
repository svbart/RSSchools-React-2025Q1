import { PlanetCharacteristics } from '../../common/types/types';
import { getNumberOfSelectedItems } from '../../common/utils/utils';
import { useAppSelector } from '../../store/hooks';
import classes from './DownloadBtn.module.scss';

const DownloadBtn = () => {
  const { selectedItems } = useAppSelector((state) => state.app);

  const convertToCSV = (data: PlanetCharacteristics[]) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (data: PlanetCharacteristics[]) => () => {
    const filename: string = `${getNumberOfSelectedItems(data.length)}.csv`;
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <button className={classes.flyoutBtn} onClick={downloadCSV(selectedItems)}>
      Download
    </button>
  );
};

export default DownloadBtn;
