import { connect } from '@@/plugin-dva/exports';
import { ConnectType } from '@/global/connect';
import React from 'react';
import { Redirect } from 'umi';
import { UserStateType } from '@/models/user';
import ApplicationLayout from '@/layouts/ApplicationLayout';
import BasicLayout from '@/layouts';

interface AuthorityLayoutPropsType{
  user:UserStateType
  children:any
}
const AuthorityLayout = ({user,children}:AuthorityLayoutPropsType) => {
  return (
    <div>
      {user.id === undefined && <Redirect to={"/user/login"} />}
      <BasicLayout>
        {children}
      </BasicLayout>
    </div>
  );
};

export default connect(({user}:ConnectType) => ({user}))(AuthorityLayout);
