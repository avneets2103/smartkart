import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
  Image,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { useDispatch, useSelector } from "react-redux";
import { ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { setColumns, setOptions, setProductData } from "@/RTK/features/cart";
import axios from "@/utils/axios";
import { BACKEND_URI } from "@/CONSTANTS";

interface Product {
  key: string;
  features: {
    images: Array<string>;
    name: string;
    brand: string;
    pricing: number;
    shipping_price: number;
    availability_stock: boolean;
    average_rating: number;
    total_reviews: number;
    extraFeatures: Record<string, string>;
  };
}

interface Column {
  key: string;
  label: string;
  listId: string;
  type: "string" | "number";
  utilityVal: number;
  range: Array<{
    value: string|number;
    utility: number;
  }>;
}

interface Row {
  key: string;
  features: {
    images: Array<string>;
    name: string;
    brand: string;
    pricing: number;
    shipping_price: number;
    availability_stock: boolean;
    average_rating: number;
    total_reviews: number;
    [key: string]: any;
  };
}

const tempRows: Array<Row> = [
  {
    key: "1",
    features: {
      images: [
        "https://images.unsplash.com/photo-1617789853453-a4a7f6a9b3f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      ],
      name: "Product 1",
      brand: "Brand 1",
      pricing: 100,
      shipping_price: 100,
      availability_stock: true,
      average_rating: 4,
      total_reviews: 10,
    },
  },
];

const tempCols: Array<Column> = [
  {
    key: "images",
    label: "Images",
    listId: "1",
    type: "string",
    utilityVal: -1,
    range: [],
  },
];

function CartHero() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const dispatcher = useDispatch();
  const currentList = useSelector((state: any) => state.sidebar.currentList);
  const cols: Array<Column> = useSelector((state: any) => state.cart.columns);
  const opts = useSelector((state: any) => state.cart.options);
  const productData: Array<Product> = useSelector(
    (state: any) => state.cart.productData
  );
  const [Rows, setRows] = useState<Array<Row>>(tempRows);
  const [searchRows, setSearchRows] = useState<Array<Row>>(tempRows);
  const [Cols, setCols] = useState<Array<Column>>(tempCols);
  const searchValue = useSelector((state: any) => state.cart.searchString);
  const filterData = useSelector((state: any) => state.cart.filterStateData);

  useEffect(() => {
    const loadCart = async () => {
      const cartRes = await axios.post(`${BACKEND_URI}/list/getListData`, {
        listId: currentList,
      });
      if (cartRes.data.statusCode !== 200) {
        ToastErrors("Error fetching cart");
        return;
      }
      dispatcher(setColumns(cartRes.data.data.columns));
      dispatcher(setProductData(cartRes.data.data.products));
      dispatcher(setOptions(cartRes.data.data.options));
      setIsLoading(false); // Set loading to false after data is loaded
    };
    if (currentList && currentList !== "") {
      loadCart();
    }
  }, [currentList]);

  useEffect(() => {
    setCols(cols);
    let newRows: Array<Row> = [];
    productData.forEach((product: Product) => {
      let newRow: Row = {
        key: product?.key || "",
        features: {
          images: product.features.images,
          name: product.features.name,
          brand: product.features.brand,
          pricing: product.features.pricing,
          shipping_price: product.features.shipping_price,
          availability_stock: product.features.availability_stock,
          average_rating: product.features.average_rating,
          total_reviews: product.features.total_reviews,
        },
      };
      Object?.keys(product.features.extraFeatures).forEach((key) => {
        newRow.features[key] = product.features.extraFeatures[key];
      });
      newRows.push(newRow);
    });
    setRows(newRows);
    setSearchRows(newRows);
  }, [productData]);

  useEffect(() => {
    const filteredRows = searchRows.filter((row) => {
      return Cols.some((col) => {
        const value = row.features[col.key];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(searchValue.toLowerCase());
      });
    });
    setRows(filteredRows);
  }, [searchValue]);

  useEffect(()=>{
    console.log("filterData", filterData);
    const filteredRows = searchRows.filter((row) => {
      
    });
    setRows(filteredRows);
  }, [filterData])

  const netPrice = () => {
    let totalPrice: number = 0;
    productData.forEach((row) => {
      totalPrice += row.features.pricing;
    });
    return totalPrice;
  };

  let list = useAsyncList({
    async load({ signal, cursor }) {
      setIsLoading(false);
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );
      let json = await res.json();

      setHasMore(false);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  const tableCellImage = (item: string | number | boolean, columnKey: string) => {
    if (columnKey !== "images") {
      if (typeof item === "string") {
        if (item && item?.length > 50) return item.substring(0, 50) + "...";
        return item;
      }
      if (typeof item === "boolean") {
        return item ? "In Stock" : "Out of Stock";
      }
      if (typeof item === "number") {
        return item;
      }
    }
    if (typeof item === "string") {
      return (
        <div className="flex items-center">
          <Image
            isZoomed
            isBlurred
            src={item}
            alt="product image"
            className="h-15 w-15 rounded-lg"
          />
        </div>
      );
    }
  };

  const getColKey = (column: Column) => {
    if (!column) return "";
    if (column) {
      return column?.key;
    }
    return "";
  };

  return (
    <div className="flex flex-col">
      {!isLoading && Cols.length > 0 ? ( // Add this condition
        <>
          <Table
            isStriped
            isHeaderSticky
            aria-label="Example table with infinite pagination"
            baseRef={scrollerRef}
            bottomContent={
              hasMore ? (
                <div className="flex w-full justify-center">
                  <Spinner ref={loaderRef} color="white" />
                </div>
              ) : null
            }
            classNames={{
              base: "max-h-[73vh] overflow-scroll overflow-x-hidden max-w-[92vw]",
              table: "",
            }}
          >
            <TableHeader columns={Cols}>
              {(column: Column) => (
                <TableColumn
                  className="min-w-[8rem]"
                  key={getColKey(column) || ""}
                >
                  {column?.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={Rows}>
              {(item) => {
                if (Cols.length === 0) return <></>;
                return (
                  <TableRow key={item?.key || ""} className="p-4">
                    {(columnKey) => (
                      <TableCell>
                        <div>
                          {tableCellImage(
                            getKeyValue(item.features, columnKey),
                            columnKey.toString()
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
          <div className="flex h-[13vh] items-center justify-end gap-2">
            <div
              className="h-[60%] flex items-center justify-center rounded-md px-8 py-[0.4rem] text-textColorLight font-semibold cursor-pointer"
              onClick={() => {}}
            >
              Edit List
            </div>
            <div
              className="h-[60%] flex items-center justify-center rounded-md bg-secondaryColor px-8 py-[0.4rem] text-primaryColor font-semibold cursor-pointer"
              onClick={() => {}}
            >
              {netPrice()}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-[70vh] w-full items-center justify-center">
          <Spinner color="danger" />
        </div>
      )}
    </div>
  );
}

export default CartHero;
