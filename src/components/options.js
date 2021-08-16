const cptOptions = {
    element:{
        name:'基础',
        icon:'',
        opened:true,
        options:{
            'cpt-dataV-border-option':{
                borderType:'dv-border-box-1',
                borderColor1:'#409eff',borderColor2:'#f00',backgroundColor:'rgba(0, 0, 0, 0)',
                borderTitle:'标题1',titleWidth:250,//样式11特殊配置
                dur:3, reverse:false//样式8特殊配置
            },
            'cpt-button-option': {
                text: '按钮1', url: '', bgColor: '#409eff', textColor: '#fff',
                radius: 6,
            },
            'cpt-text-option': {
                text: '普通文本',
                url: '',
                textColor: '#4BB344',
                textSize: 25,
                fontWeight: 'bold',
                textLineHeight: 40,
                textFamily: '微软雅黑',
                textAlign: 'center',
                fontStyle:'normal',
                textDecoration:'none'
            },
            'cpt-input-option': {
                label: '姓名',
                placeholderValue: '请输入姓名',
                value: '',
                type: 'text',
                labelWidth: 80,
                labelPosition: 'left',
                formSize: 'mini'
            },
            'cpt-image-option':{
                url:require('/src/assets/exam/btfGirl.png'),
                fit:'fill',preview:false
            },
            'cpt-carousel-option':{
                trigger:'hover',
                imgUrls:[
                    require('@/assets/readme/test.png'),
                    require('@/assets/readme/options.png')
                ],
                fit:'cover'
            }
        }
    },
    echarts:{
        name:'图表',
        icon:'',
        opened:true,
        options: {
            'cpt-chart-column-option': {
                chartTitle: '标题一', titleLeft: 'center', titleTop: 10, titleTextColor: '#aaa',
                xLabelColor: '#0a7eea', xLineColor: '#aaa', yLabelColor: '#0bd124', yLineColor: '#aaa',
                yGridLineShow: false, yTickShow: true,
                barBgShow: false, barBorderRadius: 5, barColor: '#0775eb',
                barWidth: 24,
                xData: "Mon,Tue,Wed,Thu,Fri,Sat,Sun",
                yData: "120,200,150,80,70,110,130"
            },
            'cpt-chart-pie-option': {
                theme:'light',chartTitle: '标题一', titleX: 40, titleY: 'top', titleTextColor: '#ccc',
                subtext:'纯属虚构',titleFontSize:18, orient: 'horizontal',legendTextColor:'#ddd',legendX:'center',
                legendY:'bottom',seriesData:"[{\"value\":1048,\"name\":\"搜索引擎\"},{\"value\":735,\"name\":\"直接访问\"},{\"value\":580,\"name\":\"邮件营销\"},{\"value\":484,\"name\":\"联盟广告\"},{\"value\":300,\"name\":\"视频广告\"}]"
            },
            'cpt-chart-clock-option':{
                axisLineWidth: 3,axisLabelSize:16,hourPointerColor:'#C0911F',axisLabelDistance:8,
                splitLineDistance:4
            },
            'cpt-dataV-scrollTable-option':{
                header: ['列1', '列2', '列3'],//表头数据
                rowNum: 4,//显示行数
                headerBGC:'#00BAFF',//表头背景色
                oddRowBGC:'#003B51',//奇数行背景色
                evenRowBGC:'#0A2732',//偶数行背景色
                waitTime: 2000,//轮播时间间隔(ms)
                headerHeight: 35,//表头高度
                indexHeader: '#a',//行号表头
                carousel:'single',//轮播方式'single'|'page'
                hoverPause:true,//悬浮暂停轮播
                data: [
                    ['行1列1', '行1列2', '行1列3'],
                    ['行2列1', '行2列2', '行2列3'],
                    ['行3列1', '行3列2', '行3列3'],
                    ['行4列1', '行4列2', '行4列3'],
                    ['行5列1', '行5列2', '行5列3'],
                    ['行6列1', '行6列2', '行6列3'],
                    ['行7列1', '行7列2', '行7列3'],
                    ['行8列1', '行8列2', '行8列3'],
                    ['行9列1', '行9列2', '行9列3'],
                    ['行10列1', '行10列2', '行10列3']
                ],
                index: true,//开启序号
                columnWidth: [50],//列宽
                align: ['center'],//对齐方式
                refresh: true
            }
        }
    }
}
export default cptOptions
