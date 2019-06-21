const reducer = (
  state = {
    LoginStatus: false,
  },
  action,
) => {
  const { LoginStatus } = action;
  switch (action.type) {
    case 'SetLoginStatus':
      return {
        LoginStatus,
      };
    default:
      return state;
  }
};

// reducer 根据action type 返回state
export default reducer;
