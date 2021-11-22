const initailState = 
{
  donate: 0,
  message: '',
  warningMessage: '',
  selectedDonation: '',
  summaryDonation: 0
};

const commonReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return Object.assign({}, state, {
        donate: state.donate + action.amount,
      });
    case 'UPDATE_MESSAGE':
      return Object.assign({}, state, {
        message: action.message,
      });
    case 'UPDATE_SELECTED_DONATION':
      return Object.assign({}, state, {
        selectedDonation: action.selectedDonation,
      });
    case 'UPDATE_SUMMARY_DONATION':
      return Object.assign({}, state, {
        summaryDonation: state.summaryDonation + action.summaryDonation,
      });
    case 'UPDATE_WARNING':
      return Object.assign({}, state, {
        warningMessage: action.warningMessage,
      });

    default: return state;
  }
}

export default commonReducer;