import { FC, SyntheticEvent, useEffect, useState } from 'react';
import classes from './CreateErrorButton.module.scss';

const CreateErrorButton: FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  const handelClick = (_event: SyntheticEvent) => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('An error occurred');
    }
  }, [hasError]);

  return (
    <button onClick={handelClick} className={classes.errorButton}>
      Throw Error!
    </button>
  );
};
export default CreateErrorButton;
