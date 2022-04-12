import React from "react";
import { AppProps } from "next/app";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  LoginPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";

require("antd/dist/antd.less");

import { dataProvider } from "@pankod/refine-supabase";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "@components/layout";
import { PostList } from "src/pages/posts/list";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}
      LoginPage={LoginPage}
      Title={Title}
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
      resources={[
        {
          name: "CMS",
        },
        {
          name: "Posts",
          parentName: "CMS",
          list: PostList,
          // create: PostCreate,
          // edit: PostEdit,
          // show: PostShow,
        },
        {
          name: "category",
          parentName: "CMS",
          // list: CategoryList,
          // create: CategoryCreate,
          // edit: CategoryEdit,
          canDelete: true,
        },
      ]}
    >
      <Component {...pageProps} />
    </Refine>
  );
}

export default MyApp;
