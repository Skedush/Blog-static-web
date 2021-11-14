// @flow
import { Menu, Layout } from '@/components';
import { UmiLocation } from '@/common/type';
import { useEffect, useState } from 'react';
import { history, useLocation } from 'umi';
import qs from 'qs';
const { SubMenu, Item } = Menu;

interface Props {
  menu: any[];
}
export const Header = (props: Props) => {
  const { menu } = props;
  const [current, setCurrent] = useState<string>(menu?.[0]?.id?.toString());
  const location = useLocation() as UmiLocation;

  const handleClick = (e: { key: any }) => {
    if (e.key === current) {
      return;
    }
    const params = { menu: e.key };
    const pathname = location.pathname + '?' + qs.stringify(params);
    history.push(pathname);
  };

  useEffect(() => {
    const query = location?.query;
    setCurrent(query.menu || menu?.[0]?.id?.toString());
  }, [location?.search]);

  const renderMenuItem = (item: any) => {
    if (item.children.length > 0) {
      return (
        <SubMenu key={item.id} title={item.name} onTitleClick={handleClick}>
          {item.children.map((childrenItem: any) =>
            renderMenuItem(childrenItem),
          )}
        </SubMenu>
      );
    } else {
      return <Item key={item.id}>{item.name}</Item>;
    }
  };
  return (
    <Layout.Header>
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[current]}
        onClick={handleClick}
      >
        {menu.map((item) => renderMenuItem(item))}
      </Menu>
    </Layout.Header>
  );
};
