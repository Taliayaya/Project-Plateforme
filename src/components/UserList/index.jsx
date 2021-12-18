import { useChannel } from '../../utils/hooks'
import CategorieUser from '../CategorieUser'
import {
    StyleUserList,
    StyleUserListTop,
    StyleUserListTopIcons,
} from './UserListStyle'
import { useData } from '../../utils/hooks'
import Username from '../Username'

function UserList() {
    const { currentChannelId } = useChannel()
    const {userData} = useData()
    console.log(useData)
    return (
        <StyleUserList>
            <StyleUserListTop>
                <h2># {currentChannelId ? currentChannelId.name : 'Vide'}</h2>
            </StyleUserListTop>
            <StyleUserListTopIcons></StyleUserListTopIcons>
            <div>
            <CategorieUser />
            </div>
            <Username username={userData?.pseudo}/>

        </StyleUserList>
    )
}

export default UserList
