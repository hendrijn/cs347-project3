export const Action = Object.freeze({
  LoadAllOrders: 'LoadAllOrders',
  AddOrder: 'AddOrder'
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

export function addOrder(orderId) {
  return { type: Action.AddOrder, payload: orderId };
}

export function fetchAllOrders() {
  return dispatch => {
    fetch(`https://project2.jacquelyn-hendricks.me:8443/`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        dispatch(loadAllOrders(data.results));
      });
  };
}

export function postNewOrder(name, items, total) {
  const order = {
    name,
    items,
    total,
  }

  return dispatch => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    };

    fetch(`https://project2.jacquelyn-hendricks.me:8443/orders`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(addOrder(data.results));
        };
      });
  };
}