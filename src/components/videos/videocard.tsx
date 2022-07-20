import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton, {IconButtonProps} from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {Video} from '../../types/video'

interface Props {
    video: Video
}

interface ExpandMoreProps extends IconButtonProps {
    liked: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {liked, ...other} = props
    return <IconButton {...other} />
})(({theme, liked}) => ({
    color: !liked ? 'gray' : 'red',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const VideoCard = ({video}: Props) => {
    const [liked, setLiked] = React.useState(false)

    const handleLikedClick = () => {
        setLiked(!liked)
    }

    var getYTThumbail = (url: string, size: 'small' | 'big') => {
        let results: RegExpMatchArray | null = url.match('[\\?&]v=([^&#]*)')
        if (!results) return ''
        let video: string = results === null ? url : results[1]

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg'
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg'
    }

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                component="img"
                height="194"
                image={getYTThumbail(video.videourl, 'big')}
                alt="video info"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {video.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    liked={liked}
                    onClick={handleLikedClick}
                    aria-expanded={liked}
                    aria-label="like"
                >
                    <FavoriteIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    )
}

export default VideoCard
