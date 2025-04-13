import Header from '../../Shared/Components/Header';
import MeepContent from '../Components/MeepContent';
import Divider from '@mui/joy/Divider';
import './Home.css'
import HomeMeepContent from '../Components/HomeMeepContent';
import HomeUserContent from '../Components/HomeUserContent';
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import {PageStore} from '../../Shared/Components/PageStore'
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import HomeUserCard from '../Components/HomeUserCard';
import Button from '@mui/joy/Button';
import {useInView} from 'react-intersection-observer'


type user = {
    id: number,
    name: String,
    username: String,
    email: String,
    password: String


}

type users ={
    users:user[]
}


export default function Home() {


    const [userData, setUserData] = useState<any>(null);
    const [users, setUser] = useState<any>(null);
    const [meeps, setMeeps] = useState();

    const Id = useStoreAuth((state) => state.Id)
    const getUsers =async({pageParam}: {pageParam:number}) =>{
        const response = await fetch(`api/users/getusers?page=${pageParam}`)
            return await response.json()
    }
    const {data,isLoading, fetchNextPage,hasNextPage,} = useInfiniteQuery({
        queryKey:["users"],
        queryFn:getUsers,
        initialPageParam:1,
        getNextPageParam:(lastPage,allPages)=>
            {
                return allPages.length+1 
            }
    })
const content = data?.pages.map((users:users)=>users.users.map( (user)=>{ return <div><HomeUserCard id={user.id} name={user.name} username={user.username} ></HomeUserCard></div>}) )
console.log(content)

    // useEffect(() => {
    //     async function getMeeps() {
    //         setIsLoading(true)
    //         const res = await fetch(`api/usermeeps/usermeepfeed/${Id}`)
    //         const data = await res.json()
    //         setMeeps(data.usermeepfeed);
    //         setIsLoading(false);

    //     }

    //     getMeeps()
    // }, [])


    const {ref,inView} = useInView();

    useEffect(()=>{
if(inView && hasNextPage){
    fetchNextPage()
}
    },[fetchNextPage,inView])

    return (
        <>
            <Header />
<div className='homemeep-Container'>
<ul className='user-list'>

            {content}

            <div ref={ref} className='ref-div'></div>
</ul>

</div>
            <MeepContent />

            {!isLoading && meeps && <HomeMeepContent meeps={meeps}></HomeMeepContent>}
        </>
    );
}

