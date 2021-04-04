import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./screens/Login";
import SelectRole from "./screens/SelectRole";

type LoginStackParamList = {
    Login: undefined,
    SelectRole: undefined
}

const Stack = createStackNavigator<LoginStackParamList>();

export default function LoginNavigation() {
    return (
        <Stack.Navigator>
           <Stack.Screen name={'Login'} component={Login}/>
           <Stack.Screen name={'SelectRole'} component={SelectRole}/>
        </Stack.Navigator>
    )
}
