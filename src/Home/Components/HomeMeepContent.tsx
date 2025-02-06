
import Avatar from '@mui/joy/Avatar';
import './HomeMeepContent.css'
import { useStoreAuth } from '../../Auth/Components/AuthStore';
import HomeMeep from './HomeMeep';
import { useEffect } from 'react';
type meeplist = {
    meeps: meep[]
}

type meep = {
    title: String,
    body: String,
    creatorId: number
}

export default function HomeMeepContent({ meeps }: meeplist) {


    const isLogin = useStoreAuth((state) => state.isLogin)
    const Login = useStoreAuth((state) => state.Login)


    console.log(isLogin);
    return (

        <div className='meeps-Container'>
            <ul>
                {meeps.map(meeps => { return <HomeMeep title={meeps.title} body={meeps.body} creatorId={meeps.creatorId}></HomeMeep> })}
            </ul>

        </div>
    )


}