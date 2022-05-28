import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFn } from '../../redux/Actions';

const columns = [
  { field: 'product_name', headerName: 'Nombre', width: 200 },
  { field: 'product_price', headerName: 'Precio', width: 200 },
  { field: 'product_quantity', headerName: 'Cantidad', width: 200 },
];


export default function ProductList() {
   const dispatch = useDispatch();
   const products = useSelector((state) => state.products);
   React.useEffect(() => {
      dispatch(getProductsFn());
   }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products.products}
        columns={columns}
        pageSize={5}
        getRowId={({id}) =>  id}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}