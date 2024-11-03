import './App.css'
import {useCreateTodolistMutation, useGetTodolistsQuery} from "./services/todolistApi.ts";
import s from './features/todolists/todolist.module.css'
import {Todolists} from "./features/todolists/Todolists.tsx";


function App() {
    const {data: todos, error, isLoading, refetch} = useGetTodolistsQuery()
    const [createTodolist, {isLoading: newTodolistIsLoading, data: newTodolist}] = useCreateTodolistMutation()

    const createTodolistHandler = () => {
        const createdDate = new Date().toISOString();
                 createTodolist({title: `newTodo - ${createdDate}`})
    }

    return (
        <>
            {/* Показать индикатор загрузки, если данные загружаются */}
            {isLoading && <p>Loading...</p>}

            {/* Показать сообщение об ошибке, если произошла ошибка */}
            {error && (
                <div>
                    <p>Error loading todos!</p>
                    {/* Добавим кнопку для повторного запроса данных */}
                    <button onClick={() => refetch()}>Try again</button>
                </div>
            )}

            <div className={s.todolistsContainer}>
                <button onClick={createTodolistHandler}>CREATE NEW TODOLIST</button>
                <table className={s.todolistsTable}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Filter</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos?.map(todo => (
                        <Todolists
                            key={todo.id}
                            {...todo}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default App
