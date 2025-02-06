import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';

type userlist = {
    user: user[]
}

type user = {
    id: number,
    name: String,
    username: String


}
const handleDismiss = () => {

}
export default function HomeUserCard({ id, name, username }: user) {
    return (
        <Card color='neutral' sx={{ width: 200 }}>
            <div>
                <Typography level="title-lg">{name}</Typography>
                <Typography level="body-sm">@{username}</Typography>
                <IconButton
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
                >
                </IconButton>
            </div>
            <AspectRatio minHeight="60px" maxHeight="80px">
                <img
                    src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                />
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Button
                        variant="solid"
                        size="md"
                        color="neutral"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Dismiss
                    </Button>
                </div>
                <Link to={`/otheruser/${id}`}>
                    <Button
                        variant="solid"
                        size="md"
                        color="primary"
                        aria-label="Explore Bahamas Islands"
                        sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                    >
                        Explore
                    </Button>

                </Link>
            </CardContent>
        </Card>
    );
}