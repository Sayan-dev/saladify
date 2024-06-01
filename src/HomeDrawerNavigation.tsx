import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Screens/HomeScreen';
import SideBar, {SideBarProps} from './components/common/SideBar';
import MyOrderScreen from './Screens/MyOrdersScreen';

export type DrawerParamList = {
  Home: undefined;
  MyOrders: undefined;
  Favorites: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeDrawerNavigator: React.FC = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      swipeEnabled: true,
      header: () => null,
    }}
    drawerContent={props => <SideBar {...(props as SideBarProps)} />}
    // tabBar={props => <TabBar {...(props as TabBarProps)} />}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="MyOrders" component={MyOrderScreen} />
  </Drawer.Navigator>
);

export default HomeDrawerNavigator;
