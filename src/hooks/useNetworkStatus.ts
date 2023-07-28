import { useEffect, useState } from "react";

function networkStatus() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine)

  const updateOnline = () => setIsOnline(window.navigator.onLine)

  useEffect(() => {
    window.addEventListener("online", updateOnline)
    window.addEventListener("offline", updateOnline)
    console.log(isOnline)

    return (() => {
      console.log(isOnline)
      window.addEventListener("online", updateOnline)
      window.addEventListener("offline", updateOnline)
    })
  })

  return isOnline
}

export const useNetworkStatus = networkStatus