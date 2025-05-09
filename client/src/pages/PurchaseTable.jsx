import React, { useState, useEffect } from "react";
import Instance from "../AxiosConfig";
import { useLocation } from "react-router-dom";

function PurchaseTable() {
  const [purchasedInventory, setPurchasedInventory] = useState([]);
  const location = useLocation();
  const { category, name } = location.state || {};

  useEffect(() => {
    const fetchPurchasedInventory = async () => {
      try {
        const response = await Instance.get("/add/getPurchaseInventory");
        setPurchasedInventory(response.data);
      } catch (error) {
        console.error("Error fetching Purchased inventory:", error);
      }
    };

    fetchPurchasedInventory();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="wrapper">
      <div className="main flex items-start justify-center"></div>
      <div className="mt-1 text-black p-10">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Purchased Details Table
        </h2>
        <br />
        <div className="flex justify-between items-center">
          <p className="font-bold">Item Name: {name}</p>
          <p className="font-bold">Category: {category}</p>
        </div>

        <table className="w-full border-collapse border border-blue-900 mt-4 text-black">
          <thead>
            <tr className="bg-blue-800">
              <th className="border text-white px-4 py-2">S.No</th>
              <th className="border text-white px-4 py-2">Bill No</th>
              <th className="border text-white px-4 py-2">Party Name</th>
              <th className="border text-white px-4 py-2">Bill Date</th>
              <th className="border text-white px-4 py-2">Bill Amount</th>
              <th className="border text-white px-4 py-2">Purchase Qty</th>
              <th className="border text-white px-4 py-2">Current Qty</th>
              <th className="border text-white px-4 py-2">
                Price Per Unit (₹)
              </th>
              <th className="border text-white px-4 py-2">Bill</th>
            </tr>
          </thead>
          <tbody>
            {purchasedInventory.length > 0 ? (
              purchasedInventory.map((category, categoryIndex) =>
                category.items.map((item, itemIndex) =>
                  item.purchaseItems.map((purchaseItem, purchaseItemIndex) => (
                    <tr
                      key={`${categoryIndex}-${itemIndex}-${purchaseItemIndex}`}
                    >
                      <td className="border border-blue-900 px-4 py-2">
                        {categoryIndex + 1}.{itemIndex + 1}.
                        {purchaseItemIndex + 1}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.billNo}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.partyName}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {formatDate(purchaseItem.billDate)}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.billAmount}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.purchaseQty}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.qty}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {purchaseItem.pricePerUnit}
                      </td>
                      <td className="border border-blue-900 px-4 py-2">
                        {" "}
                        <button
                          className="bg-blue-900 text-white mx-2 px-5 py-2 rounded-md"
                          onClick={() => navigate("billUrl", {})}
                        >
                          Bill
                        </button>
                      </td>
                    </tr>
                  ))
                )
              )
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No purchased inventory
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchaseTable;
