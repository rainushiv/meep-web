import './HomeUserContent.css'
import HomeUserCard from './HomeUserCard';
import Card from '@mui/joy/Card';

const DUMMY_USERS = [
    {
        Id: 2,
        name: 'shiv',
        username: 'sgerious',
        email: 'brown@gmail.com',
        password: 'buttpoop123'
    }
]
type userlist = {
    user: user[]
}

type user = {
    id: number,
    name: String,
    username: String,
    email: String,
    password: String


}

export default function HomeUserContent({ user }: userlist) {

    return (
        <div className='homemeep-Container'>
            <ul className='user-list'>


                {user.map(user => { return < HomeUserCard id={user.id} name={user.name} username={user.username}></HomeUserCard> })};
            </ul>
        </div>
    );
}