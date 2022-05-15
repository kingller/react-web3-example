import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router, Switch as RouterSwitch, Redirect, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import hashHistory from './js/hash-history';

import ModuleWrapper from './components/ModuleWrapper/index';

import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';

import Swap from './modules/Swap';
import Landing from './modules/Landing';

const MainWithRouter = withRouter(
    class Main extends React.Component<RouteComponentProps> {
        static childContextTypes = {
            //获取当前页面的地址
            location: PropTypes.object,
        };

        getChildContext(): {} {
            return {
                //获取当前页面的地址
                location: this.props.location,
            };
        }

        render(): React.ReactNode {
            const { location } = this.props;
            const module = 'module' + location.pathname.replace(/\//g, '-');

            return (
                <ConfigProvider locale={enUS}>
                    <div className="layout-responsive-left-fixed page-container">
                        <div className="page-content">
                            <div className={`page-body ${module}`}>
                                <ModuleWrapper>
                                    <RouterSwitch>
                                        <Route component={Landing} path="/" />
                                        <Route path="/swap" component={Swap} />
                                        <Redirect to="/" />
                                    </RouterSwitch>
                                </ModuleWrapper>
                            </div>
                        </div>
                    </div>
                </ConfigProvider>
            );
        }
    }
);

export default (
    <Router history={hashHistory}>
        <MainWithRouter />
    </Router>
);
