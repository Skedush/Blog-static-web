import styles from './index.less';
import { useDispatch } from 'umi';
import { useEffect } from 'react';
import { UmiComponentProps } from '@/common/type';

interface Props extends UmiComponentProps {}
const IndexPage = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'menu/getMenu' });
  }, []);
  console.log('Props: ', props);
  return (
    <div>
      <h1 className={styles.title}>Page Home</h1>
    </div>
  );
};
export default IndexPage;
