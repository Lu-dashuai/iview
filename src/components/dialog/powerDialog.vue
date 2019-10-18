<template>
  <div>
    <Modal v-model="modal6" draggable :title="title" footer-hide >
        <Tree :data="data2" @on-check-change="choiceAll" show-checkbox ref="tree2"></Tree>
        <div align="center">
            <Button type="primary" @click="handleSubmit()">提交</Button>
            <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {  
    return {
      modal6: false,
      title:'授权界面',
      data2: [
      ],
      _if:[],//向后台发送的权限菜单
      row:{}
    };
  },
  created:function(){
    // this.getPower();
  },
  methods: {
    openDialog(bo,row) {
      this.modal6 = bo;
      this.row = row
      this.getPower();
    },
    getPower(){
      // alert(this.row.id);
      this.$http
        // .get("power/getPower",{ params: { role_id: this.row.id } }) //通过role_id获取权限菜单树
        .get("power/getPower",{ params: { role_id: null } }) //
        .then(res => {
          // alert(JSON.stringify(res))
          if (res.status == '200') {
            this.data2 = res.body
            for(var i = 0;i<this.data2.length;i++){
              this.data2[i].expand = true
            }
          } else {
            this.$Message.error("获取数据失败!"); 
          }
        })
    },
    choiceAll:function(data){
// 　　　　alert(JSON.stringify(data));  //当复选框选中时则会打印出选中的内容
        this._if = data
　　},
    handleSubmit(){
      //  alert(JSON.stringify(this._if))
      var param = {
        role_id:this.row.id,
        _if : this._if
      }
      this.$http
        .post("power/addPower",param) //
        .then(res => {
          // alert(JSON.stringify(res))
          if(res.status==200){
            this.$Message.success("成功!");
            this.modal6 = false;
          }else{
            this.$Message.error("失败!");
            this.modal6 = false;
          }
      });
    }
  }
   
};
</script>
