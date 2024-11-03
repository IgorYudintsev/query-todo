import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {InitialType, TodolistType} from './todolistsApi.types.ts';

export const todolistApi = createApi({
    reducerPath: 'todolistApi',
    tagTypes: ['Todos'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`);
            headers.set('API-KEY', import.meta.env.VITE_API_KEY);
            return headers;
        },
    }),
    refetchOnFocus: true,//выхожу из закладки, возвращаюсь, и на ней не старые данные, а обновленные: здесь и в store
    endpoints: (builder) => ({
        getTodolists: builder.query<InitialType[], void>({
            query: () => 'todo-lists',
            providesTags: ['Todos'], //используется на builder.query
            transformResponse: (responce: TodolistType[]) => responce.map(el => ({...el, filter: 'all'}))
        }),

        deleteTodolist: builder.mutation<void, { id: string }>({
            query: ({id}) =>{
                console.log(id)
                return {
                    url:`todo-lists/${id}`,
                    method:'DELETE'
                }
            },
            invalidatesTags: ['Todos'], //используется на builder.mutation
        }),
        createTodolist:builder.mutation<InitialType,{ title: string}>({
            query:({title})=>{
                return{
                    url:'todo-lists',
                    method:'POST',
                    body:{title}
                }
            },
            transformResponse: (responce: InitialType) => ({...responce, filter: 'all'}),
            invalidatesTags:['Todos']
        })
    }),
});

export const {useGetTodolistsQuery,useDeleteTodolistMutation,useCreateTodolistMutation} = todolistApi;

