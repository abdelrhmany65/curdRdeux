import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




// getPosts 
export const getPosts = createAsyncThunk('posts/getPosts', async(_,thunkAPI)=>{

    const { rejectWithValue } = thunkAPI
    try {
        const Response = await fetch('http://localhost:3005/posts')
        const data = await Response.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// deletePosts 
export const deletePosts = createAsyncThunk("posts/deletePosts", async(id,thunkAPI)=> {
    const {rejectWithValue} = thunkAPI
    try {
        
        await fetch(`http://localhost:3005/posts/${id}`,{ method: "DELETE"})
        return id
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// insertPost 

export const insertPost = createAsyncThunk(
    "posts/insertPost",
    async (item, thunkAPI) => {
      const { rejectWithValue, getState } = thunkAPI;
      const { auth } = getState();
      item.userId = auth.id;
  
      try {
        const res = await fetch("http://localhost:3005/posts", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// getOnePost 

export const getOnePost = createAsyncThunk("posts/getOnePost",async(id,thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const Response = await fetch(`http://localhost:3005/posts/${id}`)
        const data = await Response.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// EditePost 

export const EditePost = createAsyncThunk("posts/EditePost",async(item,thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {

        const res = await fetch(`http://localhost:3005/posts/${item.id}`,{
            method : "PATCH",
            body : JSON.stringify(item),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message) 
    }

})



const initialState = {
    records: [],
    loading: false,
    error: null,
    record: null
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },
    extraReducers: (builder) =>{

        // getPosts 
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.loading = false
            state.records = action.payload
        })
        builder.addCase(getPosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // delet data  
        builder.addCase(deletePosts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deletePosts.fulfilled, (state, action) => {
            state.loading = false
            state.records = state.records.filter((el) => el.id!== action.payload)
            
        })
        builder.addCase(deletePosts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // insert 
        builder.addCase(insertPost.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(insertPost.fulfilled, (state, action) => {
            state.loading = false
            state.records.push(action.payload)
        })
        builder.addCase(insertPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // getOnePost 
        builder.addCase(getOnePost.pending, (state) => {
            
            state.loading = true
            state.error = null
           
        })
        builder.addCase(getOnePost.fulfilled, (state, action) => {
            state.loading = false
            state.record = action.payload
        })
        builder.addCase(getOnePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // EditePost
        builder.addCase(EditePost.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(EditePost.fulfilled, (state, action) => {
            state.loading = false
            state.record = action.payload
        })
        builder.addCase(EditePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }) 



    }
})


export default postSlice.reducer;
