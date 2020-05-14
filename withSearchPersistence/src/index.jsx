import PropTypes from 'prop-types';
import React from 'react';

/**
 * 搜索数据持久层
 * 应用场景：页面刷新、返回，保留搜索条件
 * 对代码的改造，需要子组件定义 this.props.searchCustomized、this.props.resetCustomized
 * 
 * @param {Array} searchParams 搜索条件数据结构的key值，默认['searchParams']，一般实现都不会是默认值，需要用户手动输入，eg: ['id', 'name', 'updatedAt']
 * @param {String} saveKey 保存搜索条件数据结构的key值，推荐以 SearchParams 为结尾，如存在多个保存结果时，请注意区分key！！！
 * @param {String} search 搜索的方法名，默认 search，需子组件定义 this.props.searchCustomized，查询方法调用 searchCustomized
 * @param {String} reset 重置的方法名，默认 reset，需子组件定义 this.props.resetCustomized，查询方法调用 resetCustomized
 * @param {String} searchFieldsType 搜索条件部分数据类型，目前只支持state和form(antd)类型，默认state
 * @param {String} ref 若使用二级组件，需声明ref
 * 
 * @returns {ReactElement}
 */
const withSearchPersistence = ({
  searchParams = ['searchParams'],
  saveKey = 'searchParams',
  search = 'search',
  reset = 'reset',
  searchFieldsType,
  ref,
} = {}) => WrappedComponent => (
  class extends React.Component {

    componentDidMount() {
      const { state } = this.props.location;
      if (state && state[saveKey]) {
        setTimeout(() => {
          if (searchFieldsType === 'form') {
            this.$component.props.form.setFieldsValue(state[saveKey]);
            setTimeout(this.search, 250);
          } else {
            this.$component.setState(state[saveKey], () => {
              setTimeout(this.search, 250);
            });
          }
        }, 0);
      }
    }

    render() {
      return (
        <WrappedComponent
          ref={(component) => {
            if (ref && component) this.$component = component[ref];
            else this.$component = component;
          }}
          {...this.props}
          searchCustomized={this.search}
          resetCustomized={this.reset} />
      );
    }

    search = (...args) => {
      this.$component[search].apply(this.$component, ...args);

      setTimeout(() => {
        const { pathname, state } = this.props.location;
        this.props.router.replace({
          pathname,
          state: {
            ...state,
            [saveKey]: this.getState(),
          },
        });
      }, 0);
    };

    reset = (...args) => {
      this.$component[reset].apply(this.$component, ...args);

      const { pathname, state } = this.props.location;
      if (state && state[saveKey]) delete state[saveKey];
      this.props.router.replace({
        pathname,
        state,
      });
    };

    getState = () => {
      let refState = this.$component.state;
      if (searchFieldsType === 'form') {
        refState = this.$component.props.form.getFieldsValue();
      }

      return (
        refState
          ? searchParams.reduce((res, item) => {
            if (item in refState) res[item] = refState[item];
            return res;
          }, {})
          : null
      );
    };
  }
);

withSearchPersistence.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withSearchPersistence;
