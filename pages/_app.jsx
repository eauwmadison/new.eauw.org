import "../styles/main.scss";
import { CloudCannonConnect } from "@cloudcannon/react-connector";
import ReactGA from 'react-ga';

const PROPERTY_ID = "308458331";
ReactGA.initialize(PROPERTY_ID);

export default function App({ Component, pageProps }) {
  const AppComponent = CloudCannonConnect(Component);
  return <AppComponent {...pageProps} />;
}
