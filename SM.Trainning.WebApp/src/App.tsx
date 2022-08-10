import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import "primeicons/primeicons.css";
import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./assets/styles/css/compressed/styles.css";
import AlertPopup from "./components/AlertPopup";
import { DialogMessage } from "./components/ComponentLib";
import ErrorHandler from "./components/ErrorHandler";
import LoadingModal from "./components/LoadingModal";
import { PrivateRoute } from "./components/PrivateRoute";
import { RouteCollection } from './screens/RouteManager';
import GlobalStore from "./Stores/GlobalStore";
import OrderStore from "./Stores/OrderStore";
import AppFooter from "./UserControls/Layouts/FooterUC";
import LeftMenu from "./UserControls/Layouts/LeftMenu";
import TopMenu from "./UserControls/Layouts/TopMenu";

const history = createBrowserHistory();
const globalStore = new GlobalStore();
const orderStore = new OrderStore();

history.listen((location, action) => {
    //console.log(action, location.pathname, location.state);
    ErrorHandler.HandlerException(undefined);
});

export default class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            enlargeMenu: true
        };
    }

    componentDidMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.location !== prevProps.location) {
            globalStore.HandleException(undefined);
        }
    }

    toggleEnlargeMenu = () => {
        this.setState({
            enlargeMenu: !this.state.enlargeMenu
        })
    };

    removeEnlargeMenu = () => {
        this.setState({
            enlargeMenu: false
        })
    };

    render() {
        return (
            <Provider GlobalStore={globalStore} OrderStore={orderStore}>
                <Router history={history}>
                    <Switch>
                        <Route>
                            <div className={`layout-wrapper ${this.state.enlargeMenu ? "enlarge-menu" : ""}`}>
                                <TopMenu
                                    history={history}
                                    GlobalStore={globalStore}
                                    toggleEnlargeMenu={this.toggleEnlargeMenu}
                                    removeEnlargeMenu={this.removeEnlargeMenu}
                                />
                                <LeftMenu
                                    history={history}
                                    GlobalStore={globalStore}
                                    toggleEnlargeMenu={this.toggleEnlargeMenu}
                                    removeEnlargeMenu={this.removeEnlargeMenu}
                                />
                                {
                                    RouteCollection.map((en: any, index: number) => {
                                        return <PrivateRoute path={en.Path + en.Param} history={history}
                                            component={en.Component} exact={en.Exact} key={index.toString()}
                                        />
                                    })
                                }
                                <AppFooter />
                            </div>
                        </Route>
                    </Switch>
                </Router>

                <ErrorHandler />
                <LoadingModal />
                <DialogMessage />
                <AlertPopup />
            </Provider>
        );
    }
}