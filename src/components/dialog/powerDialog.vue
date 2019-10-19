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
      row:{},
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
      this.data2 = [];
      // alert(this.row.id);
        //获取所有菜单用于展示
      this.$http
        // .get("power/getPower",{ params: { role_id: this.row.id } }) //通过role_id获取权限菜单树
        .get("power/getPower",{ params: { role_id: null } }) //
        .then(res => {
          // alert(JSON.stringify(res))
          if (res.status == '200') {
            
            //获取该角色已经存在的菜单
            var temp = [];
            this.$http
              .get("power/getPower",{ params: { role_id: this.row.id } }) //通过role_id获取权限菜单树
              // .get("power/getPower",{ params: { role_id: null } }) //
              .then(res2 => {
                if (res2.status == '200') {
                  var parent = res2.body;
                  for(var i=0;i<parent.length;i++){
                    temp.push(parent[i].id);
                    var child = parent[i].children;
                    for(var j =0;j<child.length;j++){
                        temp.push(child[j].id);
                    }
                  }
                  // alert(temp)
                  //给所有的父节点添加expand=ture属性，让节点打开
                  var father = res.body;
                  // alert(JSON.stringify(father))
                  for(var k=0;k<father.length;k++){
                    father[k].expand = true;
                    var chi = father[k].children;
                    for(var z=0;z<chi.length;z++){
                      if(temp.indexOf(chi[z].id)>-1){
                        chi[z].checked = true;
                      }
                    }
                  }
                  this.data2 = res.body;//给dialog赋值
                } else {
                  this.$Message.error("获取数据失败!"); 
                }
              })//第二次请求结束
            
          } else {
            this.$Message.error("获取数据失败!"); 
          }
        })

        
    },
    choiceAll:function(data){
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
