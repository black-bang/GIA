import HomeIndexRouter from './HomeIndex.router/HomeIndex.router.jsx'
import ServiceNotice from './HomeIndex.router/ServiceNotice/ServiceNotice.jsx'
import ShopCard from "./HomeIndex.router/ShopCard/ShopCard.jsx";
import MyOrderList from "./HomeIndex.router/MyOrderList/MyOrderList.jsx";
import UserCenter from "./HomeIndex.router/UserCenter/UserCenter.jsx";
import Setting from "./HomeIndex.router/Setting/Setting.jsx";
import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"

export default class HomeIndex extends React.Component {
    render() {
        return <Provider>
            <Switch>
                 <Route path="/HomeIndex/ServiceNotice" component={ServiceNotice} />
                 <Route path="/HomeIndex/ShopCard" component={ShopCard} />
                 <Route path="/HomeIndex/MyOrderList" component={MyOrderList} />
                 <Route path="/HomeIndex/UserCenter" component={UserCenter} />
                 <Route path="/HomeIndex/Setting" component={Setting} />
                 <Route path="/HomeIndex" component={HomeIndexRouter} />
               
            </Switch>
          </Provider>;
    }
    constructor(props) {
        super(props);

    }


}