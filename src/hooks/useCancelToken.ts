import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";

export const useCancelToken = () => {
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource>();

  const getAndSetOne = (): CancelTokenSource => {
    const cancelSource = axios.CancelToken.source();
    setCancelTokenSource(cancelSource);
    return cancelSource;
  };

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel();
      }
    };
  }, []);

  return { getAndSetOne };
};
