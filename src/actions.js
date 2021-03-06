export const Action = Object.freeze({
  LoadAllOrders: 'LoadAllOrders',
  AddOrder: 'AddOrder',
  AddItemToTicket: 'AddItemToTicket',
  RemoveItemFromTicket: 'RemoveItemFromTicket',
  ClearTicket: 'ClearTicket',
  DeleteOrder: 'DeleteOrder',
  ShowTicketError: 'ShowTicketError',
  HideProgress: 'HideProgress',
  ShowProgress: 'ShowProgress',
  ShowCustomerErrorMessage: 'ShowCustomerErrorMessage',
  HideCustomerErrorMessage: 'HideCustomerErrorMessage',
  ShowEmployeeErrorMessage: 'ShowEmployeeErrorMessage',
  HideEmployeeErrorMessage: 'HideEmployeeErrorMessage',
  ShowNameEdit: 'ShowNameEdit',
  HideNameEdit: 'HideNameEdit',
  SubmitNameEdit: 'SubmitNameEdit'
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

export function addOrder() {
  return { type: Action.AddOrder };
}

export function clearTicket() {
  return { type: Action.ClearTicket }
}

export function showTicketError() {
  return { type: Action.ShowTicketError }
}

export function addItemToTicket(item) {
  return { type: Action.AddItemToTicket, payload: item };
}

export function removeItemFromTicket(item) {
  return { type: Action.RemoveItemFromTicket, payload: item };
}

export function deleteOrder() {
  return { type: Action.DeleteOrder }
}

export function hideProgress() {
  return { type: Action.HideProgress }
}

export function showProgress() {
  return { type: Action.ShowProgress }
}

export function showCustomerErrorMessage(message) {
  return { type: Action.ShowCustomerErrorMessage, payload: message }
}

export function hideCustomerErrorMessage() {
  return { type: Action.HideCustomerErrorMessage, payload: '' }
}

export function showEmployeeErrorMessage(message) {
  return { type: Action.ShowEmployeeErrorMessage, payload: message }
}

export function hideEmployeeErrorMessage() {
  return { type: Action.HideEmployeeErrorMessage, payload: '' }
}

export function showNameEdit(id) {
  return { type: Action.ShowNameEdit, payload: id }
}

export function hideNameEdit(id) {
  return { type: Action.HideNameEdit, payload: id }
}

export function submitNameEdit(orderId, name) {
  if (!name) {
    return dispatch => { dispatch(showEmployeeErrorMessage("Please enter a name.")) };
  } else {
    const body = {
      name: name
    }
    return dispatch => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      fetch(`https://project2.jacquelyn-hendricks.me:8443/orders/${orderId}`, options)
        .then(assertResponse)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            dispatch(hideNameEdit(orderId));
            dispatch(hideEmployeeErrorMessage());
            dispatch(fetchAllOrders());
          }
        });
    };
  }
}

export function fetchAllOrders() {
  return dispatch => {
    dispatch(showProgress());
    fetch(`https://project2.jacquelyn-hendricks.me:8443/`)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(order => order.items = JSON.parse(order.items));
        dispatch(loadAllOrders(data.results));
        dispatch(hideProgress());
      });
  };
}

export function postNewOrder(name, items, total, isEditing) {
  if (!name) {
    return dispatch => { dispatch(showCustomerErrorMessage("Please enter a name.")) };
  } else {
    const order = {
      name,
      items: JSON.stringify(items),
      total,
      isEditing: false
    }

    return dispatch => {
      dispatch(showProgress());
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
            dispatch(addOrder());
            dispatch(clearTicket());
            dispatch(hideCustomerErrorMessage());
          } else {
            dispatch(showCustomerErrorMessage("Please enter a name."));
          }
          dispatch(hideProgress());
        });
    };
  }
}

export function deleteAnOrder(order) {
  return dispatch => {
    dispatch(showProgress());
    const options = {
      method: 'DELETE',
    };
    fetch(`https://project2.jacquelyn-hendricks.me:8443/orders/${order.id}`, options)
      .then(assertResponse)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          dispatch(deleteOrder());
          dispatch(fetchAllOrders());
          dispatch(hideProgress());
        }
      })
  }
}