import React, { Fragment, useEffect } from "react";
import Sidebar from "../layout/Sidebar/sidebar";

const Component = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    
    return (
        <Fragment>
            <div className="mt-5 flex">
                <Sidebar />
            </div>
        </Fragment>
    );
};

export default Component;