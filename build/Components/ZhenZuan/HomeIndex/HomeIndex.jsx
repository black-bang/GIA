import HomeIndexRouter from './HomeIndex.router/HomeIndex.router.jsx'
import ServiceNotice from './ServiceNotice/ServiceNotice.jsx'
import { Route, Switch } from "react-router-dom"
import { Provider } from "mobx-react"



export default class HomeIndex extends React.Component {
    render() {
        return <Provider>
            <Switch>
                < Route path="/HomeIndex/ServiceNotice" component={ServiceNotice} />
                <Route path="/HomeIndex" component={HomeIndexRouter} />
               
            </Switch>
          </Provider>;
    }
    constructor(props) {
        super(props);

    }


}