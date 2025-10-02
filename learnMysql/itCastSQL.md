# DDL - 数据库操作

## SHOW DATABASE;
## CREATE DATABASE databaseName;
## USE databaseName;
## SELECT DATABASE();
## DROP DATABASE databaseName;


# DDL - 表操作

## 创建表
create table tb_emp(
    id int comment '编号',
    workNo varchar(10) comment '工号',
    name varchar(10) comment '姓名',
    gender varchar(10) comment '性别',
    age tinyint unsigned comment '年龄',
    idNo char(18) comment '身份证',
    entryDate date comment '入职时间'
) comment '员工表';


## 修改 添加字段
## ALTER TABLE tableName ADD filedName category [comment] [约束];
ALTER TABLE tb_emp ADD nickname varchar(20) comment '昵称'; 


## 修改 修改数据类型
## ALTER TABLE tableName MODIFY filedName newCategory;
## 修改 修改字段名和数据类型
## ALTER TABLE tableName CHANGE oldFieldName newFieldName category [comment] [约束];
ALTER TABLE tb_emp CHANGE nickname username varchar(12) comment '用户名';

## 删除字段
## ALTER TABLE tableName DROP filedName;
ALTER TABLE tb_emp DROP username;

## 修改表名
## ALTER TABLE tableName RENAME TO newTableName;
ALTER TABLE tb_emp RENAME TO tb_employee;

## 删除表
## DROP TABLE [IF EXISTS] tableName;
## 删除指定表，并重新创建该表
## TRUNCATE TABLE tableName;


# 图形化工具 DataGrip
## DataGrip 里，schema 就是 database


# DML - Data Manipulation Language 数据操作语言（对数据库增删改）
## INSERT UPDATE DELETE

