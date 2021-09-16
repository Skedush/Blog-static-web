import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';

export interface InputProps extends AntdInputProps {}
const Input = (props: InputProps) => {
  return <AntdInput {...props} />;
};
Input.Password = AntdInput.Password;
export default Input;
