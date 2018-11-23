import {getFetch,postFetch} from "fetchFn"

const queryMarkAndLable=function(user_Customer_Id){
	//查询登录客户的的所有标签及备注
	return getFetch({
		url:"/api/User_Employee/GetEmployeeCustomerMarkAndLabelAsync/",
		data:{
			user_Customer_Id:user_Customer_Id
		}
	})
}
export {queryMarkAndLable}

const submit=function(submitOBJ){
	const {CustomerId,Remark,LableNames}=submitOBJ
	//提交用户的备注名和标签
	return postFetch({
		url:"/api/User_Employee/SaveEmployeeCustomerMarkAndLabelAsync",
		data:{
			user_Customer_Id:CustomerId,
			customerNameMark:Remark,
			labelNames:LableNames,
		}
	});
}

export {submit}