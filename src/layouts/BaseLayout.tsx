// @flow
import { UmiComponentProps } from '@/common/type';
import PrimaryLayout from './PrimaryLayout';
import PublicLayout from './PublicLayout';
import pathToRegexp from 'path-to-regexp';

const LAYOUT_MAP: { [key: string]: any } = {
  primary: PrimaryLayout,
  public: PublicLayout,
};
interface LayoutConfig {
  name: string;
  include: RegExp[];
  exclude: RegExp[];
}
const queryLayout = (layouts: LayoutConfig[], pathname: string): string => {
  let result = 'public';

  const isMatch = (regepx: string | RegExp | string[]) => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname);
  };
  const pathMatchRegexp = (
    regexp: string | RegExp | string[],
    pathname: string,
  ) => {
    return pathToRegexp(regexp).exec(pathname);
  };

  for (const item of layouts) {
    let include = false;
    let exclude = false;
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true;
          break;
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true;
          break;
        }
      }
    }
    if (include && !exclude) {
      result = item.name;
      break;
    }
  }

  return result;
};

const layouts = [
  {
    name: 'primary',
    include: [/.*/],
    exclude: [/user[/]?$/],
  },
];
interface Props extends UmiComponentProps {}
const BaseLayout = (props: Props) => {
  const { children, location } = props;
  const Container = LAYOUT_MAP[queryLayout(layouts, location.pathname)];
  return <Container>{children}</Container>;
};
export default BaseLayout;
