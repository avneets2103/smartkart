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

const initialColumns = [
  { key: "images", label: "Image" },
  { key: "name", label: "Name" },
  { key: "brand", label: "Brand" },
  { key: "pricing", label: "Price" },
  { key: "shipping_price", label: "Shipping Price" },
  { key: "availability_stock", label: "Availability" },
  { key: "average_rating", label: "Average Rating" },
  { key: "total_reviews", label: "Total Reviews" },
  { key: "color", label: "Color" },
  { key: "size", label: "Size" },
  { key: "category", label: "Category" },
  { key: "weight", label: "Weight" },
  { key: "dimensions", label: "Dimensions" },
  { key: "material", label: "Material" },
  { key: "gender", label: "Gender" },
  { key: "release_date", label: "Release Date" },
  { key: "model", label: "Model" },
  { key: "warranty", label: "Warranty" },
  { key: "country_of_origin", label: "Country of Origin" },
  { key: "seller", label: "Seller" },
];

function CartHero() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [Cols, setCols] = useState(initialColumns);
  const [Rows, setRows] = useState<Array<{}>>([]);
  const dispatcher = useDispatch();
  const currentList = useSelector((state:any) => state.sidebar.currentList);
  const cols = useSelector((state:any) => state.cart.columns);
  const opts = useSelector((state:any) => state.cart.options);
  const productData = useSelector((state:any) => state.cart.productData);

  useEffect(() => {
    const loadCart = async () => {
      const cartRes = await axios.post(`${BACKEND_URI}/list/getListData`, {
        listId: currentList,
      });
      if (cartRes.data.statusCode !== 200) {
        ToastErrors("Error fetching cart");
        return;
      }
      else{ToastInfo("Cart loaded");}
      dispatcher(setProductData(cartRes.data.data.products));
      dispatcher(setColumns(cartRes.data.data.columns));
      dispatcher(setOptions(cartRes.data.data.options));
    };
    if(currentList && currentList!=""){
      loadCart();
    }
  }, [currentList]);

  useEffect(() => {
    // Update Cols based on Redux state
    if (cols && cols.length > 0) {
      let newCols = cols.map((col:string) => {
        let label = col;
        switch (col) {
          case "images":
            label = "Image";
            break;
          case "name":
            label = "Name";
            break;
          case "brand":
            label = "Brand";
            break;
          case "pricing":
            label = "Price";
            break;
          case "shipping_price":
            label = "Shipping Price";
            break;
          case "availability_stock":
            label = "Availability";
            break;
          case "average_rating":
            label = "Average Rating";
            break;
          case "total_reviews":
            label = "Total Reviews";
            break;
          case "color":
            label = "Color";
            break;
          case "size":
            label = "Size";
            break;
          case "category":
            label = "Category";
            break;
          case "weight":
            label = "Weight";
            break;
          case "dimensions":
            label = "Dimensions";
            break;
          case "material":
            label = "Material";
            break;
          case "gender":
            label = "Gender";
            break;
          case "release_date":
            label = "Release Date";
            break;
          case "model":
            label = "Model";
            break;
          case "warranty":
            label = "Warranty";
            break;
          case "country_of_origin":
            label = "Country of Origin";
            break;
          case "seller":
            label = "Seller";
            break;
          default:
            break;
        }
        return { key: col, label };
      });
      setCols(newCols);
    }
    // Update Rows based on Redux state
    if (productData && productData.length > 0) {
      let newRows:Array<{}> = [];
      productData.forEach((product: {}) => {
        const productFeature = product?.features || {};
        let newRow:{} = {};
        newRow["key"] = product?.key || "";
        Object.keys(productFeature).forEach((key) => {
          newRow[key] = productFeature[key];
        });
        newRows.push(newRow);
      });
      console.log("newRows: ", newRows);
      setRows(newRows);
    }
  }, [productData, cols]);

  const netPrice = () => {
    let totalPrice = 0;
    Rows.forEach((row) => {
      let val = parseFloat(row?.pricing || 0);
      if (!val) val = 0;
      totalPrice += val;
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
    async sort({items, sortDescriptor}) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  const tableCellImage = (item:string, columnKey:string) => {
    if (columnKey !== "images"){
      if(item && item?.length>50) return item.substring(0,50)+"...";
      if(columnKey === "availability_stock") return item?"In Stock":"Out of Stock";
      return item;
    }
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
  };

  return (
    <div className="flex flex-col">
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
          {(column) => (
            <TableColumn className="min-w-[8rem]" key={column.key || ""}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={Rows}>
          {(item) => (
            <TableRow key={item?.key || ""} className="p-4">
              {(columnKey) => (
                <TableCell>
                  <div>{tableCellImage(getKeyValue(item, columnKey), columnKey.toString())}</div>
                </TableCell>
              )}
            </TableRow>
          )}
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
    </div>
  );
}

export default CartHero;