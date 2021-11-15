import { GlobalState, UmiLocation } from '@/common/type';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useLocation, useSelector } from 'umi';
import { Icon, List, Space } from '@/components';

const { MessageOutlined, LikeOutlined, StarOutlined } = Icon;

export default function IndexPage() {
  const dispatch = useDispatch();

  const { articleList } = useSelector(
    ({ article: { articleList } }: GlobalState) => {
      return { articleList };
    },
  );

  const location = useLocation() as UmiLocation;
  const query = location?.query;

  useEffect(() => {
    dispatch({
      type: 'article/getArticleList',
      payload: { category: query?.menu || '' },
    });
  }, [location?.search]);

  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

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
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
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
              title={<a href={''}>{item.title}</a>}
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
