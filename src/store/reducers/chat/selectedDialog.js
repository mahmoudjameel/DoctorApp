import {
  SELECT_DIALOG,
  UNSELECT_DIALOG
} from '../../actions/chat/selectedDialog'


export default (selectedDialog = null, action) => {
  switch (action.type) {
    case SELECT_DIALOG: {
      return action.dialog_id
    }

    case UNSELECT_DIALOG:
      return null

    default:
      return selectedDialog
  }
}
