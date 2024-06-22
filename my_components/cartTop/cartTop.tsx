import React, { useEffect, useState } from "react";
import SectionDisplay from "../Individual/sectionDisplay/sectionDisplay";
import { useDispatch, useSelector } from "react-redux";
import { setCustomized, setSearchString } from "@/RTK/features/cart";
import { Input } from "@nextui-org/input";

function CartTop() {
  const dispatcher = useDispatch();
  const selectedTab = useSelector((state: any) => state.cart.customized);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if(searchValue === ""){
        dispatcher(setSearchString(searchValue));
    }
  }, [searchValue]);

  return (
    <div className="width-[100%] my-4 mx-4 flex h-[7%] cursor-pointer items-center font-medium justify-between">
      {/* left part */}
      <div className="flex gap-4">
        {/* Home, My Cart */}
        <SectionDisplay />
        {/* standard /  customized */}
        <div className="flex items-center rounded-[10px] bg-color1">
          <div
            className={
              selectedTab
                ? "m-[2px] mr-0 w-[7rem] rounded-[10px] p-2 pr-2 text-center text-sm text-textColorDark"
                : "m-1 mr-0 w-[7rem] rounded-[10px] bg-secondaryColor p-2 pr-2 text-center text-sm text-primaryColor"
            }
            onClick={() => {
              dispatcher(setCustomized(0));
            }}
          >
            Standard
          </div>
          <div
            className={
              !selectedTab
                ? "m-[2px] ml-0 w-[7rem] rounded-[10px] p-2 pr-2 text-center text-sm text-textColorDark"
                : "m-1 ml-0 w-[7rem] rounded-[10px] bg-secondaryColor p-2 pr-2 text-center text-sm text-primaryColor"
            }
            onClick={() => {
              dispatcher(setCustomized(1));
            }}
          >
            Customized
          </div>
        </div>
      </div>
      {/* right part */}
      <div className="flex gap-2 h-[7vh] items-end">
        <Input
          isClearable
          radius="sm"
          placeholder="Search anything"
          startContent={
            <div>
                < img src="../icons/search.png" className="w-[15px]" alt="logo" />
            </div>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
                dispatcher(setSearchString(searchValue));
            }
          }}
        />
        <div className="flex items-center gap-2">
            <div className="bg-secondaryColor w-9 h-9 rounded-full flex items-center justify-center">
              <img src="../icons/additionH.png" className="w-[15px]" alt="logo" />
            </div>
            <div className="bg-secondaryColor w-9 h-9 rounded-full flex items-center justify-center">
              <img src="../icons/filterH.png" className="w-[15px]" alt="logo" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default CartTop;
