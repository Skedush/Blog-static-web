// @flow
import { GlobalState, UmiComponentProps } from '@/common/type';
import { useSelector } from 'umi';
import { isEmpty } from 'lodash';
import { Header, Layout } from '@/components';
import store from 'store';

const { Content, Footer } = Layout;

interface Props extends UmiComponentProps {}
const PrimaryLayout = (props: Props) => {
  let { menu } = useSelector(({ menu: { menu } }: GlobalState) => {
    return { menu };
  });
  if (isEmpty(menu)) menu = store.get('menu');

  const { children } = props;
  return (
    <Layout>
      <Header menu={menu} />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
};
export default PrimaryLayout;
