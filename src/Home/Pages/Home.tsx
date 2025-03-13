import Header from '../../Shared/Components/Header';
import MeepContent from '../Components/MeepContent';
import Divider from '@mui/joy/Divider';
import './Home.css'
import HomeMeepContent from '../Components/HomeMeepContent';
import HomeUserContent from '../Components/HomeUserContent';
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import { useEffect, useState } from 'react';
import SideBar from '../../Shared/Components/SideBar';



export default function Home() {

    const [users, setUser] = useState();
    const [meeps, setMeeps] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const Id = useStoreAuth((state) => state.Id)
    useEffect(() => {
        async function getUsers() {
            setIsLoading(true)
            const res = await fetch("api/users/getusers")
            const data = await res.json()
            setUser(data.users);
            setIsLoading(false);
            console.log("here" + data)

        }

        getUsers()
    }, [])
    useEffect(() => {
        async function getMeeps() {
            setIsLoading(true)
            const res = await fetch(`api/usermeeps/usermeepfeed/${Id}`)
            const data = await res.json()
            setMeeps(data.usermeepfeed);
            setIsLoading(false);
            console.log("here" + data)

        }

        getMeeps()
    }, [])


    console.log("here" + users)
    return (
        <>
            <SideBar></SideBar>
            <Header />
            {!isLoading && users && <HomeUserContent user={users}></HomeUserContent>}
            <Divider />
            <MeepContent />

            {!isLoading && meeps && <HomeMeepContent meeps={meeps}></HomeMeepContent>}
        </>
    );
}