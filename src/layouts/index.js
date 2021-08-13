import { Layout } from "antd";
import AppMain from "@/layouts/AppMain";
import { CollapseSidebar, CollapseNavbar } from "@/containers/Layout";
import TabsView from "@/containers/TabsView";
import { Authorization } from "@/containers/Authorization";

const DefaultLayout = () => {
  return (
    <Authorization>
      <Layout className="w-screen h-screen overflow-x-hidden">
        <CollapseSidebar />
        <Layout className="flex">
          <CollapseNavbar />
          <TabsView></TabsView>
          <AppMain></AppMain>
        </Layout>
      </Layout>
    </Authorization>
  );
};

export default DefaultLayout;
