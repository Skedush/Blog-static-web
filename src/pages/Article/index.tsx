import { GlobalState, UmiLocation } from '@/common/type';
import classNames from 'classnames';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useHistory, useLocation, useSelector } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation() as UmiLocation;
  const query = location?.query;

  useEffect(() => {
    console.log('query: ', query);
    dispatch({
      type: 'article/getArticle',
      payload: {
        id: query?.id,
      },
    });
  }, [location?.search]);

  const { article } = useSelector(({ article: { article } }: GlobalState) => {
    return { article };
  });

  return (
    <div
      className={classNames(
        'flex',
        'flex-auto',
        'flex-col-start',
        'over-hidden',
        'padding-xs',
      )}
    >
      <h1>{article.title}</h1>
      <h3>{article.sub_title}</h3>
      <ReactMarkdown className={classNames('flex-auto', 'over-auto')}>
        {article.content}
      </ReactMarkdown>
    </div>
  );
}
