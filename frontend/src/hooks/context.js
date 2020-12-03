import React, { useState, createContext, useContext, useEffect} from 'react'
  
import { loggedFn } from '../services/auth'
import { getArtistFn } from '../services/artist'
  
  export const AppContext = createContext()
  
  export const AppCtxProvider = props => {
    const [user, setUser] = useState(null)
    const [artist, setArtist] = useState(null)
  
    useEffect(() => {
      async function getSessionData() {
        const { data } = await loggedFn()
        login(data);
      }
  
      getSessionData()
    }, [])

    useEffect(() => {
      async function getArtist() {
        const { data } = await getArtistFn()
        setUserArtistFn(data);
      }
  
      getArtist()
    }, [])

    const setUserArtistFn = artistInfo => {
      setArtist(artistInfo)
    }
  
    const login = userInfo => {
      setUser(userInfo)
    }
  
    const logout = () => {
      setUser(null)
    }
  
    const value = { user, login, logout, artist, setUserArtistFn }
  
    return (
      <AppContext.Provider {...props} value={value} />
    )
  }
    
  export const useContextInfo = () => useContext(AppContext)