"use client";
import React from "react";

import { TagCustom } from "@/components/common";
import { tableFavorite } from "@/constants";
import { CloseOutlined } from "@ant-design/icons";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useDeleteFavoriteAllMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { notify } from "@/components/common/Notification";
import NotFoundImage from "@/assets/images/logo/no-products.png";

const FavoriteTable = () => {
  const router = useRouter();
  const { data: favoriteList = [], refetch } = useGetFavorListQuery({
    PageIndex: 1,
    PageSize: 50,
  });
  const [deleteAll] = useDeleteFavoriteAllMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteAll({}).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res.message}`, 2);
        refetch();
      }
    } catch (err: any) {
      notify("error", `${err.data.message}`, 3);
      console.error(err);
    }
  };

  return (
    <section className="mt-5">
      {favoriteList && favoriteList.length > 0 ? (
        <div>
          <table className="min-w-full border-[0.5px] border-gray-200 bg-white">
            <thead className="rounded bg-gray-100">
              <tr>
                {tableFavorite.map((data, index: number) => (
                  <th
                    key={index}
                    className="p-6 text-left font-normal tracking-wider"
                  >
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {favoriteList.map(
                (
                  item: {
                    storeName:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    productName:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                    price:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | null
                      | undefined;
                  },
                  index: number,
                ) => (
                  <>
                    <tr className="border-t" key={index}>
                      <td className="px-6 py-12 align-middle">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={Imagee}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Store Image"
                          />
                          <span>{item.storeName}</span>
                        </div>
                      </td>

                      <td className="px-6 py-12">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={Imagee}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Product Image"
                          />
                          <span>{item.productName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-12">5</td>
                      <td className="px-6 py-12">{item.price}</td>
                      <td className="px-6 py-12">
                        <TagCustom
                          color="green"
                          label="CÒN HÀNG"
                          closable={false}
                          className="text-[13px]"
                        />
                      </td>
                      <td className="px-6 py-12 text-center">
                        <CloseOutlined
                          // onClick={() => handleDelete(record)}
                          className="cursor-pointer text-xl text-red-500"
                        />
                      </td>
                    </tr>
                  </>
                ),
              )}
            </tbody>
          </table>
          <div className="mt-5 flex justify-between">
            <button
              onClick={() => router.push("/product")}
              className="w-[230px] rounded-3xl border-2 border-primary bg-primary py-2 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-none hover:border-primary hover:bg-[white] hover:tracking-widest hover:text-primary"
            >
              Tiếp tục mua hàng
            </button>
            <button
              onClick={handleDelete}
              className="w-[230px] rounded-3xl border-2 border-primary bg-primary py-2 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-none hover:border-primary hover:bg-[white] hover:tracking-widest hover:text-primary"
            >
              Xóa danh sách
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={NotFoundImage}
            width={1000}
            height={1000}
            quality={100}
            alt="product"
            className="h-auto w-[500px] object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
      )}
    </section>
  );
};

export default FavoriteTable;
