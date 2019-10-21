<template>
    <div style="height:937px;overflow:hidden">
        <div style="margin:19px 23px 0px 32px;">
            <img src="../../images/logo.png" >
            <span style="margin:0px 0px 0px 25px;font-size:25px;font-family: 'Poppins',sans-serif">管理系统</span>
        </div>
        <div style="width:300px;margin:276px auto;">
        <h1 style="margin:0 0 20px 110px;">登陆页面</h1>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user_no">
                <h3>用户名：</h3><Input type="text" style="width:300px;"  v-model="formInline.user_no" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <h3>密码：</h3><Input type="password" style="width:300px;"  v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button style="margin:0 0 20px 120px;" size="large" type="success" @click="handleSubmit('formInline')">登陆</Button>
            </FormItem>
        </Form>
    </div>
    </div>
</template>
<script>
 export default {
        data () {
            return {
                formInline: {
                    user_no: '',
                    password: ''
                },
                ruleInline: {
                    user_no: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http
                        .post('power/login', this.formInline) //
                        .then(res => {
                            if (res.status == 200&&res.body.code==200) {
                                // alert(JSON.stringify(res))
                                this.$Message.success('Success!');
                                var role_id = res.body.data
                                this.$router.push({
                                    path:'/admin/user',
                                    query:{
                                        role_id: role_id
                                    }
                                })
                            }else if(res.status == 200&&res.body.code!=200){
                                this.$Message.error(res.body.msg);
                            } else {
                                alert("字段数据加载失败");
                            }
                        });
                        //   直接调用$router.push 实现携带参数的跳转
                        // this.$router.push({
                        // path: `/describe/${id}`,
                        // })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
<style >

</style>