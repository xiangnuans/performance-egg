import React from 'react';
import { DropDownProps } from 'antd/lib/dropdown';
import { ClickParam } from 'antd/es/menu';
import { SiderTheme } from 'antd/es/layout/Sider';

export interface GlobalHeaderRightProps {
  notices?: any[];
  dispatch?: (args: any) => void;
  currentUser?: {
    avatar?: string;
    userId?: number;
    nickName?: string;
    title?: string;
    group?: string;
    signature?: string;
    geographic?: any;
    tags?: any[];
    unreadCount: number;
  };
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onMenuClick?: (param: ClickParam) => void;
  onNoticeClear?: (tabName: string) => void;
  theme?: SiderTheme;
  showModal?: () => void;
}

export default class GlobalHeaderRight extends React.Component<GlobalHeaderRightProps, any> {}
