export const Action = Object.freeze({
  LoadAllOrders: 'LoadAllOrders'
});

function assertResponse(response) {
  if (response.status >= 200 || response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}


export function loadAllOrders(orders) {
  return { type: Action.LoadAllOrders, payload: orders };
}

export function fetchAllOrders() {
  return dispatch => {
    fetch(`https://project2.jacquelyn-hendricks.me:8443/`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        dispatch(loadAllOrders(data.results)); //Unhandled Rejection (Error): Actions may not have an undefined "type" property. You may have misspelled an action type string constant.
      });
  };
}