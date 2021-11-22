import { GlobalState, UmiLocation } from '@/common/type';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useLocation, useSelector, useHistory } from 'umi';
import { Icon, List, Space } from '@/components';
import { isEmpty } from 'lodash';
import store from 'store';
import qs from 'qs';

const { MessageOutlined, LikeOutlined, StarOutlined } = Icon;

export default function IndexPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation() as UmiLocation;
  const query = location?.query;
  const defaultSize = 10;
  const defaultPage = 1;

  let { articleList, menu } = useSelector(
    ({ articleList: { articleList }, menu: { menu } }: GlobalState) => {
      return { articleList, menu };
    },
  );
  if (isEmpty(menu)) menu = store.get('menu');

  useEffect(() => {
    dispatch({
      type: 'articleList/getArticleList',
      payload: {
        category: query?.menu || menu[0].id,
        page: query?.page || defaultPage,
        size: query?.size || defaultSize,
      },
    });
  }, [location?.search]);

  const onArticleClick = (item: { id: any }) => {
    const params = { id: item.id };
    const pathname = '/blog/article' + '?' + qs.stringify(params);
    history.push(pathname);
  };

  const onPaginationChange = (page: number) => {
    const newQuery = { ...query, page: page };
    const pathname = location.pathname + '?' + qs.stringify(newQuery);
    history.push(pathname);
  };

  const IconText = ({
    icon,
    text,
  }: {
    icon: React.FunctionComponent<any>;
    text: string;
  }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const renderList = () => {
    const current = parseInt(query?.page) || defaultPage;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          current,
          onChange: onPaginationChange,
          pageSize: defaultSize,
          total: articleList?.count,
        }}
        dataSource={articleList?.content}
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
          >
            <List.Item.Meta
              title={<a onClick={(e) => onArticleClick(item)}>{item.title}</a>}
              description={item.sub_title}
            />
          </List.Item>
        )}
      />
    );
  };
  return (
    <div className={classNames('flex', 'flex-auto', 'flex-col-start ')}>
      <h1>Page ArticleList</h1>
      {renderList()}
    </div>
  );
}
