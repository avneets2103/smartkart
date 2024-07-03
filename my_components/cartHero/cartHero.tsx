import React from "react";
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

const rows = [
  {
    key: "1",
    images:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "120",
    shipping_price: "10",
    availability_stock: "In Stock",
    average_rating: "4.5",
    total_reviews: "100",
    color: "Red",
    size: "10",
    category: "Sneakers",
    weight: "1kg",
    dimensions: "30x20x10 cm",
    material: "Leather",
    gender: "Unisex",
    release_date: "2023-01-01",
    model: "AM97-001",
    warranty: "1 year",
    country_of_origin: "Vietnam",
    seller: "Nike Official",
  },
  {
    key: "2",
    images:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=2596&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "130",
    shipping_price: "12",
    availability_stock: "Out of Stock",
    average_rating: "4.7",
    total_reviews: "150",
    color: "Blue",
    size: "9",
    category: "Sneakers",
    weight: "1.2kg",
    dimensions: "32x22x12 cm",
    material: "Synthetic",
    gender: "Male",
    release_date: "2022-05-15",
    model: "AM97-002",
    warranty: "6 months",
    country_of_origin: "China",
    seller: "Sportify",
  },
  {
    key: "3",
    images:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "140",
    shipping_price: "15",
    availability_stock: "In Stock",
    average_rating: "4.8",
    total_reviews: "200",
    color: "Black",
    size: "11",
    category: "Sneakers",
    weight: "1.1kg",
    dimensions: "31x21x11 cm",
    material: "Mesh",
    gender: "Female",
    release_date: "2021-09-10",
    model: "AM97-003",
    warranty: "1 year",
    country_of_origin: "India",
    seller: "Foot Locker",
  },
  {
    key: "4",
    images:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "150",
    shipping_price: "20",
    availability_stock: "In Stock",
    average_rating: "4.6",
    total_reviews: "250",
    color: "White",
    size: "8",
    category: "Sneakers",
    weight: "1.3kg",
    dimensions: "33x23x13 cm",
    material: "Canvas",
    gender: "Unisex",
    release_date: "2020-07-20",
    model: "AM97-004",
    warranty: "1 year",
    country_of_origin: "USA",
    seller: "Nike Official",
  },
  {
    key: "5",
    images:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "160",
    shipping_price: "25",
    availability_stock: "Out of Stock",
    average_rating: "4.9",
    total_reviews: "300",
    color: "Green",
    size: "7",
    category: "Sneakers",
    weight: "1.4kg",
    dimensions: "34x24x14 cm",
    material: "Textile",
    gender: "Male",
    release_date: "2019-03-25",
    model: "AM97-005",
    warranty: "2 years",
    country_of_origin: "Italy",
    seller: "Sneaker Hub",
  },
  {
    key: "6",
    images:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2VzfGVufDB8fDB8fHww",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "170",
    shipping_price: "30",
    availability_stock: "In Stock",
    average_rating: "4.4",
    total_reviews: "400",
    color: "Yellow",
    size: "6",
    category: "Sneakers",
    weight: "1.5kg",
    dimensions: "35x25x15 cm",
    material: "Leather",
    gender: "Female",
    release_date: "2018-11-11",
    model: "AM97-006",
    warranty: "1 year",
    country_of_origin: "Germany",
    seller: "Kickz",
  },
  {
    key: "7",
    images:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "180",
    shipping_price: "35",
    availability_stock: "In Stock",
    average_rating: "4.3",
    total_reviews: "500",
    color: "Purple",
    size: "12",
    category: "Sneakers",
    weight: "1.6kg",
    dimensions: "36x26x16 cm",
    material: "Synthetic",
    gender: "Unisex",
    release_date: "2017-08-08",
    model: "AM97-007",
    warranty: "1 year",
    country_of_origin: "Japan",
    seller: "Shoe Palace",
  },
  {
    key: "8",
    images:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2679&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nike Air Max 97",
    brand: "Nike",
    pricing: "190",
    shipping_price: "ß40",
    availability_stock: "Out of Stock",
    average_rating: "4.2",
    total_reviews: "600",
    color: "Orange",
    size: "13",
    category: "Sneakers",
    weight: "1.7kg",
    dimensions: "37x27x17 cm",
    material: "Mesh",
    gender: "Male",
    release_date: "2016-06-06",
    model: "AM97-008",
    warranty: "1 year",
    country_of_origin: "South Korea",
    seller: "Sneaker World",
  },
];

const columns = [
  {
    key: "images",
    label: "Image",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "pricing",
    label: "Price",
  },
  {
    key: "shipping_price",
    label: "Shipping Price",
  },
  {
    key: "availability_stock",
    label: "Availability",
  },
  {
    key: "average_rating",
    label: "Average Rating",
  },
  {
    key: "total_reviews",
    label: "Total Reviews",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "weight",
    label: "Weight",
  },
  {
    key: "dimensions",
    label: "Dimensions",
  },
  {
    key: "material",
    label: "Material",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "release_date",
    label: "Release Date",
  },
  {
    key: "model",
    label: "Model",
  },
  {
    key: "warranty",
    label: "Warranty",
  },
  {
    key: "country_of_origin",
    label: "Country of Origin",
  },
  {
    key: "seller",
    label: "Seller",
  },
];

function CartHero() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

  const netPrice = () => {
    let totalPrice = 0;
    rows.forEach((row) => {
        let val = parseFloat(row.pricing);
        if(!val) val = 0;
        totalPrice += val;
    });
    return totalPrice;
  };

  let list = useAsyncList({
    async load({ signal, cursor }) {
      setIsLoading(false);
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal },
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
  const tableCellImage = (item: string, columnKey: any) => {
    if (columnKey !== "images") return item;
    return (
      <div className="flex items-center">
        <Image
          isZoomed
          isBlurred
          src={item}
          alt="product image"
          className="h-20 w-20 rounded-lg"
        />
      </div>
    );
  };
  return (
    <div className="flex flex-col">
      <Table
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
          table: "min-h-[73vh]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn className="min-w-[8rem]" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {tableCellImage(getKeyValue(item, columnKey), columnKey)}
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
