import { BACKEND_URI } from "@/CONSTANTS";
import axios from "@/utils/axios";
import { ToastErrors, ToastInfo } from "./toastError";
import { setCurrentList } from "@/RTK/features/sidebar";

interface listItem {
    emoji: string;
    key: string;
    name: string;
    budget: string;
}

const handleAddList = async (newListInfo:listItem, setNewListInfo: Function, setListNameEntered: Function, setListArray: Function, setSelectedKeys: Function, setShowPopover: Function, listArray: listItem[], dispatcher: Function) => { 
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
  if(addListRes.data.statusCode !== 200){
    ToastErrors("Error adding list");
    return;
  }
  ToastInfo(`${newItem.name} added !`);
  const updatedList = [newItem, ...listArray];
  setListArray(updatedList);
  setSelectedKeys(new Set([newItem.key]));
  dispatcher(setCurrentList({ currentList: newItem.key }));
  setShowPopover(false);
};

const getListArray = async (setListArray: Function, setSelectedKeys: Function, dispatcher: Function) => {
  const listRes = await axios.post(`${BACKEND_URI}/list/getListArray`);
  console.log(listRes.data);
  if(listRes.data.statusCode !== 200){
    ToastErrors("Error fetching list");
    return;
  }
  setListArray(listRes.data.data.listArray);
  if(listRes.data.data.listArray.length > 0){
    setSelectedKeys(new Set([listRes.data.data.listArray[0].key]));
    dispatcher(setCurrentList({ currentList: listRes.data.data.listArray[0].key }));
  }
};

const generateUniqueKey = () => {
  return `${new Date().getTime()}-${Math.floor(Math.random() * 10000000000)}`;
};

export { handleAddList, generateUniqueKey, getListArray };