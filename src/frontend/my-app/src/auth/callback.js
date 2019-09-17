import * as React from "react";

import { AuthConsumer } from "./providers/authProvider";

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <span>Cargando...</span>;
        }}
    </AuthConsumer>
);



export default Callback;