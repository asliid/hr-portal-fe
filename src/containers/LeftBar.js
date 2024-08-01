import React from "react";
import routes from "../routes";
import "./container.css";

export default function LeftBar() {
  return (
    <>
      <div className="leftbar">
        {routes.map((route, id) => !route?.isVisible&&(
          <a
            href={route.path}
            style={{ textDecoration: "none" }}
            key={id}
            id={id}
          >
            <div
              className="leftbar_link"
              style={{
                backgroundColor: `${
                  window.location.pathname === route.path ? "gray" : "lightgray"
                }`,
              }}
            >
              {route.name}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}