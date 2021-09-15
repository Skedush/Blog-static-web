import BaseLayout from './BaseLayout';
import { UmiComponentProps } from '@/common/type';

interface LayoutProps extends UmiComponentProps {}

const Layout = (props: LayoutProps) => {
  const { children, ...options } = props;
  return <BaseLayout {...options}>{children}</BaseLayout>;
};

export default Layout;
