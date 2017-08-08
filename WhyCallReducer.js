var action = [
    {
		type: 'ADD',
        v: 5
    }
]

action.reduce((status, act)=> {
    if (act.type === 'ADD') {
        return {...status,
                v: status.v + act.v
               }
    }
    return status
}, {
    v: 1,
    a: 100
})


//以下代码来自阮一峰的博客，注释为lcfme(github.com/lcfme)添加

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

//dispatch 函数负责调用reducer函数更新状态
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

//subscript负责想监听列表里面注册state改变后的回调事件
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
