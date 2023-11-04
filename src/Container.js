import React from "react";

export const Container = props => (
    <div style={{ margin: '0 auto', width: '1000px' }}>
        {props.children}
    </div>
);

export default Container;