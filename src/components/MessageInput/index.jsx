import { StyledChatInput, StyledChatTextarea } from '../Chat/ChatStyle'
import React, { useRef } from 'react'
import { getAuth } from 'firebase/auth'
import { Send } from '@material-ui/icons'
import { useAuth, useMessage } from '../../utils/hooks'
import { writeUserMessage } from '../../utils/function'
import { styled } from '@mui/material'
import { StyleMobileSendingContainer } from './StyleMessageInput'

//For the upload icon
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { useState } from 'react'

const StyledSend = styled(Send)(() => ({
    position: 'relative',
    margin: '0',
}))

const UploadIcon = ({ success, onFileSelectError, onFileSelectSuccess }) => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null)

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    }
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0]
        if (fileUploaded.size > 10 ** 7)
            onFileSelectError({ error: fileUploaded.size })
        else onFileSelectSuccess(fileUploaded)
    }
    return (
        <>
            <FileUploadIcon onClick={(e) => handleClick(e)} />
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    )
}

// Badge for the closing icon

// Decorative component, showing the type (chosen according to the file name),
// the name and the size of an uploaded file. Does not actually "contain" it.
// Also has a number that allows it to be deleted and send a signal to the list.
//const UploadItem = ({ index, name, size }) => {}

// Manages the list of the uploaded files (shown as uploadItem instances).
// Is changed when a new file is added.
//const uploadList

const MessageInput = ({ currentChannelId }) => {
    //File-uploading-related values
    const [success, setSuccess] = useState(false)
    const [selectedFiles, addSelectedFiles] = useState([])
    const { logout, resetPassword } = useAuth()

    const { message, setMessage } = useMessage()
    const user = getAuth().currentUser
    const { userRole } = useAuth()

    const handleSending = async () => {
        if (message.trim().length > 0 && userRole !== 'Muted') {
            try {
                writeUserMessage(
                    user,
                    message,
                    currentChannelId.id,
                    selectedFiles
                )
                setMessage('')
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleSubmit = (e) => {
        const keyCode = e.which || e.keyCode
        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            handleSending()
        }
    }

    const placeholder =
        userRole === 'Muted'
            ? 'Vous avez été bloqué par un administrateur. Par conséquent, vous ne pouvez plus envoyer de messages tant que vous ne serez pas débloqué.'
            : currentChannelId?.name
            ? `Écrivez dans le salon ${currentChannelId?.name}`
            : `Choisissez un salon pour commencer à discuter.`

    return (
        <>
            <StyledChatInput>
                <form>
                    <UploadIcon
                        onFileSelectSuccess={(file) =>
                          {addSelectedFiles((file) => [...selectedFiles, file])}
                          console.log(selectedFiles)
                        }
                        onFileSelectError={({ error }) => alert(error)}
                        selectedFiles={selectedFiles}
                        success={success}
                    />
                    <StyledChatTextarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={placeholder}
                        onKeyDown={(e) => handleSubmit(e)}
                        disabled={currentChannelId?.name in window}
                        rows="1"
                    ></StyledChatTextarea>
                </form>
                {message.trim().length > 0 && (
                    <StyleMobileSendingContainer>
                        <StyledSend
                            sx={{ fontSize: '80px' }}
                            onClick={() => handleSending()}
                        />
                    </StyleMobileSendingContainer>
                )}
            </StyledChatInput>
        </>
    )
}

export default MessageInput
