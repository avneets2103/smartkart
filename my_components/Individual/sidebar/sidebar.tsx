import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sidebarMenu } from "@/CONSTANTS";
import { sidebarMenuItems } from "@/Interfaces";
import { setCurrentPage } from "@/RTK/features/sidebar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";

const Sidebar: React.FC = () => {
  const dispatcher = useDispatch();
  const Router = useRouter();
  const currentPage = useSelector((state: any) => state.sidebar.currentPage);
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>([""]));
  const [showPopover, setShowPopover] = useState(false);

  interface listItem {
    emoji: string;
    key: string;
    name: string;
    lastUpdatedAt: Date;
  }
  const options: listItem[] = [
  ];
  const [listArray, setListArray] = useState(options);
  useEffect(() => {
    const updatedList = [...listArray];
    updatedList.sort((a, b) => b.lastUpdatedAt.getTime() - a.lastUpdatedAt.getTime());
    setListArray(updatedList);
    if(listArray.length > 0) {setSelectedKeys(new Set([listArray[0].key]));}
  }, [listArray]);

  const [newListInfo, setNewListInfo] = useState({
    name: "",
    emoji: "",
    budget: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddList = () => {
    setNewListInfo({ name: "", emoji: "", budget: "" });
    listArray.push({ emoji: newListInfo.emoji, key: newListInfo.name, name: newListInfo.name, lastUpdatedAt: new Date() });
    setListArray([...listArray]); // Trigger re-render
    setShowPopover(false); // Close the popover
  };

  return (
    <div className="flex h-screen w-[6rem] items-center justify-center">
      <div className="flex h-full w-[3rem] flex-col justify-between gap-[2rem] py-[1rem]">
        <div className="flex flex-col items-center justify-center gap-[0.7rem]">
          <div>
            <img
              src="../icons/logo.png"
              alt="logo"
              className="w-full p-[5px]"
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-[0.8rem] rounded-[25px] bg-color1 py-[1rem] drop-shadow-md">
            <Popover
              placement="bottom-start"
              showArrow
              offset={10}
              backdrop="opaque"
              isOpen={showPopover}
              onClose={() => setShowPopover(false)}
            >
              <PopoverTrigger>
                <div
                  className="flex w-full items-center justify-center"
                  onClick={() => setShowPopover(true)}
                >
                  <img
                    src="../icons/addition.png"
                    alt="add"
                    className="w-[34%]"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                {(titleProps) => (
                  <div className="relative w-full px-1 py-2">
                    <p
                      className="text-small font-bold text-foreground"
                      {...titleProps}
                    >
                      Add New List
                    </p>
                    <div className="mt-2 flex w-full flex-col gap-2">
                      <Input
                        value={newListInfo.name}
                        onChange={(e) =>
                          setNewListInfo({
                            ...newListInfo,
                            name: e.target.value,
                          })
                        }
                        label="Name"
                        size="sm"
                        variant="bordered"
                      />
                      <Input
                        value={newListInfo.budget}
                        onChange={(e) =>
                          setNewListInfo({
                            ...newListInfo,
                            budget: e.target.value,
                          })
                        }
                        label="Budget"
                        size="sm"
                        variant="bordered"
                      />
                      <div className="relative flex w-full gap-1">
                        <Button
                          size="lg"
                          isIconOnly
                          color="primary"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="w-1/4"
                        >
                          {newListInfo.emoji === "" ? (
                            <img
                              src="../icons/heartEmoji.png"
                              alt="emoji"
                              className="w-[20px]"
                            />
                          ) : (
                            newListInfo.emoji
                          )}
                        </Button>
                        {showEmojiPicker && (
                          <EmojiPicker
                            className="emoji-picker"
                            onEmojiClick={(emoji) => {
                              setNewListInfo({
                                ...newListInfo,
                                emoji: emoji.emoji,
                              });
                              setShowEmojiPicker(false);
                            }}
                            reactionsDefaultOpen={false}
                          />
                        )}
                        <Button
                          color="default"
                          size="lg"
                          className="width-3/4"
                          onClick={handleAddList}
                        >
                          Add your List
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Dropdown>
              <DropdownTrigger>
                <img
                  src="../icons/list.NS.png"
                  alt="list"
                  className="w-[40%]"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="faded"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) =>
                  setSelectedKeys(keys as Set<string>)
                }
                className="custom-dropdown"
              >
                {listArray.map((option) => (
                  <DropdownItem
                    key={option.key}
                    startContent={
                      <span>{option.emoji}</span>
                    }
                  >
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <img
              src={
                theme === "light"
                  ? "../icons/lightMode.png"
                  : "../icons/darkMode.png"
              }
              alt="Theme"
              className="w-[40%]"
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-color1 py-[0.2rem] drop-shadow-md">
            {sidebarMenu.map((item: sidebarMenuItems, index: number) => {
              if (item.path === currentPage) {
                return (
                  <div
                    key={index}
                    className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-secondaryColor"
                  >
                    <img src={item.iconS} alt={item.name} className="w-[40%]" />
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1"
                  onClick={() => {
                    dispatcher(setCurrentPage({ currentPage: item.path }));
                    Router.push(`/sections/${item.path}`);
                  }}
                >
                  <img src={item.iconNS} alt={item.name} className="w-[40%]" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center rounded-[25px] bg-color1 py-[0.2rem] drop-shadow-md">
          <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1">
            <img
              src={"../icons/setting.NS.png"}
              alt={"settings"}
              className="w-[40%]"
            />
          </div>
          <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center justify-center rounded-[50%] bg-color1">
            <img
              src={`../icons/avatar${Number(Cookies.get("avatarNumber")) || 1}.png`}
              alt={"avatar"}
              className="w-[95%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;