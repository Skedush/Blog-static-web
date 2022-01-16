import styles from './index.less';
import classNames from 'classnames';
import { Input, Form, Button } from '@/components';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'umi';
import { UmiComponentProps } from '@/common/type';

interface Props extends UmiComponentProps {}
const Login = (props: Props) => {
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    dispatch({ type: 'login/login', payload: values });
  };

  return (
    <div
      className={classNames(
        'height-full',
        'flex',
        'flex-center',
        'align-center',
      )}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          // rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          // rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            placeholder="密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
