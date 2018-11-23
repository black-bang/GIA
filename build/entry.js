import { WithLogin, StartToRedner } from "api";

// 首页
import HomeIndex from "./Components/ZhenZuan/HomeIndex/HomeIndex.jsx";
// 服务须知
// import ServiceNotice from './Components/ZhenZuan/ServiceNotice/ServiceNotice.jsx'


import { HashRouter, Route, Switch, Redirect } from "react-router-dom"; 
import { configure } from "mobx"
configure({ enforceActions: "always" });

const target = document.getElementById("AppView");

  ReactDOM.render(<HashRouter
  >
      <Switch>
        {/* <Route path="/" exact render={() => <Redirect to={"/Code"} />} /> */}
        {/* 会员中心首页 */}
      <Route path='/' exact render={() => (
        <Redirect to='/HomeIndex' />
      )}  />
      <Route path="/HomeIndex" component={HomeIndex} /> 
        {/* 服务须知 */}
        {/* <Route path="/ServiceNotice" component={ServiceNotice} />  */}

      </Switch>
    </HashRouter>, target);


