import { memo } from 'react';
import { Button as AntdButton, ButtonProps as AntButtonProps } from 'antd';

export type ButtonProps = AntButtonProps;

const Button = memo((props: ButtonProps) => {
  return <AntdButton {...props}>{props.children}</AntdButton>;
});

export default Button;
