// @flow
import { UmiComponentProps } from '@/common/type';

interface Props extends UmiComponentProps {}
const PrimaryLayout = (props: Props) => {
  const { children } = props;
  return <div>primaryLayout{children}</div>;
};
export default PrimaryLayout;
