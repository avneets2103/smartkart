import React, { useEffect, useState, useRef } from "react";
import SectionDisplay from "../Individual/sectionDisplay/sectionDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  setColumns,
  setCustomized,
  setFilterStateData,
  setOptions,
  setProductData,
  setSearchString,
  setUtilityStateData,
} from "@/RTK/features/cart";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import axios from "@/utils/axios";
import { BACKEND_URI } from "@/CONSTANTS";
import { ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { CircularProgress } from "@nextui-org/react";

interface CustomField {
  key: string;
  value: string;
}

interface Column {
  listId: string;
  colId: string;
  name: string;
  type: "number" | "string";
  range: number[] | string[];
}

function CartTop() {
  const listId = useSelector((state: any) => state.sidebar.currentList);
  const dispatcher = useDispatch();
  const selectedTab = useSelector((state: any) => state.cart.customized);
  const [searchValue, setSearchValue] = useState("");
  const [productLink, setProductLink] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addProductModalIsOpen, setAddProductModalIsOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [utiltyModalIsOpen, setUtilityModalIsOpen] = useState(false);
  const [filterData, setFilterData] = useState<{ [key: string]: any }>({});
  const [utilityData, setUtilityData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const keyInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchValue === "") {
      dispatcher(setSearchString(searchValue));
    }
  }, [searchValue]);

  const handleAddField = () => {
    const newField = { key, value };

    setCustomFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.key === key);

      if (fieldIndex !== -1) {
        const updatedFields = [...prevFields];
        updatedFields[fieldIndex] = newField;
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      } else {
        const updatedFields = [newField, ...prevFields];
        return updatedFields.sort((a, b) => a.key.localeCompare(b.key));
      }
    });

    setKey("");
    setValue("");
    keyInputRef.current?.focus();
  };

  const handleRemoveField = (indexToRemove: number) => {
    setCustomFields((prevFields) => {
      const updatedFields = prevFields.filter(
        (_, index) => index !== indexToRemove,
      );
      return updatedFields;
    });
  };

  const getModalHeader = () => {
    if (addProductModalIsOpen) {
      return "Add product to cart using product link";
    } else if (filterModalIsOpen) {
      return "Filter products";
    } else if (utiltyModalIsOpen) {
      return "Set Utility";
    }
  };

  const handleFilterChange = (colId: string, listId: string, value: any) => {
    setFilterData((prevData) => ({
      ...prevData,
      [listId + "_" + colId]: value,
    }));
  };

  const handleUtilityChange = (colId: string, listId: string, value: any) => {
    setUtilityData((prevData) => ({
      ...prevData,
      [listId + "_" + colId]: value,
    }));
  };

  const cols: Column[] = [
    {
      listId: "watch",
      colId: "price",
      name: "Price",
      type: "number",
      range: [400, 5000],
    },
    {
      listId: "watch",
      colId: "warranty",
      name: "Warranty",
      type: "number",
      range: [0, 4],
    },
    {
      listId: "watch",
      colId: "rating",
      name: "Rating",
      type: "number",
      range: [0, 5],
    },
    {
      listId: "watch",
      colId: "color",
      name: "Color",
      type: "string",
      range: ["Red", "Blue", "Green", "Yellow", "Orange"],
    },
    {
      listId: "watch",
      colId: "ip",
      name: "IP Rating",
      type: "string",
      range: ["IPX4", "IPX6", "IPX7", "IPX8", "IPX9"],
    },
    {
      listId: "watch",
      colId: "brand",
      name: "Brand",
      type: "string",
      range: ["Apple", "Samsung", "LG", "Huawei", "Xiaomi"],
    },
    {
      listId: "watch",
      colId: "display",
      name: "Display size",
      type: "number",
      range: [1.3, 2.5],
    },
  ];

  return (
    <div className="width-[100%] my-4 flex h-[7%] cursor-pointer items-center justify-between font-medium">
      <div className="flex gap-4">
        <SectionDisplay />
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
      <div className="flex h-[7vh] items-end gap-2">
        <Input
          isClearable
          radius="sm"
          placeholder="Search anything"
          startContent={
            <div>
              <img src="../icons/search.png" className="w-[15px]" alt="logo" />
            </div>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatcher(setSearchString(searchValue));
            }
          }}
        />
        <div className="flex items-center gap-2">
          {selectedTab ? (
            <div
              className="flex items-center justify-center rounded-md bg-secondaryColor px-4 py-[0.4rem] text-primaryColor"
              onClick={() => {
                onOpen();
                setUtilityModalIsOpen(true);
                setAddProductModalIsOpen(false);
                setFilterModalIsOpen(false);
              }}
            >
              Utility
            </div>
          ) : (
            <></>
          )}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondaryColor"
            onClick={() => {
              onOpen();
              setAddProductModalIsOpen(true);
              setFilterModalIsOpen(false);
              setUtilityModalIsOpen(false);
            }}
          >
            <img src="../icons/additionH.png" className="w-[15px]" alt="logo" />
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondaryColor"
            onClick={() => {
              onOpen();
              setFilterModalIsOpen(true);
              setAddProductModalIsOpen(false);
              setUtilityModalIsOpen(false);
            }}
          >
            <img src="../icons/filterH.png" className="w-[15px]" alt="logo" />
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  {getModalHeader()}
                </ModalHeader>
                <ModalBody>
                  {(loading && (
                    <div className="flex h-full w-full items-center justify-center">
                      <CircularProgress aria-label="Loading..." color="danger" />
                    </div>
                  )) || (
                    <>
                      {addProductModalIsOpen && (
                        <>
                          <Input
                            isClearable
                            radius="sm"
                            placeholder="Enter product link"
                            startContent={
                              <div>
                                <img
                                  src="../icons/web.png"
                                  className="w-[15px]"
                                  alt="logo"
                                />
                              </div>
                            }
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)}
                          />
                          <p>Add Custom fields</p>
                          <div className="flex gap-2">
                            <Input
                              ref={keyInputRef}
                              isClearable
                              radius="sm"
                              placeholder="Key"
                              value={key}
                              onChange={(e) => setKey(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  valueInputRef.current?.focus();
                                }
                              }}
                            />
                            <Input
                              ref={valueInputRef}
                              isClearable
                              radius="sm"
                              placeholder="Value"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleAddField();
                                }
                              }}
                            />
                            <Button
                              color="primary"
                              variant="flat"
                              className="min-w-4"
                              onClick={handleAddField}
                            >
                              <img
                                src="../icons/additionH.png"
                                alt="add"
                                className="w-[20px]"
                              />
                            </Button>
                          </div>
                          <div className="flex max-h-[25vh] flex-col gap-2 overflow-auto">
                            {customFields.map((field, index) => (
                              <div className="flex gap-2" key={index}>
                                <Input
                                  disabled
                                  radius="sm"
                                  placeholder="Key"
                                  value={field.key}
                                />
                                <Input
                                  disabled
                                  radius="sm"
                                  placeholder="Value"
                                  value={field.value}
                                />
                                <Button
                                  color="primary"
                                  variant="flat"
                                  className="min-w-4"
                                  onClick={() => handleRemoveField(index)}
                                >
                                  <img
                                    src="../icons/minus.png"
                                    alt="remove"
                                    className="w-[20px]"
                                  />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      {filterModalIsOpen && (
                        <>
                          <div className="flex max-h-[50vh] flex-col gap-3 overflow-auto">
                            {cols.map((col) => {
                              if (col.type === "number") {
                                return (
                                  <div
                                    className="flex flex-col gap-1"
                                    key={col.colId}
                                  >
                                    <p className="px-1 text-sm text-textColorLight">{`${col.name}: In cart [${col.range[0]} to ${col.range[1]}]`}</p>
                                    <div className="flex gap-2">
                                      <Input
                                        type="number"
                                        onWheel={(e) => e.preventDefault()}
                                        radius="sm"
                                        placeholder={"From"}
                                        value={
                                          filterData[
                                            col.listId + "_" + col.colId
                                          ]?.from || ""
                                        }
                                        onChange={(e) =>
                                          handleFilterChange(
                                            col.colId,
                                            col.listId,
                                            {
                                              ...filterData[
                                                col.listId + "_" + col.colId
                                              ],
                                              from: e.target.value,
                                            },
                                          )
                                        }
                                      />
                                      <Input
                                        type="number"
                                        onWheel={(e) => e.preventDefault()}
                                        radius="sm"
                                        placeholder={"To"}
                                        value={
                                          filterData[
                                            col.listId + "_" + col.colId
                                          ]?.to || ""
                                        }
                                        onChange={(e) =>
                                          handleFilterChange(
                                            col.colId,
                                            col.listId,
                                            {
                                              ...filterData[
                                                col.listId + "_" + col.colId
                                              ],
                                              to: e.target.value,
                                            },
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              }
                              if (col.type === "string") {
                                return (
                                  <div
                                    className="flex flex-col gap-1"
                                    key={col.colId}
                                  >
                                    <p className="px-1 text-sm text-textColorLight">
                                      {col.name}
                                    </p>
                                    <div className="flex gap-2">
                                      <Select
                                        placeholder={`Select ${col.name}`}
                                        radius="sm"
                                        selectionMode="multiple"
                                        className="max-full"
                                        selectedKeys={
                                          filterData[
                                            col.listId + "_" + col.colId
                                          ] || []
                                        }
                                        onSelectionChange={(selected) =>
                                          handleFilterChange(
                                            col.colId,
                                            col.listId,
                                            selected,
                                          )
                                        }
                                      >
                                        {col.range.map((option) => (
                                          <SelectItem
                                            key={`${col.colId}-${option}`}
                                            value={option}
                                          >
                                            {option}
                                          </SelectItem>
                                        ))}
                                      </Select>
                                    </div>
                                  </div>
                                );
                              }
                              return <></>;
                            })}
                          </div>
                        </>
                      )}
                      {utiltyModalIsOpen && (
                        <>
                          <div className="flex max-h-[50vh] flex-col gap-3 overflow-auto">
                            {cols.map((col) => {
                              if (col.type === "number") {
                                return (
                                  <div
                                    className="flex flex-col gap-1"
                                    key={col.colId}
                                  >
                                    <p className="px-1 text-sm text-textColorLight">{`${col.name}`}</p>
                                    <div className="flex gap-2">
                                      <Input
                                        type="number"
                                        onWheel={(e) => e.preventDefault()}
                                        radius="sm"
                                        placeholder={
                                          "Enter utlity per unit " + col.name
                                        }
                                        value={
                                          utilityData[
                                            col.listId + "_" + col.colId
                                          ]?.ulility || ""
                                        }
                                        onChange={(e) =>
                                          handleUtilityChange(
                                            col.colId,
                                            col.listId,
                                            {
                                              ...utilityData[
                                                col.listId + "_" + col.colId
                                              ],
                                              ulility: e.target.value,
                                            },
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                );
                              }
                              if (col.type === "string") {
                                return (
                                  <div
                                    className="flex flex-col gap-1"
                                    key={col.colId}
                                  >
                                    <p className="px-1 text-sm text-textColorLight">
                                      {col.name}
                                    </p>
                                    <div className="flex gap-2">
                                      <Popover
                                        placement="right-start"
                                        showArrow
                                        offset={10}
                                      >
                                        <PopoverTrigger>
                                          <Button
                                            color="primary"
                                            variant="flat"
                                            className="min-w-[50%]"
                                          >{`Set ${col.name} utilities`}</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[240px]">
                                          {(titleProps) => (
                                            <div className="w-full px-1 py-2">
                                              <div className="mt-2 flex max-h-[20vh] w-full flex-col gap-2 overflow-auto">
                                                {col.range.map((option) => (
                                                  <Input
                                                    type="number"
                                                    onWheel={(e) =>
                                                      e.preventDefault()
                                                    }
                                                    radius="sm"
                                                    label={option}
                                                    value={
                                                      utilityData[
                                                        col.listId +
                                                          "_" +
                                                          col.colId
                                                      ]?.ulility?.[option] || ""
                                                    }
                                                    onChange={(e) =>
                                                      handleUtilityChange(
                                                        col.colId,
                                                        col.listId,
                                                        {
                                                          ...utilityData[
                                                            col.listId +
                                                              "_" +
                                                              col.colId
                                                          ],
                                                          ulility: {
                                                            ...utilityData[
                                                              col.listId +
                                                                "_" +
                                                                col.colId
                                                            ]?.ulility,
                                                            [option]:
                                                              e.target.value,
                                                          },
                                                        },
                                                      )
                                                    }
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                );
                              }
                              return <></>;
                            })}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {addProductModalIsOpen && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={async () => {
                          try {
                            setLoading(true);
                            const addProductRes = await axios.post(
                              BACKEND_URI + "/list/addProductToList",
                              {
                                listId: listId,
                                productLink: productLink,
                                customFields: customFields,
                              },
                            );
                            setCustomFields([]);
                            setKey("");
                            setValue("");
                            setProductLink("");
                            ToastInfo("Product added to cart");
                            const loadCart = async () => {
                              const cartRes = await axios.post(`${BACKEND_URI}/list/getListData`, {
                                listId: listId,
                              });
                              if (cartRes.data.statusCode !== 200) {
                                return;
                              }
                              dispatcher(setProductData(cartRes.data.data.products));
                              dispatcher(setColumns(cartRes.data.data.columns));
                              dispatcher(setOptions(cartRes.data.data.options));
                            };
                            if(listId && listId!=""){
                              loadCart();
                            }
                            onClose();
                          } catch (e) {
                            ToastErrors("Add product to cart failed");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Add to cart
                      </Button>
                    </>
                  )}
                  {filterModalIsOpen && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          // TODO: Filter application logic should be added here
                          console.log(filterData);
                          dispatcher(setFilterStateData(filterData));
                          onClose();
                        }}
                      >
                        Apply filter
                      </Button>
                    </>
                  )}
                  {utiltyModalIsOpen && (
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          // TODO: Utility application logic should be added here
                          console.log(utilityData);
                          dispatcher(setUtilityStateData(utilityData));
                          onClose();
                        }}
                      >
                        Apply utility
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default CartTop;
