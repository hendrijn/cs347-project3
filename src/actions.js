export const Action = Object.freeze({
  LoadAllOrders: 'LoadAllOrders',
  AddOrder: 'AddOrder',
  AddItemToTicket: 'AddItemToTicket',
  RemoveItemFromTicket: 'RemoveItemFromTicket'
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
  return { type: Action.AddOrder, payload: {} };
}

export function addItemToTicket(item) {
  return { type: Action.AddItemToTicket, payload: item };
}

export function removeItemFromTicket(item) {
  return { type: Action.RemoveItemFromTicket, payload: item };
}

export function fetchAllOrders() {
  return dispatch => {
    fetch(`https://project2.jacquelyn-hendricks.me:8443/`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        // update the items array so it's parsed before the dispatch
        // replace each items' string with the parsed structure
        // for each order in orders, get the items string and parse it
        data.results.forEach(order => order.items = JSON.parse(order.items));
        console.log(data.results);
        dispatch(loadAllOrders(data.results));
      });
  };
}

export function postNewOrder(name, items, total) {
  const order = {
    name,
    items: JSON.stringify(items),
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

    fetch(`https://project2.jacquelyn-hendricks.me:8443/orders`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          console.log(data.results)
          dispatch(addOrder(data.results));
        };
      });
  };
}