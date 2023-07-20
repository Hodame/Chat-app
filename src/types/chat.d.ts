import { Timestamp } from "firebase/firestore"

type ChatTileType = {
  photoURL: string,
  username: string,
  chatID: string,
  message: string,
  sentAt: Timestamp,
  sentBy: {
    username: string
    userID: string
  }
}

type Message = {
  sentAt: Timestamp
  sentBy: {
    username: string
    photoURL: string
    userID: string
  }
  message: string
}
