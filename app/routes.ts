import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), 
    route("register", "routes/register.tsx"), 
    route("login", "routes/login.tsx"), 
    route("homepage", "routes/homepage.tsx"),
    route("capture", "routes/capture.tsx"),
    route("livemap", "routes/livemap.tsx")
] satisfies RouteConfig;
