import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Camera from "../screens/Camera";
import Result from "../screens/Results";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator useLegacyImplementation >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Camera" component={Camera} />
            <Drawer.Screen name="Result" component={Result} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;