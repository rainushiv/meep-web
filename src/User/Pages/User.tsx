
import { useStoreAuth } from "../../Auth/Components/AuthStore"
import Header from "../../Shared/Components/Header"
import UserContent from "../Components/UserContent"
export default function User() {
    const Id = useStoreAuth((state) => state.Id)
    return (
        <>
            <Header></Header>
            <UserContent propId=""></UserContent>
        </>
    )
}