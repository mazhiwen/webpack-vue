import React from 'react';
import { Button, Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { routes } from 'router';
import Menu from 'components/Menu';

const {
  Header, Footer, Content,
} = Layout;

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div>
            图标
          </div>
          <Menu />

        </Header>
        <Content>
          {renderRoutes(routes)}
        </Content>
        <Footer>
          Footer

        </Footer>
      </Layout>
    );
  }
}
