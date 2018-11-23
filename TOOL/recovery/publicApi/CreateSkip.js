import PathName from "PathName"
import {storage} from "api"

const CreateSkip=function(SkipOBJ){
	switch(SkipOBJ["SkipType"]){
		case 12100:
			//员工管理||员工部门
			return {pathname:PathName.EmployeeManage}
		break;
		case 10800:
			//微信配置
			return {pathname:PathName.WeiChatSetting}
		break;
		case 10900:
			//微信菜单配置
			return {pathname:PathName.WeiChatMenuSetting}
		break;
		case 11500:
			//门店配置
			return {pathname:PathName.TranslateSetting}
		break;
		case 11200:
			//需求管理
			return {pathname:PathName.DemandManage}
		break;

		//--<员工考核>--//
		case 10400:
			//员工考核
			return {pathname:PathName.EmployeeDate}
		break;				
		case 10401:
			//客户数量
			return {pathname:PathName.EmployeeAllCustomer,search:`UserAccount=${SkipOBJ["SkipTarget"]}`}			
		break;
		case 10402:
			//昨日进店
			return {pathname:PathName.EmployeeAllInShopRecord,search:`UserAccount=${SkipOBJ["SkipTarget"]}`}
		break;

		//--<>--//
		case 10403:
			//伪登录
			return {pathname:PathName.UserCenter,search:`EmployeeId=${SkipOBJ["SkipTarget"]}`}
		break;

		//--<短信问候提醒>--//
		case 11100:
			//短信问候||门店提醒设置
			return {pathname:PathName.RemindSetting}
		break;		
		case 11101:
			//结婚纪念日提醒设置
			return {pathname:PathName.WeddingDayRemind,search:`settingId=${SkipOBJ["SkipTarget"]}&type=${SkipOBJ["SkipType"]}`}
		break;
		case 11102:
			//客户生日提醒设置
			return {pathname:PathName.BirthdayRemind,search:`settingId=${SkipOBJ["SkipTarget"]}&type=${SkipOBJ["SkipType"]}`}
		break;
		case 11103:
			//离店三十分钟消息推送设置
			return {pathname:PathName.MessagePush,search:`settingId=${SkipOBJ["SkipTarget"]}&type=${SkipOBJ["SkipType"]}`}
		break;
		case 11104:
			return {pathname:PathName.SendMessage,search:`TemplateId=${SkipOBJ["SkipTarget"]}&type=${SkipOBJ["SkipType"]}`}
		break;
		case 11400:
			//帮助中心
			return {pathname:PathName.QuestionList}
		break;
		case 12200:
			//计算器
			return {
				pathname:"http://H5Calculator.jzker.cn",
				hash:""
			}
		break;		
		case 12300:
			return {
				pathname:SkipOBJ["SkipTarget"],
				hash:`?accountId=${storage.loginInfo["Id"]}&translateId=${storage.loginInfo["TranslateId"]}&accountName=${storage.loginInfo["Name"]}`
			}
		break;
		case 12400:
			return {
				pathname:PathName.SendAssistant
			}
		break;
		case 12500:
			//二维码页面
			return {pathname:PathName.QrCodeManage}
		break;
		case 11300:
			return {pathname:PathName.CommonTextManage}
		break;
		default :
			return {pathname:"/WeiChat/Developing"}
	}
}

export default CreateSkip