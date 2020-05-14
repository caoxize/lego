# withSearchPersistence

## 搜索数据持久层

### 应用场景：页面刷新、返回，保留搜索条件

### 对代码的改造，需要子组件定义 this.props.searchCustomized、this.props.resetCustomized

#### 参数说明

```js
 @param {Array} searchParams 搜索条件数据结构的key值，默认['searchParams']，一般实现都不会是默认值，需要用户手动输入，eg: ['id', 'name', 'updatedAt']
 @param {String} saveKey 保存搜索条件数据结构的key值，推荐以 SearchParams 为结尾，如存在多个保存结果时，请注意区分key！！！
 @param {String} search 搜索的方法名，默认 search，需子组件定义 this.props.searchCustomized，查询方法调用 searchCustomized
 @param {String} reset 重置的方法名，默认 reset，需子组件定义 this.props.resetCustomized，查询方法调用 resetCustomized
 @param {String} searchFieldsType 搜索条件部分数据类型，目前只支持state和form(antd)类型，默认state
 @param {String} ref 若使用二级组件，需声明ref
```

#### 我是一个栗子

```js
@withSearchPersistence({
  searchParams: ['param1', 'param2'], // eg: ['id', 'updatedBy']
  saveKey: 'xxxSearchParams',
})
class YourComp extends React.Component {
  constructor() {
    super();
    this.state = { param1: '', param2: '' };
  }
  render() {
    return (
      <div searchCustomized={this.props.searchCustomized} resetCustomized={this.props.resetCustomized} />
    );
  }
  search = () => {};
  reset = () => {};
}
export defalut YourComp;
```
