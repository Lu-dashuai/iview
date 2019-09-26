# 寝室管理系统
## 搭建主页面
1. 完成权限菜单书的初步展示，无条件查询。拼接成嵌套的字符串。
2. 前端v-for 渲染菜单树。
3. 完成菜单树路由模块的跳转。
## 完成员工-角色-权限(中间表)
1. 设计员工表
(id,user_no[员工编号], user_name, password, sex, card_id[身份证号], email, tel[电话], hobby[爱好], role_id[外键，角色id], create_time, info[备注])
2. 设计角色表
(id, role_name, role_no[角色编号], info)
3. 权限表
(id, role_no, power_id, info)
## 完成表格封装好的组件
1. 创建表头字段表
tb_table_header
(id,title,header,info)
## table组件渲染
1. 将菜单树跳转
