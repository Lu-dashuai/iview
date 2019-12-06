<template>
  <div>
    <h1>菜单管理</h1>
    <hr />
    <div>
      <Tree :data="data5" :render="renderContent"></Tree>
      <Modal
        v-model="modal1"
        title="请填写需要添加节点的信息："
        @on-ok="okadd"
        @on-cancel="cancel">
        <!-- 
          id:不用管
          title:input框填写
          status：用个打开关闭的按钮
          iconcls:图标，先用input框手填，写个备注
          url：input手填
          parent_id : 给值不用管
         -->
        <Form :model="formDate" label-position="left" :label-width="100">
          <FormItem label="Title:">
            <Input v-model="formDate.title"></Input>
          </FormItem>
          <FormItem label="图标:">
              <Input v-model="formDate.iconcls"></Input>
          </FormItem>
          <FormItem label="访问路径:">
              <Input v-model="formDate.url"></Input>
          </FormItem>
          <FormItem label="菜单状态：">
            <i-switch v-model="formDate.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
          </FormItem>
        </Form>
      </Modal>

      <Modal
        v-model="modal2"
        title="确认是否删除："
        @on-ok="okdel"
        @on-cancel="cancel">
       <span>确认是否删除【{{del_node.title}}】及其子节点?</span>
      </Modal>
    </div>
    <hr />
  </div>
</template>
<script>
import store from "../../store/index.js";
export default {
  data() {
    return {
      formDate:{
        title:'',
        iconcls:'',
        url:'',
        switch: true
      },
      del_node:{},
      modal2: false,
      modal1: false,//点击添加的弹框
      data5: [
        {
          parent_id:null,
          title: "所有菜单",
          expand: true,
          id:0,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [
                  h("Icon", {
                    props: {
                      type: "ios-folder-outline"
                    },
                    style: {
                      marginRight: "8px"
                    }
                  }),
                  h("span", data.title)
                ]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "ios-add",
                        type: "primary"
                      }),
                      style: {
                        width: "64px"
                      },
                      on: {
                        click: () => {
                          this.append(data);
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: null
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      }
    };
  },
  components: {},
  store,
  created: function() {
    this.getPower()
  },
  methods: {
    renderContent(h, { root, node, data }) {
      if(data.parentid == 0 ){ //判断是父节点 就 给后面添加 按钮
        return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-add"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
      } else {
        return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
      }
      
    },
    append(data) {
      // alert(JSON.stringify(data))
      this.parent_id = data.id//保存全局变量
      this.modal1 = true
    },
    remove(root, node, data) {
      this.modal2 = true
      this.del_node = data
    },
    getPower(){
      //获取所有菜单的信息
      this.$http.get("power/getPower",{ params: { role_id: null } }).then(res => {
            if (res.status == 200) {
              // alert(res.body.length)
              res.body.forEach(element => {
                element.expand = true
              });
              // alert(JSON.stringify(res.body))
              this.data5[0].children = res.body
            } else {
              this.$Message.error("tree数据加载失败"); 
            }
      });
    },
    okadd () {
        // this.$Message.info('Clicked ok');
        //点击弹框的确定按钮需要执行添加的操作，首先开始准备添加的数据。
        //首先考虑需要保存的当前节点的id，通过全局变量parent_id给保存
        this.formDate.parentid = this.parent_id
        // alert(JSON.stringify(this.formDate))
        this.$http
        .post("power/addPowerTable", this.formDate) //
        .then(res => {
          if (res.status == 200) {
            this.$Message.success("添加成功！");
            this.getPower();
          } else {
            this.$Message.error("添加失败！");
          }
        });
    },
    okdel () {
      alert(this.del_node.id)
      this.$http
        .get("power/delPower", { params: { power_id: this.del_node.id } }) //
        .then(res => {
          if (res.status == 200) {
            this.$Message.success("删除成功！");
            this.getPower();
          } else {
            this.$Message.error("删除失败！");
          }
        });
    },
    cancel () {
        this.$Message.info('Clicked cancel');
    }
  }
};
</script>
<style scoped>
</style>