import {InitialType} from "../../services/todolistsApi.types.ts";
import {useDeleteTodolistMutation} from "../../services/todolistApi.ts";


export const Todolists = (props: InitialType) => {
    const {id, filter, order, title} = props
    const [deleteTodolist] = useDeleteTodolistMutation();

    const deleteTodolistHandler=(id:string)=>{
         deleteTodolist({id})
    }

    return (
        <tr key={id}>
            <td>{title}</td>
            <td>{filter}</td>
            <td>{order}</td>
            <td>
                <button className="delete-button" onClick={() => deleteTodolistHandler(id)}>Delete</button>
            </td>
        </tr>
    );
};