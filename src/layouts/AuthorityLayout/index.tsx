import { connect } from '@@/plugin-dva/exports';
import { ConnectType } from '@/global/connect';
import React from 'react';
import { Redirect } from 'umi';
import { UserStateType } from '@/models/user';
import BasicLayout from '@/layouts';

interface AuthorityLayoutPropsType{
  user:UserStateType
  children:any
  location:any
}
const AuthorityLayout = ({user,children,location}:AuthorityLayoutPropsType) => {
  return (
    <div>
      {user.id === undefined && <Redirect to={"/user/login"} />}
      <BasicLayout
        children={children}
        location={location}
      />
    </div>
  );
};

export default connect(({user}:ConnectType) => ({user}))(AuthorityLayout);
