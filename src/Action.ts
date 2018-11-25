enum Action {
  'DELETE',
  'GET',
  'PATCH',
  'POST',
  'PUT'
}

export function getAction(actionName: string): Action {
  actionName = actionName.toUpperCase();
  switch (actionName) {
    case 'DELETE':
      return Action.DELETE;
    case 'GET':
      return Action.GET;
    case 'PATCH':
      return Action.PATCH;
    case 'POST':
      return Action.POST;
    case 'PUT':
      return Action.PUT;
  }
  throw new Error(`Failed to get action '${actionName}'`);
}

export default Action;
