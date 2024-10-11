import { Spin } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentView: React.FC = () => {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const parsedData: Record<string, string> = {};

    queryParams.forEach((value, key) => {
      parsedData[key] = value;
    });

    if (parsedData && parsedData?.vnp_ResponseCode === "00") {
      // setPaymentResult(parsedData);
      router.replace("/payment/success");
      return;
    } else if (parsedData && parsedData?.vnp_ResponseCode === "24") {
      // setPaymentResult(parsedData);
      router.replace("/payment/failure");
    } else {
      router.replace("/payment/failure");
    }

    // setPaymentData(parsedData);
  }, [location.search, router]);

  return (
    <>
      <Spin fullscreen tip="Đang chờ..." />
    </>
  );
};

export default PaymentView;
