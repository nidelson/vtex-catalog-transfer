import cliProgress from "cli-progress";

import { ACCOUNT_NAME, SELLER_ORIGIN, SELLER_TARGET } from "../env";
import { SkuBinding } from "../types";
import {
  getSellerSkuList,
  insertSellerSku,
  removeSellerSku,
  sendNotification,
} from "./service/skuBindingService";
import { formatTime, waitFor } from "./utils";

async function CatalogTransfer() {
  console.group("CATALOG TRANSFER");

  const startTime = new Date();
  console.log({ start: formatTime(startTime) });
  console.log();

  const accountName = ACCOUNT_NAME;
  const sellerOrigin = SELLER_ORIGIN;
  const sellerTarget = SELLER_TARGET;

  console.log({ accountName });
  console.log({ sellerOrigin });
  console.log({ sellerTarget });
  console.log();

  console.log("Getting SKU Binding list...");
  console.log();

  const skuListAll = await getSellerSkuList(sellerOrigin);

  // filter first N items
  const skuListOrigin = skuListAll.slice(0, 1000);

  const progressBar = new cliProgress.SingleBar({
    forceRedraw: true,
  });
  progressBar.start(skuListOrigin.length, 0);

  try {
    const promises = skuListOrigin.map(async (sku: SkuBinding) => {
      await executeTransfer(sku, sellerTarget);

      progressBar.increment();
      await waitFor(1000);

      return sku;
    });

    await Promise.all(promises);
  } catch (error) {
    console.log("ERROR MAP");
    throw error;
  } finally {
    progressBar.stop();
    console.log();

    const endTime = new Date();
    console.log({ done: formatTime(endTime) });
  }

  console.groupEnd();
}

async function executeTransfer(sku: SkuBinding, sellerIdTarget: string) {
  await removeSellerSku(sku);
  await insertSellerSku(sku, sellerIdTarget);
  await sendNotification(sellerIdTarget, sku.SellerStockKeepingUnitId);
}

// Run process
CatalogTransfer();
