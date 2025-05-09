"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { components } from "@/lib/backend/generated/schema";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type CartDto = {
  id: number;
  userId: number;
  cartItems: components["schemas"]["CartItemDto"][];
};

type CartItemDto = components["schemas"]["CartItemDto"] & {
  selected: boolean;
  productStockQuantity: number;
  hasError?: boolean;
};

export default function ClientPage() {
  const [cartItems, setCartItems] = useState<CartItemDto[]>([]);
  const router = useRouter();

  async function initFetchCart() {
    try {
      const res = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Fetch cart failed:", res.status);
        return;
      }
      const { data } = await res.json();
      if (!data) {
        return;
      }
      setCartItems(
        data.cartItems.map((item: CartItemDto) => ({
          ...item,
          selected: true,
          hasError: false,
        }))
      );
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  }

  // 화면 초기화
  useEffect(() => {
    initFetchCart();
  }, []);

  // productId와 quantity만 넘기면 500ms 후 updateCartAPI 호출
  const debouncedUpdateCart = () =>
    debounce(async (productId: number, quantity: number) => {
      if (quantity < 0) return;
      if (quantity === 0) {
        setCartItems((prev) =>
          prev.filter((item: CartItemDto) => item.productId !== productId)
        );
      }
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!res.ok) {
          console.error("Patch cart failed:", res.status);
          return;
        }
      } catch (error) {
        console.error("장바구니 업데이트 중 오류가 발생했습니다.", error);
      }
    }, 500);

  // 수량 변경 시 상태 업데이트 + 디바운스 API 호출
  const updateProductQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(quantity, 0), hasError: false }
          : item
      )
    );
    debouncedUpdateCart()(productId, Math.max(quantity, 0));
  };

  const toggleSelect = (cartItemId: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  if (!cartItems) {
    return <div>장바구니 데이터를 불러오는 중입니다...</div>;
  }

  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedTotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = selectedTotal > 0 ? 3000 : 0;
  const totalAmount = selectedTotal + shippingFee;

  const handleOrder = () => {
    let hasError = false;
    const updatedItems = cartItems.map((item) => {
      // 선택된 상품만 재고 체크
      if (item.selected && item.quantity > item.productStockQuantity) {
        hasError = true;
        toast.error(
          `${item.productName}의 재고가 부족합니다. 최대 ${item.productStockQuantity}개로 수정합니다.`
        );
        return { ...item, quantity: item.productStockQuantity, hasError: true };
      }
      return { ...item, hasError: false };
    });
    if (hasError) {
      setCartItems(updatedItems);
      return;
    }
    const queryString = new URLSearchParams({
      items: JSON.stringify(selectedItems),
    }).toString();

    router.push(`/order/process?${queryString}`);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen px-8 py-12 bg-gray-100">
      <Card className="w-full max-w-screen-lg p-8 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">장바구니</h2>

        <Table className="w-full">
          <TableHeader>
            <TableRow key="table">
              <TableHead className="text-left">선택</TableHead>
              <TableHead className="text-left">제품</TableHead>
              <TableHead className="text-center">수량</TableHead>
              <TableHead className="text-center whitespace-nowrap">
                가격
              </TableHead>
              <TableHead className="text-right whitespace-nowrap">
                합계
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id} className="h-20">
                <TableCell className="text-left">
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => toggleSelect(item.id)}
                  />
                </TableCell>

                <TableCell className="text-left">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.productImageUrl || ""}
                      alt={item.productName}
                      width={50}
                      height={50}
                      className="rounded-md"
                      style={{ width: 50, height: 50 }}
                    />
                    <p>{item.productName}</p>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={item.quantity <= 0}
                      onClick={() =>
                        updateProductQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateProductQuantity(
                          item.productId,
                          Number(e.target.value)
                        )
                      }
                      // 수량이 재고 초과 시 빨간 테두리 표시
                      className={`w-16 text-center ${
                        item.hasError ? "border border-red-500" : ""
                      }`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateProductQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </TableCell>

                <TableCell className="text-center whitespace-nowrap text-gray-700">
                  {item.price.toLocaleString()}원
                </TableCell>

                <TableCell className="text-right whitespace-nowrap font-semibold">
                  {(item.price * item.quantity).toLocaleString()}원
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 결제 요약 정보 */}
        <Card className="mt-8 p-4 bg-gray-100 rounded-md">
          <div className="flex justify-between py-2">
            <span>선택상품 금액</span>
            <span className="font-semibold">
              {selectedTotal.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span>배송비</span>
            <span className="font-semibold">
              {shippingFee.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>총 주문금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
          </div>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-400">
          당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="px-6 py-3 text-lg"
            disabled={selectedItems.length === 0}
            onClick={handleOrder}
          >
            선택상품 주문하기
          </Button>
        </div>
      </Card>
    </div>
  );
}
