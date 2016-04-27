import {RouteConfig} from "react-router";

interface IRoutingAdapter {
    routes(): RouteConfig;
}

export default IRoutingAdapter;
