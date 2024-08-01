import React from "react";
import routes from "../routes";
import Dashboard from "../page/Dashboard";

import "./container.css";


export default function Content(match) {
  return (
    <>
      <div className="content">
        {routes.map((route, idx) => {
          return route.component ? (
            window.location.pathname === route.path && (
              <route.component id={idx} key={idx} />
            )
          ) : (
            <Dashboard id={idx} key={idx} />
          );
        })}
      </div>
    </>
  );
}