## 添加数据
## 给指定字段添加数据
## INSERT INTO tableName (filedName1, filedName2, ...) VALUES (value1, value2, ...);
## 给全部字段添加数据
## INSERT INTO tableName VALUES (value1, value2, ...);
## 批量操作：在 VALUES 后面填多个值组 (value1, value2, ...), (value1, value2, ...), ...
(## 查询: SELECT * FROM tableName;)
insert into tb_user values (2, 'b', 2, 1),
                           (3, 'c', 3, 1),
                           (4, 'd', 4, 0),
                           (5, 'e', 5, 1),
                           (6, 'f', 6, 0);

## 修改数据
## UPDATE tableName SET filedName1=value1, filedName2=value2, ... [WHERE condition]; // 如果没有条件，就是修改整张表的数据
update tb_user set name='艾AA' where id=1;
update tb_user set name='程心', age=22, gender=0 where id=2;
update tb_user set enterDate='2024-08-12';

## 删除数据(不是删除某个字段，而是删除某条记录)
## DELETE FROM tableName [WHERE condition]; // 如果没有条件，就会删除这个表的所有数据


# DQL - Data Query Language 数据查询语言（查询数据库中表中的记录）
## DQL语法：
    SELECT  字段列表
    FROM    表名列表
    WHERE   条件列表
    GROUP BY    分组字段列表（btw. 聚合函数）
    HAVING  分组后条件列表
    ORDER BY    排序字段列表
    LIMIT   分页参数

## 基础查询
### 查询多个字段:    SELECT filedName1, filedName2, ... FROM tableName;
### 设置别名:        SELECT filedName [as aliasName] FROM tableName; // 增强可读性
### 去除重复记录:    SELECT DISTINCT filedList FROM tableName;
``` sql
select name, workNo, age from tb_employee;
select * from tb_employee;
select workAddress as '工作地址' from tb_employee; // as 可以省略
select distinct workAddress from tb_employee;
```

## 条件查询

### 比较运算符
1. >, >=, <, <=,=, <>/!=
2. BETWEEN...AND... // 在某个范围（含最大最小）
3. IN(...) // 多选一
4. LIKE // 模糊匹配（_匹配单个字符, %匹配任意字符）
5. IS NULL
### 逻辑运算符
1. AND &&
2. OR ||
3. NOT !
``` sql
select * from tb_employee where age = 88;
select * from tb_employee where age < 20;
select * from tb_employee where age <= 20;
select * from tb_employee where idNo is null;
select * from tb_employee where not idNo is null;
select * from tb_employee where idNo is not null;
select * from tb_employee where not age = 88;
select * from tb_employee where age != 88;
select * from tb_employee where age between 15 and 20;
select * from tb_employee where age >= 15 and age <= 20;
select * from tb_employee where gender = '女' and age < 25;
select * from tb_employee where age = 18 || age = 20 || age = 40;
select * from tb_employee where age in (18, 20, 40);
select name from tb_employee where name like '__';
select idNo from tb_employee where idNo like '%x' || idNo like '%X';
```

## 聚合函数：将一列作为一个整体，进行纵向计算
## count, avg, sum, max, mix
## 用法：SELECT 聚合函数(fieldName) FROM tablename;
## null 不参与所有聚合函数运算
``` sql
select count(*) from tb_employee;
select avg(age) from tb_employee;
select max(age) from tb_employee;
select min(age) from tb_employee;
select count(*) from tb_employee where workAddress = '西安';
```

## 分组查询
## SELECT filedName FROM tableName [WHERE condition] GROUP BY 分组字段名 [HAVING 分组后过滤条件]
## WHERE v.s. HAVING
1. 执行时机不同：where 是分组之前进行过滤，不满足 where 条件的不参与分组；having 是分组之后对结果进行过滤；
2. 判断条件不同：where 不能对聚合函数进行判断；having 可以；
3. 执行顺序：where > 聚合函数 > having；
4. 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无意义。

## 排序查询
## SELECT fieldName FROM tableName ORDER BY filedName1 排序方式1, .....;
## 排序方式：升序 ASC, 降序 DESC

## 分页查询
## SELECT fieldName FROM tableName LIMIT index, size;

## DQL 复习
``` sql
# 查询 年 龄 汐 20,21,22,23 岁 的 女性员工信息 。
select * from tb_employee where age in (20, 21, 22, 23) and gender='女';

# 查询 性 别 为 男 ， 并 且 年 龄 在 20-40 岁 ( 含 ) 以 内 的 姓名 为 三 个 字 的 员工 。
select * from tb_employee where (gender='男') && (age between 20 and 40) && (name like '___');

# 统 计 员工 表 中 , 年 龄 小 于 60 岁 的 ， 男 性 员工 和 女性 员工 的 人 数 。
select gender, count(*) as 人数 from tb_employee where age<60 group by gender;

# 查询 所 有 年 龄 小 于 等 于 35 岁 员工 的 姓名 和 年 龄 ， 并 对 查询 结果 按 年 龄 升序 排序 ， 如 果 年 龄 相同 按 人 入职 时 间 降 序 排序 。
select name, age, entryDate from tb_employee where age<=35 order by age, entryDate desc;

# 坦 询 性 别 为 男 ， 且 年 龄 在 20-40 岁 ( 含 ) 以 内 的 前 5 个 员工 信息 ， 对 查询 的 结果 按 年 龄 升序 排序 ， 年 龄 相同 按 入 职 时 间 升序 排序 。
select * from tb_employee where (gender='男') && (age between 20 and 40) order by age, entryDate desc limit 5;
```

### DQL 的执行顺序
FORM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT (可用别名来验证)
`select e.name as eName, e.age from tb_employee as e where e.age > 15 order by eName;`

# DCL - Data Control Language 数据控制语言，用来管理数据库用户、访问权限
略


# 函数
## 流程函数
1. IF(value, t, f)
2. IFNULL(value1, value2)
3. CASE WHEN [value1] THEN [result1] ... ELSE [default] END // CASE WHEN THEN ELSE END
4. CASE [express] WHEN [value1] THEN [result1] ... ELSE [default] END
``` sql
select
    id,
    workAddress,
    if(workAddress in ('北京', '上海'), 'yes', 'no') as '一线城市',
    (case when workAddress='北京' then '首都' when workAddress='上海' then '魔都' else null end) as '城市等级'
from tb_employee;

select name,
       math,
       case when math>=85 then '优秀' when math >= 60 then '及格' else '不及格' end,
       english,
       case when english>=85 then '优秀' when english >= 60 then '及格' else '不及格' end,
       chinese,
       case when chinese>=85 then '优秀' when chinese >= 60 then '及格' else '不及格' end
from tb_score;
```


# 约束
## 分类
1. 非空约束（NOT NULL）
2. 唯一约束（UNIQUE）       保证该字段所有数据都是唯一、不重复的
3. 主键约束（PRIMARY KEY）  主键是一行数据的唯一标识，要求非空且唯一（可搭配 AUTO_INCREMENT）
4. 外键约束（FOREIGN KEY）  用来让两张表的数据之间建立连接，保证数据的一致性和完整性
5. 默认约束（DEFAULT）      保存数据时，如果未指定该字段的值，则采用默认值
6. 检查约束（CHECK）        保证字段值满足某一个条件
``` sql
create table user(
    id int primary key auto_increment,
    name varchar(20) not null,
    age int check ( age > 0 && age <= 120 ),
    status char(1) default 1 comment '状态',
    gender char(1)
) comment '用户表（用于演示约束）';
```


## 外键

### 设置外键的语法
`CREATE TABLE subTableName ( [CONSTRAINT] [foreignKeyName] FOREIGH KEY (foreignFieldName) REFERENCES mainTableName (fieldName));` // 创建表时注明外键约束
`ALTER TABLE subTableName ADD CONSTRAINT foreignKeyName FOREIGN KEY (foreignFieldName) REFERENCES mainTableName (fieldName) ON UPDATE XX ON DELETE XX;` // 增加外键约束
`ALTER TABLE subTableName DROP FOREIGN KEY foreignFieldName;` // 删除外键约束

### 外键的删除/更新行为
1. NO ACTION / RESTRICT:    主表删除/更新对应记录时，先检查是否有对应外键，如果有则不允许删除/更新。
2. CASCADE:                 ……，如果有则也删除/更新在从表中的记录。
3. SET NULL:                ……，如果有则设置从表中该外键值为NULL。
4. SET DEFAULT:             ……，如果有则设置从表中该外键值为默认值（Innodb 不支持）。
`ON UPDATE XX ON DELETE XX`


# 多表查询

## 表的关系
1. 一对多：在多的一方建立外键，指向一的一方的主键（例子：部门与员工）。
2. 多对多：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键（例子：学生与课程，中间表：学生课程关系表）。
3. 一对一：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一（多用于单表拆分，将一张表的基础字段放在一张表，其他详情字段放在另一张表，提高效率）。

## 笛卡尔积
两个集合所有组合的情况（在多表查询时，需要消除无效的笛卡尔积）

## 多表查询分类
### 连接查询

#### 内连接
查询交集数据
1. 隐式内连接：`SELECT filedName FROM table1, table2 WHERE ...;`
2. 显式外连接：`SELECT filedName FROM table1 INNER JOIN table2 ON joinConditions;`
``` sql
select emp.name, job, dept.name from emp, dept where emp.deptId = dept.id; # 隐式内连接
select emp.name, job, dept.name from emp inner join dept on emp.deptId = dept.id; # 显式内连接
```
#### 外连接
1. 左外连接：查询左表所有数据，以及两张表交集部分数据
    `SELECT filedName FROM table1 LEFT OUTER JOIN table2 ON joinConditions;`
2. 右外连接：查询右表所有数据，以及两张表交集部分数据
    `SELECT filedName FROM table1 RIGHT OUTER JOIN table2 ON joinConditions;`
``` sql
# 外连接 查询员工对应的部门
select emp.name, job, dept.name from emp left outer join dept on emp.deptId = dept.id;
select emp.name, job, dept.name from dept right outer join emp on emp.deptId = dept.id;
# 外连接 查询部门有什么员工
select dept.name, emp.name from emp right outer join dept on emp.deptId = dept.id;
```

#### 自连接
当前表与自身的连接查询（自连接必须使用表别名；不要看成是一张表，二是看成两张表）
`SELECT filedName FROM tableName as aliasA JOIN tableName as aliasB ON joinConditions;`
自连接查询，可以是内连接查询，也可以是外连接查询。
``` sql
# 自连接：查询员工及其所属领导的名字
select empA.name as '姓名', empb.name as '领导' from emp as empA left outer join emp as empB on empA.managerId = empb.id;
```

### 联合查询 （union）：把多次查询的结果合并起来，形成一个新的查询结果集
``` sql
SELECT filed FROM A
UNION ALL # 带ALL就是直接合并，不带就是去重
SELECT filed FROM B;
```
注意：
1. 对于联合查询的多张表的列数、字段类型必须保持一致。
2. UNION ALL 会将全部的数据直接合并在一起，UNION 会对合并之后的数据去重。


### 子查询（AKA. 嵌套查询）：SQL语句中嵌套SELECT语句
如：`SELECT X FROM table1 WHERE column1 = ( SELECT column1 FROM table2 );`
子查询外部的语句可以是 INSERT/UPDATE/DELETE/SELECT 的任何一个。

根据子查询位置可分类：
1. WHERE之后
1. FROM之后
1. SELECT之后

根据子查询的结果可分类：
1. 标量子查询（子查询结果是单个值）
2. 列子查询（子查询结果是一列）
3. 行子查询（子查询结果是一行）
4. 表子查询（子查询结果是多行多列）

#### 标量子查询
常用的操作符：=, !=, >, <。
``` sql
# 标量子查询：查询销售部的所有员工信息
select * from emp where deptId = (select id from dept where name = '销售部');
# 标量子查询：查询在方东白入职之后的员工信息
select * from emp where entryDate > (select entryDate from emp where name = '方东白');
```

#### 列子查询
常用操作符：IN, NOT IN, ANY, SOME, ALL
新操作符说明：
1. ANY / SOME：子查询返回的列表中，有任意一个满足即可
2. ALL: 子查询返回的列表中，所有值都必须满足
``` sql
# 列子查询：查询销售部和市场部的所有员工信息
select * from emp where deptId in (select id from dept where name in ('销售部', '市场部'));
# 列子查询：查询比财务部所有人工资都高的员工信息
select * from emp where salary > all
(select salary from emp where deptId = (select id from dept where name in ('财务部')));
select * from emp where salary >
(select max(salary) from emp where deptId = (select id from dept where name in ('财务部')));
# 列子查询：查询比研发部其中任意一人工资高的员工信息
select * from emp where salary > any
(select salary from emp where deptId = (select id from dept where name in ('研发部')));
select * from emp where salary >
(select min(salary) from emp where deptId = (select id from dept where name in ('研发部')));
```

#### 行子查询
常用的操作符：=, !=, >, <。
``` sql
# 行子查询：查询与张无忌的薪资及直属领导相同的员工信息
select * from emp where (salary, managerId) =
(select salary, managerId from emp where name = '张无忌');
```

#### 表子查询
常用的操作符：IN。
常放在FROM之后，作为临时表进行联合查询
``` sql
# 表子查询：查询与鹿杖客、宋远桥的职位与薪资相同的员工信息
select * from emp where (job, salary) = some
(select job, salary from emp where name in ('鹿杖客', '宋远桥'));
# 表子查询：查询入职日期是 2006-01-01 之后的员工、部门信息
select * from (
    select emp.*, dept.name as deptName from emp left outer join dept on emp.deptId = dept.id
) as emp_dept where emp_dept.entryDate > '2006-01-01';
select * from
             (select * from emp where entryDate > '2006-01-01') as sub_emp
left outer join dept on sub_emp.deptId = dept.id;
```

#### 多表查询练习
``` sql
#####################################################################
# 多表查询练习
#####################################################################

# 1 查询员工的姓名、年龄、职位、部门信息
select emp.name, emp.age, emp.job, dept.name from emp left outer join dept on emp.deptId = dept.id;

# 2 查询年龄小于30岁的员工的姓名、年龄、职位、部门信息
select * from (
    select emp.name, emp.age, emp.job, dept.name as deptName from emp left outer join dept on emp.deptId = dept.id
) as emp_dept where emp_dept.age < 30;
select less30Emp.*, dept.name from dept right outer join (
    select name, age, job, deptId from emp where age < 30
) as less30Emp on dept.id = less30Emp.deptId;

# 3 查询拥有员工的部门ID、部门名称
select dept.* from dept, (
    select distinct deptId from emp where not deptId is null
) as deptIdHasEmp where dept.id = deptIdHasEmp.deptId;
select distinct dept.* from dept, emp where dept.id = emp.deptId;

# 4 查询所有年龄大于40岁的员工, 及其归属的部门名称; 如果员工没有分配部门, 也需要展示出来
select over40Emp.*, dept.name from dept right outer join (
    select * from emp where age > 40
) as over40Emp on dept.id = over40Emp.deptId;

# 5 查询所有员工的工资等级
select emp.name, salgrade.grade from emp left outer join salgrade on emp.salary between salgrade.losal and salgrade.hisal;

# 6 查询 "研发部" 所有员工的信息及工资等级
select devEmp.*, salgrade.grade as salgradeGrade from salgrade right outer join (
    select * from emp where deptId = (select id from dept where name = '研发部')
) as devEmp on devEmp.salary between salgrade.losal and salgrade.hisal;
select emp.name, salgrade.grade from emp left outer join salgrade on emp.salary between salgrade.losal and salgrade.hisal;

# 7 查询 "研发部" 员工的平均工资
select avg(devEmp.salary) from (select * from emp where deptId = (select id from dept where name = '研发部')) as devEmp;

# 8 查询工资比 "灭绝" 高的员工信息
select * from emp where salary > (select salary from emp where name = '灭绝');

# 9 查询比平均薪资高的员工信息
select * from emp where salary > (select avg(salary) from emp);

# 10 查询低于本部门平均工资的员工信息
# select deptId, avg(salary) from emp where deptId is not null group by deptId;
select * from emp as e1 where salary < (select avg(salary) from emp as e2 where e2.deptId = e1.deptId);

# 11 查询所有的部门信息, 并统计部门的员工人数
select count(*) from emp where emp.deptId = 1;
select dept.*, (select count(*) from emp where emp.deptId = dept.id) from dept;

# 12 查询所有学生的选课情况, 展示出学生名称, 学号, 课程名称
use itheima;
select tb_students.* from tb_students;
select tb_students.name, tb_students.studentNo, tb_courses.name from tb_student_course, tb_students, tb_courses where tb_students.id = tb_student_course.studentId && tb_courses.id = tb_student_course.courseId;
```

# 事务
事务是一组操作的集合，是不可分割的工作单位。事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求（即这些操作要么同时成功，要么同时失败）。









