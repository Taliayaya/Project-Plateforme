import {
    Timestamp,
    doc,
    updateDoc,
    arrayRemove,
    collection,
    query,
    where,
    getDocs,
    arrayUnion,
    getDoc,
    addDoc,
    setDoc,
} from 'firebase/firestore'
import { db } from './firebase/config'

class Organisation {
    /**
     * Add a new organisation and its collections/subcollections/servers
     * Add the owner to the orgarnisation users
     * Add the organisation to the user's organisation array
     *
     * @param {string} name the organisation name
     * @param {string} domain the email domain to accept (empty = all)
     * @param {string} jointype whether users can join on demand or automatically
     * @param {Object} collections a node containing all collections, subCollection and servers
     * @param {Array} channels a default channels array used as a placeholder while creating servers
     * @param {Object} user the user data - auth instance
     */
    static async add({ name, domain, jointype, collections, channels }, user) {
        const orgaCollec = collection(db, 'organisations')
        const userRef = doc(db, 'users', user.uid)

        // Add the orga data
        const orgaCollecRef = await addDoc(orgaCollec, {
            name,
            collections,
            domain,
            jointype,
            channels,
            owner: {
                uid: user.uid,
                username: user.displayName,
            },
        })
        const orgaCollecRoleRef = doc(db, 'orgaUsers', orgaCollecRef.id)

        // Add the owner in the orga user list
        await setDoc(orgaCollecRoleRef, {
            username: user.displayName,
            role: 'owner',
            uid: user.uid,
        })

        // Add the organisation in the user data
        await updateDoc(userRef, {
            organisation: arrayUnion({ id: orgaCollecRef.id, name: name }),
            organisation_id: arrayUnion(orgaCollecRef.id),
        })
    }
}

export default Organisation
