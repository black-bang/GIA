import {Switch,Route} from "react-router-dom"
import PathName from "PathName"

import Developing from "./Developing/Developing.jsx"
import EmployeeAllCustomer from "./EmployeeAllCustomer/EmployeeAllCustomer.jsx"
import EmployeeAllInShopRecord from "./EmployeeAllInShopRecord/EmployeeAllInShopRecord.jsx"



export default ()=>{
	return (
	<Switch>
		<Route path={PathName.Developing} component={Developing}/>
		<Route path={PathName.EmployeeAllCustomer} component={EmployeeAllCustomer}/>
		<Route path={PathName.EmployeeAllInShopRecord} component={EmployeeAllInShopRecord}/>
	</Switch>	
)}
