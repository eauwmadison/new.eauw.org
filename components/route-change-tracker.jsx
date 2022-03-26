import ReactGA from "react-ga";

export default function RouteChangeTracker({ history }) {

    history.listen((location, action) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });

    return <div></div>;
};