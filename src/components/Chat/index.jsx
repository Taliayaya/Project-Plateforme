import {
    StyledChat,
    StyledChatInput,
    StyledChatMessage,
    StyledChatTextarea,
} from './ChatStyle'
import { useEffect, useState, useRef } from 'react'
import { useApi, useChannel, useData, useMessage } from '../../utils/hooks'
import Message from '../Message'
import { API_SEND_MESSAGE, API_GET_MESSAGE } from '../../utils/paths'
function Chat() {
    const [messageList, setMessageList] = useState([])
    const { sender } = useApi()
    const { message, setMessage } = useMessage()
    const messageEndRef = useRef(null)
    const { currentChannelId } = useChannel()
    const { userData } = useData()

    useEffect(() => {
        const loadMessage = setInterval(async () => {
            const loadFormData = new FormData()
            loadFormData.append('currentChannel', currentChannelId.id)
            const fetchMessage = await sender(API_GET_MESSAGE, loadFormData)
            const message_list = fetchMessage?.messages_list
            message_list.reverse()
            if (message_list?.length !== messageList?.length) {
                console.log(message_list)
                setMessageList(message_list)
                // Scroll en bas dès un nouveau message
                messageEndRef.current?.scrollIntoView()
            }
        }, 2500)
        return () => clearInterval(loadMessage)
    }, [messageList?.length, sender, currentChannelId.id])
    useEffect(() => {
        const loadMessage = async () => {
            const loadFormData = new FormData()
            loadFormData.append('currentChannel', currentChannelId.id)
            const fetchMessage = await sender(API_GET_MESSAGE, loadFormData)
            const message_list = fetchMessage?.messages_list
            message_list.reverse()
            if (message_list?.length !== messageList?.length) {
                setMessageList(message_list)
                // Scroll en bas dès un nouveau message
                messageEndRef.current?.scrollIntoView()
            }
        }
        return loadMessage()
    }, [messageList?.length, sender, currentChannelId.id])

    // Permet de scroll en bas du chat dès qu'on commence à écrire un message
    useEffect(() => {
        console.log(messageEndRef)
        messageEndRef.current?.scrollIntoView()
    }, [message])

    async function handleSubmit(e) {
        const keyCode = e.which || e.keyCode
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            const sendFormData = new FormData()
            sendFormData.append('message', message)
            sendFormData.append('user_id', userData.id)
            sendFormData.append('id_channel', currentChannelId.id)
            const sendMessage = await sender(API_SEND_MESSAGE, sendFormData)
            sendMessage?.sent && setMessage('')
        }
    }

    let previousUser = -1
    return (
        <StyledChat>
            <StyledChatMessage>
                {messageList.map(
                    ({
                        id_message,
                        message,
                        message_date,
                        pseudo,
                        avatar,
                        u_id,
                    }) => {
                        let repeat = u_id === previousUser
                        previousUser = u_id
                        return (
                            <Message
                                key={id_message}
                                username={
                                    pseudo ? pseudo : 'Utilisateur supprimé'
                                }
                                message={message}
                                timestamp={message_date}
                                avatar={avatar}
                                repeat={repeat}
                                id={id_message}
                                setMessage={setMessage}
                            />
                        )
                    }
                )}

                <div ref={messageEndRef} />
            </StyledChatMessage>

            <StyledChatInput>
                <form>
                    <StyledChatTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Écrivez dans le salon ${currentChannelId.name}`}
                        onKeyDown={(e) => handleSubmit(e)}
                    ></StyledChatTextarea>
                </form>
            </StyledChatInput>
        </StyledChat>
    )
}
export default Chat
