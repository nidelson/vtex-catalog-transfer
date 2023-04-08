import axios, { AxiosError } from "axios";

import { SkuBinding } from "../../types";
import { apiSkuBinding } from "./apiSkuBinding";

export async function getSellerSkuList(
  sellerId: string
): Promise<SkuBinding[]> {
  try {
    const response = await apiSkuBinding().get(
      `/skuseller/list/bysellerId/${sellerId}`
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export function removeSellerSku(sku: SkuBinding) {
  try {
    const sellerId = sku.SellerId;
    const sellerSkuId = sku.SellerStockKeepingUnitId;

    return apiSkuBinding().post(`/skuseller/remove/${sellerId}/${sellerSkuId}`);
  } catch (error) {
    console.log({ error });
    throw error;
  }
}

export function insertSellerSku(sku: SkuBinding, sellerIdTarget: string) {
  sku.SellerId = sellerIdTarget;

  try {
    return apiSkuBinding().post(`/skuseller/insertion`, sku);
  } catch (error: AxiosError | Error | any) {
    if (axios.isAxiosError(error)) {
      const errors = error.response?.data.Errors;
      console.error({
        message: "Insert failed",
        sellerSkuId: sku.SellerStockKeepingUnitId,
        skuId: sku.StockKeepingUnitId,
        errors,
      });
    } else {
      console.error(error);
    }
  }
}

export function sendNotification(sellerId: string, sellerSkuId: string) {
  try {
    return apiSkuBinding().post(
      `/skuseller/changenotification/${sellerId}/${sellerSkuId}`
    );
  } catch (error) {
    console.error("Notification failed");
    console.log({ error });
    throw error;
  }
}
