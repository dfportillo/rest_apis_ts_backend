import server from "./server";
// ----------------------------------------------------
import colors from 'colors'

const PORT = process.env.PORT || 4000;

server.listen(PORT,() => {
    console.log(colors.bgBlue.grey(`rest api puerto ${PORT}`))
})
