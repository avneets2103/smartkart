import { BACKEND_URI } from "@/CONSTANTS";
import axios from "@/utils/axios";
import { ToastErrors, ToastInfo } from "./toastError";

interface listItem {
    emoji: string;
    key: string;
    name: string;
    budget: string;
}

const handleAddList = async (newListInfo:listItem, setNewListInfo: Function, setListNameEntered: Function, setListArray: Function, setSelectedKeys: Function, setShowPopover: Function, listArray: listItem[]) => { 
  if(newListInfo.name === ""){
    setListNameEntered(false);
    return;
  }
  const newItem = { 
      key: generateUniqueKey(), 
      name: newListInfo.name, 
      budget: newListInfo.budget || "0",
      emoji: newListInfo.emoji || "🐒", 
  };
  setNewListInfo({emoji: "", name: "", budget: ""});
  const addListRes = await axios.post(`${BACKEND_URI}/list/addNewList`, newItem);
  console.log(addListRes.data.statusCode);
  if(addListRes.data.statusCode !== 200){
    ToastErrors("Error adding list");
    return;
  }
  ToastInfo(`${newItem.name} added !`);
  const updatedList = [newItem, ...listArray];
  setListArray(updatedList);
  setSelectedKeys(new Set([newItem.key]));
  setShowPopover(false);
};

const generateUniqueKey = () => {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
};

export { handleAddList, generateUniqueKey };