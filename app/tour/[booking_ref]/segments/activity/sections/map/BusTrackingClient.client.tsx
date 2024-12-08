"use client";

import { useQuery } from "@tanstack/react-query";
import getTrackingData from "@/app/server/server_actions/getTrackingData";

//---------------------------------------------------------

const BusTrackingClient = ({ id }: { id: string }) => {
  const { data, error, isError, isFetching } = useQuery({
    queryKey: ["TRACKING_DATA", id],
    queryFn: () => getTrackingData(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.toString()}</div>;
  }
  return <div>TRACING DATA</div>;
};

export default BusTrackingClient;
