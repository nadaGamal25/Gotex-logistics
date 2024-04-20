import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarrierOrderDetails from '../CarrierOrderDetails/CarrierOrderDetails';
export default function CarrierOrderNTFpreview() {
    const location = useLocation();
    const [Item, setSItem] = useState(null);
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const Data = queryParams.get('Data');
      if (Data) {
        setSItem(JSON.parse(decodeURIComponent(Data)));
      }
    }, [location.search]);
  
    return (
      <div>
        {Item && <CarrierOrderDetails item={Item} />}
      </div>
    );
  };