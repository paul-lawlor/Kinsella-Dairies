import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function WelcomeTabs() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="stamps" title="Stamp Collection"></Tab>
      <Tab eventKey="lifetimeRewards" title="Lifetime Rewards"></Tab>
      <Tab eventKey="referal" title="Referal Bonus"></Tab>
    </Tabs>
  );
}

export default WelcomeTabs;
