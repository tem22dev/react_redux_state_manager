import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ICreateUser {
    name: string,
    email: string,
}
interface IUpdateUser {
    id: any,
    name: string,
    email: string,
}

interface IDeleteUser {
    id: any,
    name: string,
    email: string
}

// First, create the thunk
export const fetchListUser = createAsyncThunk( // createAsyncThunk Giải quyết bất đồng bộ
    'users/fetchListUser',  // Tên để kiểm soát khi gọi API: Sinh ra 3 trạng thái
    async () => {
        // Logic fetch API
        // userId: Data muốn truyền đi
        // thunkAPI: 
        const res = await fetch('http://localhost:8000/users');
        const data = await res.json();
        return data;
    },
)

export const createNewUser = createAsyncThunk( 
    'users/createNewUser',  
    async (payload: ICreateUser, thunkAPI) => {
        const res = await fetch('http://localhost:8000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
            })
        });

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        return data
    },
)

export const updateUser = createAsyncThunk( 
    'users/updateUser',  
    async (payload: IUpdateUser, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
            })
        });
     
        const data = await res.json();

        if (data && data.id) {
            thunkAPI.dispatch(fetchListUser());
        }
        
        return data;
    },
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload: IDeleteUser, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        const data = await res.json();
            
        thunkAPI.dispatch(fetchListUser());
        
        return data;
    }
)

interface IUser {
    id: number,
    name: string,
    email: string,
}

const initialState: {
    listUser: IUser[],
    isCreateSuccess: boolean,
    isUpdateSuccess: boolean,
    isDeleteSuccess: boolean
} = {
    listUser: [],
    isCreateSuccess: false,
    isUpdateSuccess: false,
    isDeleteSuccess: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate(state) {
            state.isCreateSuccess = false;
        },
        resetUpdate(state) {
            state.isUpdateSuccess = false;
        },
        resetDelete(state) {
            state.isDeleteSuccess = false;
        }
    },
    // Có liên quan đến API mới dùng
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchListUser.fulfilled, (state, action) => {
          // Add user to the state array
          state.listUser = action.payload;
        })

        builder.addCase(createNewUser.fulfilled, (state) => {
            // Add user to the state array
            state.isCreateSuccess = true;
        })

        builder.addCase(updateUser.fulfilled, (state) => {
            state.isUpdateSuccess = true;
        })

        builder.addCase(deleteUser.fulfilled, (state) => {
            state.isDeleteSuccess = true;
        })
    },
})

export const { resetCreate, resetUpdate, resetDelete } = userSlice.actions
export default userSlice.reducer
