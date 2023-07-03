import axiosUtil from '../utils/axiosUtils.js'

class Api{

    //食物种类food-API
    findallfood(){
        return axiosUtil.get('/food')
    }
    

    //食物列表foodlist-API
    getonesort(name){
        return axiosUtil.get("/foodlist/getonesort",{
            params:{
                sort:name
            }
        })

    }
    createfoodlist(data){
        return axiosUtil.post('/foodlist',data)
    }
    getonefood(id){
        return axiosUtil.get("/foodlist/getone",{
            params:{
                id:id
            }
        })
    }

    //食物种类审核列表sortcheck-API
    createsortcheck(data){
        return axiosUtil.post('/sortcheck',data)
    }

    //食物审核列表foodcheck-API
    createfoodcheck(data){
        return axiosUtil.post('/foodcheck',data)
    }


    //公告列表notice-API
    findallnotice(){
        return axiosUtil.get('/notice')
    }


    //反馈信息feedback-API
    findallfeed(){
        return axiosUtil.get('/feed')
    }
    createfeed(data){
        return axiosUtil.post('/feed',data)
    }
    uploadpic(data){
        return axiosUtil.post('/feed/uploadpic',data)

    }


    //用户列表user-API
    login(data){
        return axiosUtil.post("/user/login",data)
    }
    findalluser(){
        return axiosUtil.get('/user')
    }
    updateuser(data){
        return axiosUtil.post("/user/update",data)
    }
    getoneuser(name){
        return axiosUtil.get("/user/getone",{
            params:{
                name:name
            }
        })
    }
    createuser(data){
        return axiosUtil.post('/user',data)
    }
    deleteuser(data){
        return axiosUtil.post('/user/delete',data)
    }
    uploaduserimg(data){
        return axiosUtil.post("/imguploadCOS", data)
    }


    //图像识别
    imgmessage(data){
        return axiosUtil.post('/imgmessage',data)
    }

    
}

export default new Api();