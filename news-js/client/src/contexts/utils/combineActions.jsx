const combineActions = (actions, dispatch) => {
  const actionKeys = Object.keys(actions);
  const actionValues = Object.values(actions);

  let finalActions = {};
  actionValues.forEach((value, index) => {
    finalActions = {
      ...finalActions,
      [actionKeys[index]]: value(dispatch),
    };
  });

  return [finalActions];
};

export default combineActions;
