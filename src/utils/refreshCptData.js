import httpUtil from "@/utils/HttpUtil";
import { Message } from "element-ui";
import {executeSelectApi} from "@/api/sqlExecuteApi";

export async function getDataStr(cptDataForm){
    let resStr = '{}';//防止JSON解析报错
    const iptStr = cptDataForm.dataText;
    if (cptDataForm.dataSource === 1){
        resStr = iptStr;
    }else if(cptDataForm.dataSource === 2){//调接口
        if (iptStr){
            await httpUtil.doRequest(iptStr,'get').then(res => {
                resStr = res.data;
            })
        }else{
            Message.error("接口地址不能为空");
        }
    }else if(cptDataForm.dataSource === 3){
        if (iptStr){
            await executeSelectApi({sql:iptStr}).then(res => {
                resStr = res.data;
            })
        }else{
            Message.error("SQL不能为空");
        }
    }
    return resStr;
}
