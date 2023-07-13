import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, updateItem, deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsyncItems = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);

export const addAsync = createAsyncThunk(
  'cart/addItems',
  async (item) => {
    const {id,title,description,brand,thumbnail,price} = item;
    const response = await addItem({id,title,description,brand,thumbnail,price,quantity:1});
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'cart/deleteItems',
  async (id) => {
    await deleteItem(id);
    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateItems',
  async ({id,change}) => {
    const response = await updateItem(id,change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.pending, (state) => {
        state.status = 'idle';
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload)
        state.items.splice(index,1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1, action.payload);
      });
  },
});

// export const {  } = cartsSlice.actions;

export default cartSlice.reducer;
