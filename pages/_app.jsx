import "../styles/main.scss";
import { CloudCannonConnect } from "@cloudcannon/react-connector";
import ReactGA from "react-ga";
import { google_analytics_key } from "../data/site.json";

ReactGA.initialize(google_analytics_key);

export default function App({ Component, pageProps }) {
  const AppComponent = CloudCannonConnect(Component);
  return <AppComponent {...pageProps} />;
}
