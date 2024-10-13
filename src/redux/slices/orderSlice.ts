import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInfo } from "@/types/product.types";
import { OrderInfo } from "@/types/order.types";

interface OrderState {
  orderInfo: OrderInfo;
}

const initialState: OrderState = {
  orderInfo: {
    bankCode: "",
    bankTranNo: "",
    code: "",
    createDate: "",
    customerAddress: "",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    discount: null,
    id: 0,
    isDeleted: false,
    orderDetails: {} as ProductInfo,
    paymentDate: "",
    paymentMethod: "",
    paymentStatus: "",
    shipFee: null,
    status: "",
    storeAddress: "",
    storeId: 0,
    storeName: "",
    storePhone: "",
    total: 0,
    transactionNo: "",
    updateDate: "",
    userId: 0,
    version: "",
    voucherId: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderInfo(state, action: PayloadAction<OrderInfo>) {
      state.orderInfo = action.payload;
    },
  },
});

export const { setOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
