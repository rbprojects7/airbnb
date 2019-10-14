import createChild from './createChild';
import updateChild from './updateChildDetails';
import { toastr } from 'react-redux-toastr';

export default async function submit(values, dispatch, props){

  const { year, day, month} = values;
  values.birthday = `${year}-${month}-${day}`;

  if(values.childSelect === "Add Child"){
    await createChild(values, dispatch, props);
  } else if(values.childSelect){
    await updateChild(values, dispatch, props)
  } else{
    toastr.error("Update Child Details Failed", "Sorry, something went wrong! Reload this page and try again!");
  }
}
