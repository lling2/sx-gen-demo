import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import moment from "moment/moment";
import 'moment/locale/zh-cn';
import * as storage from 'sx-utils/lib/storage';
import * as sxRedux from 'sx-redux';
import handleSuccess from './commons/handle-success';
import {getCurrentLoginUser} from './commons';
import handleError from './commons/handle-error';
import {configureStore} from './models';
import './polyfill';
import App from './App';
import './index.less';
import 'sx-antd/lib/index.min.css';
import 'sx-antd/lib/font-icon/font-awesome/css/font-awesome.min.css';

// dev 模式开启mock
if (process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'dev'
    || process.env.REACT_APP_BUILD_ENV === 'preview'
) {
    require('./mock/index');
    console.log('current mode is development, mock is enabled');
}

// moment国际化为中国
moment.locale('zh-cn');

const currentLoginUser = getCurrentLoginUser();

// 初始化存储 设置存储前缀，用于区分不同用户的数据
storage.init({keyPrefix: currentLoginUser && currentLoginUser.id});

/*
// 可以根据value中的标记字段，比如syncType='server' 区分如何处理；
const setItem = storage.setItem;
storage.setItem = (key, value) => {
    console.log(value);
    setItem(key, value);
};
*/

// 初始化redux
sxRedux.init({storage, handleError, handleSuccess});

// models store
const store = configureStore();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
