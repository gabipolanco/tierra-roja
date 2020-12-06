import React, { useState, createContext, useContext, useEffect} from 'react'
  
import { loggedFn } from '../services/auth'
import { getArtistFn } from '../services/artist'
import { getWorksFn } from '../services/works'
  
  export const AppContext = createContext()
  
  export const AppCtxProvider = props => {
    const [user, setUser] = useState(null)
    const [artist, setArtist] = useState(null)
    const [works, setWorks] = useState(null)
  
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

    useEffect(() => {
      async function getWorks() {
        const { data } = await getWorksFn()
        if (data.length !== 0) setUserWorksFn(data);
      }
  
      getWorks()
    }, [])

    const setUserArtistFn = artistInfo => {
      setArtist(artistInfo)
    }

    const setUserWorksFn = async () => {
      const { data } = await getWorksFn()
      if(!data) return setWorks(null)
      setWorks(data)
    }

  
    const login = userInfo => {
      setUser(userInfo)
    }
  
    const logout = () => {
      setUser(null)
    }
  
    const value = { user, login, logout, artist, setUserArtistFn, works, setUserWorksFn }
  
    return (
      <AppContext.Provider {...props} value={value} />
    )
  }
    
  export const useContextInfo = () => useContext(AppContext)